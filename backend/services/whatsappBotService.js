import User from '../models/User.js';
import Product from '../models/Product.js';
import Business from '../models/Business.js';
import Delivery from '../models/Delivery.js';
import { parseCommand } from './commandParser.js';
import { whatsappService } from './whatsappService.js';

// Simple Haversine distance calculator (in kilometers) using [lng, lat] coordinates
const haversineDistanceKm = (coords1 = [0, 0], coords2 = [0, 0]) => {
    const [lng1, lat1] = coords1;
    const [lng2, lat2] = coords2;
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const whatsappBotService = {
    // Main entry point for the bot logic
    async handleIncomingMessage(messageData, businessId, io) {
        const phone = messageData.from;
        const textContent = messageData.text?.body || '';

        // Find the user communicating with the bot
        let user = await User.findOne({ phone });

        // 1. If user doesn't exist, prompt registration
        if (!user) {
            if (textContent.toLowerCase() === 'hi' || textContent.toLowerCase() === 'hello') {
                const welcomeMessage = `Welcome to Bizone Agri-Trade! 👋\n\nTo get started, please reply with your role:\n1️⃣ Farmer\n2️⃣ Buyer\n3️⃣ Delivery`;
                await whatsappService.sendTextMessage(phone, welcomeMessage, businessId);
            } else if (['1', '2', '3', 'farmer', 'buyer', 'delivery'].includes(textContent.toLowerCase())) {
                // Register User
                let role = 'buyer';
                if (textContent.includes('1') || textContent.toLowerCase() === 'farmer') role = 'farmer';
                if (textContent.includes('3') || textContent.toLowerCase() === 'delivery') role = 'delivery';

                user = new User({
                    name: `User_${phone.slice(-4)}`,
                    phone,
                    email: `${phone}@bizone.trade`, // Placeholder email
                    role,
                    wallet: {
                        balance: 0,
                        // Derive account number deterministically from phone number (no random/mock)
                        // Keep only digits and pad/truncate to 10–14 digits
                        accountNumber: (() => {
                            const digits = phone.replace(/\D/g, '');
                            if (!digits) return undefined;
                            // Use last 10 digits as core account number
                            const core = digits.slice(-10);
                            // Prefix with '10' to keep it in a bank-like range, but still based on phone
                            return `10${core}`;
                        })(),
                        bankName: 'Bizone Virtual Wallet'
                    },
                    botState: { status: 'IDLE' }
                });
                await user.save();

                if (io) {
                    io.emit('new_user', user);
                }

                const successMessage = `Registration successful as a *${role}*! 🎉\n\nYour virtual wallet has been created.\n🏦 Account No: ${user.wallet.accountNumber}\n🏦 Bank: Bizone Virtual Wallet\n\nYou can now type commands like:\n- "Check account balance"\n- "Buy yam within 10km"\n\n*Please share your WhatsApp Location Pin so we can match you locally!*`;
                await whatsappService.sendTextMessage(phone, successMessage, businessId);
            } else {
                await whatsappService.sendTextMessage(phone, 'Please reply with "hi" to start registration.', businessId);
            }
            return;
        }

        // 2. Handle Location sharing
        if (messageData.type === 'location') {
            const lat = messageData.location.latitude;
            const lng = messageData.location.longitude;

            user.location.coordinates = [lng, lat]; // GeoJSON format: [longitude, latitude]
            user.location.type = 'Point';
            await user.save();

            await whatsappService.sendTextMessage(phone, '📍 Your location has been saved successfully. We can now match you with local products and delivery!', businessId);
            return;
        }

        // 3. Command Parsing for generic text
        if (messageData.type === 'text') {
            if (io) {
                io.emit('new_message', { phone, text: textContent, businessId, timestamp: new Date() });
            }

            const parsedCommand = parseCommand(textContent);

            switch (parsedCommand.intent) {
                case 'CHECK_BALANCE': {
                    await whatsappService.sendTextMessage(
                        phone,
                        `💰 *Wallet Balance*\n\nYour current balance is: NGN ${user.wallet.balance}\nAccount No: ${user.wallet.accountNumber}`,
                        businessId
                    );
                    break;
                }

                case 'MATCH_PRODUCT': {
                    if (!user.location.coordinates || user.location.coordinates[0] === 0) {
                        await whatsappService.sendTextMessage(phone, 'Please share your WhatsApp Location Pin first so I can find products near you.', businessId);
                        return;
                    }

                    const { item, distanceInMeters } = parsedCommand.data;

                    await whatsappService.sendTextMessage(
                        phone,
                        `🔍 Searching for *${item}* within ${parsedCommand.data.originalDistance}...`,
                        businessId
                    );

                    // Find products geographically
                    const products = await Product.aggregate([
                        {
                            $geoNear: {
                                near: {
                                    type: 'Point',
                                    coordinates: user.location.coordinates
                                },
                                distanceField: 'distance',
                                maxDistance: distanceInMeters,
                                spherical: true
                            }
                        },
                        {
                            $match: {
                                name: { $regex: new RegExp(item, 'i') },
                                status: 'active'
                            }
                        },
                        { $limit: 5 },
                        { $lookup: { from: 'businesses', localField: 'business', foreignField: '_id', as: 'biz' } }
                    ]);

                    if (products.length === 0) {
                        await whatsappService.sendTextMessage(
                            phone,
                            `Sorry, no *${item}* found within that radius. Try increasing the distance.`,
                            businessId
                        );
                    } else {
                        let replyList = `Found ${products.length} options for *${item}*:\n\n`;
                        products.forEach((prod, idx) => {
                            const distKm = (prod.distance / 1000).toFixed(1);

                            const unitLabel = prod.pricing?.unitLabel || 'unit';
                            const basePrice =
                                prod.pricing?.basePricePerUnit && prod.pricing.basePricePerUnit > 0
                                    ? prod.pricing.basePricePerUnit
                                    : prod.price;

                            const hasBulkRule =
                                Array.isArray(prod.pricing?.bulkRules) && prod.pricing.bulkRules.length > 0;
                            const bestBulkRule = hasBulkRule
                                ? prod.pricing.bulkRules[0]
                                : null;

                            replyList += `*${idx + 1}. ${prod.name}*\n`;
                            replyList += `💰 NGN ${basePrice.toLocaleString()} per ${unitLabel}\n`;

                            if (bestBulkRule) {
                                replyList += `📦 Bulk: from ${bestBulkRule.minQuantity}+ at NGN ${bestBulkRule.pricePerUnit.toLocaleString()} per ${unitLabel}\n`;
                            }

                            if (prod.deliveryOptions?.enabled) {
                                const radius = prod.deliveryOptions.radiusKm || 0;
                                replyList += `🚚 Delivery available within ${radius}km`;
                                if (prod.deliveryOptions.feeType === 'FLAT' && prod.deliveryOptions.feeFlat > 0) {
                                    replyList += ` (flat NGN ${prod.deliveryOptions.feeFlat.toLocaleString()})`;
                                } else if (prod.deliveryOptions.feeType === 'PER_KM' && prod.deliveryOptions.feePerKm > 0) {
                                    replyList += ` (NGN ${prod.deliveryOptions.feePerKm.toLocaleString()} per km)`;
                                }
                                replyList += `\n`;
                            }

                            replyList += `📍 ${distKm}km away\n\n`;
                        });
                        replyList += `Reply with the number to start buying.`;
                        await whatsappService.sendTextMessage(phone, replyList, businessId);

                        // Update state
                        user.botState.status = 'AWAITING_SELECTION';
                        user.botState.tempData = { products: products.map(p => p._id) };
                        await user.save();
                    }
                    break;
                }

                case 'GENERATE_REPORT': {
                    if (!user.business) {
                        await whatsappService.sendTextMessage(phone, "Sorry, you need a linked business account to generate reports.", businessId);
                        break;
                    }
                    try {
                        const { analyticsService } = await import('./analyticsService.js');
                        const summary = await analyticsService.getBusinessAnalytics(user.business);
                        const report = analyticsService.generateWhatsAppReport(summary);
                        await whatsappService.sendTextMessage(phone, report, businessId);
                    } catch (e) {
                        await whatsappService.sendTextMessage(phone, "Error generating report. Try again later.", businessId);
                    }
                    break;
                }

                case 'GENERATE_RECEIPT': {
                    try {
                        const { receiptService } = await import('./receiptService.js');
                        const Order = (await import('../models/Order.js')).default;
                        const orderRef = parsedCommand.data.orderId;
                        const order = await Order.findOne({ reference: new RegExp(orderRef, 'i'), business: businessId });

                        if (!order) {
                            await whatsappService.sendTextMessage(phone, `No successful order found with reference ${orderRef}.`, businessId);
                        } else {
                            const receipt = receiptService.generateTextReceipt(order, 'Bizone Agri-Trade');
                            await whatsappService.sendTextMessage(phone, receipt, businessId);
                        }
                    } catch (e) {
                        await whatsappService.sendTextMessage(phone, "Error fetching receipt.", businessId);
                    }
                    break;
                }

                case 'HELP': {
                    const helpMessage = `🤖 *Bizone Bot Commands* 🤖\n\n`
                        + `*For Buyers/Consumers:*\n`
                        + `- "Buy yam within 10km"\n`
                        + `- "Offer 5000" (after selecting a product)\n`
                        + `- "My orders" or "Track order [ID]"\n`
                        + `- "Cancel order [ID]"\n\n`
                        + `*For Farmers/Sellers:*\n`
                        + `- "Sell yam for 5000"\n`
                        + `- "View products"\n`
                        + `- "Accept offer [ID]" / "Reject offer [ID]"\n\n`
                        + `*General:*\n`
                        + `- "Check account balance"\n`
                        + `- "Update location"\n`
                        + `- "Generate report"\n`
                        + `- "Receipt for order [ID]"`;
                    await whatsappService.sendTextMessage(phone, helpMessage, businessId);
                    break;
                }

                case 'SELL_PRODUCT': {
                    if (user.role !== 'farmer') {
                        await whatsappService.sendTextMessage(phone, "Only registered Farmers can list products for sale.", businessId);
                    } else {
                        const { item, price } = parsedCommand.data;

                        const newProduct = new Product({
                            business: businessId,
                            name: item,
                            category: 'Produce',
                            price: price,
                            pricing: {
                                unitLabel: 'unit',
                                basePricePerUnit: price,
                                minOrderQuantity: 1
                            },
                            negotiationPlan: {
                                mode: 'AUTO',
                                maxDiscountPercent: 10
                            },
                            location: user.location,
                            status: 'active'
                        });
                        await newProduct.save();

                        if (io) {
                            io.emit('new_product', newProduct);
                        }

                        await whatsappService.sendTextMessage(phone, `Added *${item}* for NGN ${price} to your storefront! ✅`, businessId);
                    }
                    break;
                }

                case 'VIEW_PRODUCTS': {
                    const myProducts = await Product.find({ business: businessId, status: 'active' }).limit(10);
                    if (myProducts.length === 0) {
                        await whatsappService.sendTextMessage(phone, "You have no active products.", businessId);
                    } else {
                        let prodStr = "Here are your active products:\n\n";
                        myProducts.forEach((p, idx) => prodStr += `${idx + 1}. ${p.name} - NGN ${p.price}\n`);
                        await whatsappService.sendTextMessage(phone, prodStr, businessId);
                    }
                    break;
                }

                case 'MAKE_OFFER': {
                    if (user.botState.status !== 'AWAITING_SELECTION' && user.botState.status !== 'NEGOTIATING') {
                        await whatsappService.sendTextMessage(phone, "Please search for a product first before making an offer.", businessId);
                    } else {
                        const amount = parsedCommand.data.amount;
                        const productId = user.botState.tempData?.products?.[0]; // Mocking selection to the first product matched

                        if (!productId) {
                            await whatsappService.sendTextMessage(phone, "No product selected.", businessId);
                            break;
                        }

                        const { default: Order } = await import('../models/Order.js');
                        const product = await Product.findById(productId);

                        if (!product) {
                            await whatsappService.sendTextMessage(phone, "Product not found.", businessId);
                            break;
                        }

                        // Determine negotiation behaviour using product's negotiationPlan
                        const negotiation = product.negotiationPlan || {};
                        const basePricePerUnit =
                            product.pricing?.basePricePerUnit && product.pricing.basePricePerUnit > 0
                                ? product.pricing.basePricePerUnit
                                : product.price;

                        const maxDiscountPercent =
                            typeof negotiation.maxDiscountPercent === 'number'
                                ? negotiation.maxDiscountPercent
                                : 10;

                        let autoAcceptFloor = negotiation.autoAcceptMinPrice || 0;
                        if (!autoAcceptFloor && basePricePerUnit > 0) {
                            autoAcceptFloor = basePricePerUnit * (1 - maxDiscountPercent / 100);
                        }

                        const newOrder = new Order({
                            business: product.business, // Ensure this points to the farmer's business
                            customer: { name: user.name, phone: user.phone },
                            items: [{ product: product._id, quantity: 1, price: amount, total: amount }],
                            subtotal: amount,
                            total: amount,
                            status: 'pending'
                        });
                        await newOrder.save();

                        // If delivery is enabled for this product and buyer has a location, attempt to create a Delivery task
                        try {
                            if (product.deliveryOptions?.enabled) {
                                const buyerCoords = user.location?.coordinates;
                                const productCoords = product.location?.coordinates;

                                if (Array.isArray(buyerCoords) && Array.isArray(productCoords)) {
                                    const distanceKm = haversineDistanceKm(productCoords, buyerCoords);
                                    const radiusKm = product.deliveryOptions.radiusKm || 0;

                                    if (!radiusKm || distanceKm <= radiusKm) {
                                        let deliveryFee = 0;
                                        if (product.deliveryOptions.feeType === 'FLAT') {
                                            deliveryFee = product.deliveryOptions.feeFlat || 0;
                                        } else if (product.deliveryOptions.feeType === 'PER_KM') {
                                            const perKm = product.deliveryOptions.feePerKm || 0;
                                            deliveryFee = Math.round(perKm * distanceKm);
                                        }

                                        const buyerAddress = user.location?.address || `${user.location?.city || ''}, ${user.location?.state || ''}`.trim();

                                        const businessDoc = await Business.findById(product.business).select('contact name');
                                        const pickupAddress = businessDoc?.contact?.address;

                                        const delivery = new Delivery({
                                            order: newOrder._id,
                                            business: product.business,
                                            pickup: {
                                                location: {
                                                    coordinates: {
                                                        lat: pickupAddress?.coordinates?.lat,
                                                        lng: pickupAddress?.coordinates?.lng
                                                    },
                                                    address: `${pickupAddress?.street || ''}, ${pickupAddress?.city || ''}, ${pickupAddress?.state || ''}`.trim(),
                                                    contact: {
                                                        name: businessDoc?.name,
                                                        phone: businessDoc?.contact?.phone
                                                    }
                                                },
                                                instructions: 'Pickup from farmer business location'
                                            },
                                            dropoff: {
                                                location: {
                                                    coordinates: {
                                                        lat: buyerCoords[1],
                                                        lng: buyerCoords[0]
                                                    },
                                                    address: buyerAddress
                                                },
                                                contact: {
                                                    name: user.name,
                                                    phone: user.phone
                                                },
                                                instructions: 'Deliver to WhatsApp buyer'
                                            },
                                            pricing: {
                                                baseFee: deliveryFee,
                                                distanceFee: 0,
                                                sizeFee: 0,
                                                total: deliveryFee,
                                                paymentMethod: 'prepaid'
                                            },
                                            status: 'pending'
                                        });

                                        await delivery.save();

                                        newOrder.delivery = delivery._id;
                                        newOrder.deliveryFee = deliveryFee;
                                        newOrder.total = newOrder.subtotal + deliveryFee;
                                        await newOrder.save();
                                    }
                                }
                            }
                        } catch (deliveryError) {
                            console.error('Error creating delivery for order:', deliveryError);
                        }

                        if (io) {
                            io.emit('new_order', newOrder);
                        }
                        // Decide whether to auto‑accept, reject, or wait for farmer decision
                        if (negotiation.mode === 'NONE') {
                            await whatsappService.sendTextMessage(
                                phone,
                                `The price for *${product.name}* is fixed and not negotiable. Your offer of NGN ${amount} was not accepted.`,
                                businessId
                            );
                        } else if (negotiation.mode === 'AUTO' && amount >= autoAcceptFloor && autoAcceptFloor > 0) {
                            newOrder.status = 'confirmed';
                            await newOrder.save();
                            if (io) io.emit('order_updated', newOrder);

                            await whatsappService.sendTextMessage(
                                phone,
                                `✅ Your offer of NGN ${amount} for *${product.name}* has been automatically accepted! Order Ref: *${newOrder.orderNumber}*.`,
                                businessId
                            );
                        } else {
                            await whatsappService.sendTextMessage(
                                phone,
                                `Offer of NGN ${amount} sent to the farmer for *${product.name}*! Waiting for response... ⏳\nOrder Ref: *${newOrder.orderNumber}*`,
                                businessId
                            );

                            // Notify the farmer on WhatsApp if their business contact phone is set
                            try {
                                const farmerBusiness = await Business.findById(product.business).select('contact');
                                const farmerPhone = farmerBusiness?.contact?.phone || farmerBusiness?.social?.whatsapp;
                                if (farmerBusiness && farmerPhone) {
                                    await whatsappService.sendTextMessage(
                                        farmerPhone,
                                        `You have a new offer for *${product.name}*.\nBuyer: ${user.name} (${user.phone})\nAmount: NGN ${amount}\nTo accept or reject, reply:\n- "accept offer ${newOrder.orderNumber}"\n- "reject offer ${newOrder.orderNumber}"`,
                                        businessId
                                    );
                                }
                            } catch (notifyError) {
                                // Log silently but do not break buyer flow
                                console.error('Error notifying farmer about offer:', notifyError);
                            }
                        }
                    }
                    break;
                }

                case 'ACCEPT_OFFER': {
                    const { default: OrderModelAccept } = await import('../models/Order.js');
                    const acceptedOrder = await OrderModelAccept.findOne({ orderNumber: new RegExp(parsedCommand.data.offerId, 'i') });
                    if (acceptedOrder) {
                        acceptedOrder.status = 'confirmed';
                        await acceptedOrder.save();
                        if (io) io.emit('order_updated', acceptedOrder);
                        await whatsappService.sendTextMessage(phone, `Offer ${parsedCommand.data.offerId} accepted! Proceeding to fulfillment.`, businessId);
                    } else {
                        await whatsappService.sendTextMessage(phone, `Order ${parsedCommand.data.offerId} not found.`, businessId);
                    }
                    break;
                }

                case 'REJECT_OFFER': {
                    const { default: OrderModelReject } = await import('../models/Order.js');
                    const rejectedOrder = await OrderModelReject.findOne({ orderNumber: new RegExp(parsedCommand.data.offerId, 'i') });
                    if (rejectedOrder) {
                        rejectedOrder.status = 'cancelled';
                        await rejectedOrder.save();
                        if (io) io.emit('order_updated', rejectedOrder);
                        await whatsappService.sendTextMessage(phone, `Offer ${parsedCommand.data.offerId} rejected.`, businessId);
                    } else {
                        await whatsappService.sendTextMessage(phone, `Order ${parsedCommand.data.offerId} not found.`, businessId);
                    }
                    break;
                }

                case 'VIEW_ORDERS': {
                    await whatsappService.sendTextMessage(phone, "Your Recent Orders:\n\n1. BZ-1234 (Completed)\n2. BZ-5678 (Pending)", businessId);
                    break;
                }

                case 'TRACK_ORDER': {
                    try {
                        const { default: TrackOrderModel } = await import('../models/Order.js');
                        const order = await TrackOrderModel.findOne({
                            orderNumber: new RegExp(parsedCommand.data.orderId, 'i')
                        }).populate('delivery');

                        if (!order) {
                            await whatsappService.sendTextMessage(
                                phone,
                                `I couldn't find any order with reference ${parsedCommand.data.orderId}.`,
                                businessId
                            );
                            break;
                        }

                        let message = `📦 *Order ${order.orderNumber}*\nStatus: ${order.status}\nPayment: ${order.paymentStatus}\nTotal: NGN ${order.total}\n`;

                        if (order.delivery) {
                            const delivery = order.delivery._id ? await Delivery.findById(order.delivery._id) : order.delivery;
                            if (delivery) {
                                message += `\n🚚 *Delivery*\nStatus: ${delivery.status}\n`;
                                if (delivery.timeline?.estimatedDelivery) {
                                    message += `ETA: ${delivery.timeline.estimatedDelivery.toLocaleString()}\n`;
                                }
                            }
                        }

                        await whatsappService.sendTextMessage(phone, message, businessId);
                    } catch (e) {
                        console.error('Error tracking order via WhatsApp:', e);
                        await whatsappService.sendTextMessage(
                            phone,
                            'Sorry, I had trouble fetching your order status. Please try again later.',
                            businessId
                        );
                    }
                    break;
                }

                case 'CONFIRM_DELIVERY': {
                    try {
                        const { default: ConfirmOrderModel } = await import('../models/Order.js');
                        const order = await ConfirmOrderModel.findOne({
                            orderNumber: new RegExp(parsedCommand.data.orderId, 'i')
                        });

                        if (!order) {
                            await whatsappService.sendTextMessage(
                                phone,
                                `I couldn't find any order with reference ${parsedCommand.data.orderId}.`,
                                businessId
                            );
                            break;
                        }

                        order.status = 'delivered';
                        await order.save();

                        if (order.delivery) {
                            const delivery = await Delivery.findById(order.delivery);
                            if (delivery) {
                                delivery.status = 'delivered';
                                delivery.timeline = delivery.timeline || {};
                                delivery.timeline.actualDelivery = new Date();
                                delivery.updates = delivery.updates || [];
                                delivery.updates.push({
                                    status: 'delivered',
                                    note: 'Confirmed by customer via WhatsApp'
                                });
                                await delivery.save();
                            }
                        }

                        if (io) io.emit('order_updated', order);

                        await whatsappService.sendTextMessage(
                            phone,
                            `✅ Delivery for order ${order.orderNumber} confirmed! Payment will be released to the farmer.`,
                            businessId
                        );
                    } catch (e) {
                        console.error('Error confirming delivery via WhatsApp:', e);
                        await whatsappService.sendTextMessage(
                            phone,
                            'Sorry, I could not confirm your delivery right now. Please try again later.',
                            businessId
                        );
                    }
                    break;
                }

                case 'CANCEL_ORDER': {
                    try {
                        const { default: CancelOrderModel } = await import('../models/Order.js');
                        const order = await CancelOrderModel.findOne({
                            orderNumber: new RegExp(parsedCommand.data.orderId, 'i')
                        });

                        if (!order) {
                            await whatsappService.sendTextMessage(
                                phone,
                                `I couldn't find any order with reference ${parsedCommand.data.orderId}.`,
                                businessId
                            );
                            break;
                        }

                        order.status = 'cancelled';
                        await order.save();

                        if (order.delivery) {
                            const delivery = await Delivery.findById(order.delivery);
                            if (delivery) {
                                delivery.status = 'failed';
                                delivery.updates = delivery.updates || [];
                                delivery.updates.push({
                                    status: 'failed',
                                    note: 'Cancelled by customer via WhatsApp'
                                });
                                await delivery.save();
                            }
                        }

                        if (io) io.emit('order_updated', order);

                        await whatsappService.sendTextMessage(
                            phone,
                            `Order ${order.orderNumber} has been cancelled.`,
                            businessId
                        );
                    } catch (e) {
                        console.error('Error cancelling order via WhatsApp:', e);
                        await whatsappService.sendTextMessage(
                            phone,
                            'Sorry, I could not cancel your order right now. Please try again later.',
                            businessId
                        );
                    }
                    break;
                }

                case 'UPDATE_LOCATION': {
                    user.botState.status = 'AWAITING_LOCATION';
                    await user.save();
                    await whatsappService.sendTextMessage(phone, "Please open the attachment menu and send your current **Location Pin**.", businessId);
                    break;
                }

                default: {
                    if (user.botState.status === 'IDLE') {
                        await whatsappService.sendTextMessage(phone, "I didn't understand that command. Try 'check account balance' or 'buy yam within 10km radius'.", businessId);
                    }
                    break;
                }
            }
        }
    }
};

export default whatsappBotService;
