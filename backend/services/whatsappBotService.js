import User from '../models/User.js';
import Product from '../models/Product.js';
import { parseCommand } from './commandParser.js';
import { whatsappService } from './whatsappService.js';

export const whatsappBotService = {
    // Main entry point for the bot logic
    async handleIncomingMessage(messageData, businessId) {
        const phone = messageData.from;
        const textContent = messageData.text?.body || '';

        // Find the user communicating with the bot
        let user = await User.findOne({ phone });

        // 1. If user doesn't exist, prompt registration
        if (!user) {
            if (textContent.toLowerCase() === 'hi' || textContent.toLowerCase() === 'hello') {
                const welcomeMessage = \`Welcome to Bizone Agri-Trade! 👋\n\nTo get started, please reply with your role:\n1️⃣ Farmer\n2️⃣ Buyer\n3️⃣ Delivery\`;
        await whatsappService.sendTextMessage(phone, welcomeMessage, businessId);
      } else if (['1', '2', '3', 'farmer', 'buyer', 'delivery'].includes(textContent.toLowerCase())) {
        // Register User
        let role = 'buyer';
        if (textContent.includes('1') || textContent.toLowerCase() === 'farmer') role = 'farmer';
        if (textContent.includes('3') || textContent.toLowerCase() === 'delivery') role = 'delivery';

        // Generate virtual account simulating Paystack for now
        const mockAccount = '10' + Math.floor(Math.random() * 100000000);
        
        user = new User({
          name: \`User_\${phone.slice(-4)}\`,
          phone,
          email: \`\${phone}@bizone.trade\`, // Placeholder email
          role,
          wallet: {
            balance: 0,
            accountNumber: mockAccount,
            bankName: 'Bizone Virtual Wallet'
          },
          botState: { status: 'IDLE' }
        });
        await user.save();

        const successMessage = \`Registration successful as a *\${role}*! 🎉\n\nYour virtual wallet has been created.\n🏦 Account No: \${mockAccount}\n🏦 Bank: Bizone Virtual Wallet\n\nYou can now type commands like:\n- "Check account balance"\n- "Buy yam within 10km"\n\n*Please share your WhatsApp Location Pin so we can match you locally!*\`;
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
      const parsedCommand = parseCommand(textContent);

      switch (parsedCommand.intent) {
        case 'CHECK_BALANCE':
          await whatsappService.sendTextMessage(
            phone, 
            \`💰 *Wallet Balance*\n\nYour current balance is: NGN \${user.wallet.balance}\nAccount No: \${user.wallet.accountNumber}\`, 
            businessId
          );
          break;

        case 'MATCH_PRODUCT':
          if (!user.location.coordinates || user.location.coordinates[0] === 0) {
            await whatsappService.sendTextMessage(phone, 'Please share your WhatsApp Location Pin first so I can find products near you.', businessId);
            return;
          }

          const { item, distanceInMeters } = parsedCommand.data;
          
          await whatsappService.sendTextMessage(phone, \`🔍 Searching for *\${item}* within \${parsedCommand.data.originalDistance}...\`, businessId);

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
            await whatsappService.sendTextMessage(phone, \`Sorry, no *\${item}* found within that radius. Try increasing the distance.\`, businessId);
          } else {
            let replyList = \`Found \${products.length} options for *\${item}*:\\n\\n\`;
            products.forEach((prod, idx) => {
              const distKm = (prod.distance / 1000).toFixed(1);
              replyList += \`*\${idx + 1}. \${prod.name}*\n💰 NGN \${prod.price}\n📍 \${distKm}km away\n\n\`;
            });
            replyList += \`Reply with the number to start buying.\`;
            await whatsappService.sendTextMessage(phone, replyList, businessId);
            
            // Update state
            user.botState.status = 'AWAITING_SELECTION';
            user.botState.tempData = { products: products.map(p => p._id) };
            await user.save();
          }
          break;

        case 'GENERATE_REPORT':
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

        case 'GENERATE_RECEIPT':
          try {
            const { receiptService } = await import('./receiptService.js');
            const Order = (await import('../models/Order.js')).default;
            const orderRef = parsedCommand.data.orderId;
            const order = await Order.findOne({ reference: new RegExp(orderRef, 'i'), business: businessId });
            
            if (!order) {
              await whatsappService.sendTextMessage(phone, \`No successful order found with reference \${orderRef}.\`, businessId);
            } else {
              const receipt = receiptService.generateTextReceipt(order, 'Bizone Agri-Trade');
              await whatsappService.sendTextMessage(phone, receipt, businessId);
            }
          } catch (e) {
            await whatsappService.sendTextMessage(phone, "Error fetching receipt.", businessId);
          }
          break;

        case 'HELP':
          const helpMessage = \`🤖 *Bizone Bot Commands* 🤖\n\n\`
            + \`*For Buyers/Consumers:*\n\`
            + \`- "Buy yam within 10km"\n\`
            + \`- "Offer 5000" (after selecting a product)\n\`
            + \`- "My orders" or "Track order [ID]"\n\`
            + \`- "Cancel order [ID]"\n\n\`
            + \`*For Farmers/Sellers:*\n\`
            + \`- "Sell yam for 5000"\n\`
            + \`- "View products"\n\`
            + \`- "Accept offer [ID]" / "Reject offer [ID]"\n\n\`
            + \`*General:*\n\`
            + \`- "Check account balance"\n\`
            + \`- "Update location"\n\`
            + \`- "Generate report"\n\`
            + \`- "Receipt for order [ID]"\`;
          await whatsappService.sendTextMessage(phone, helpMessage, businessId);
          break;

        case 'SELL_PRODUCT':
          if (user.role !== 'farmer') {
            await whatsappService.sendTextMessage(phone, "Only registered Farmers can list products for sale.", businessId);
          } else {
            const { item, price } = parsedCommand.data;
            await whatsappService.sendTextMessage(phone, \`Added *\${item}* for NGN \${price} to your storefront! ✅\`, businessId);
            // TODO: Actually create Product record 
          }
          break;

        case 'VIEW_PRODUCTS':
          await whatsappService.sendTextMessage(phone, "Here are your active products:\n\n1. Yam - NGN 5000\n2. Cassava - NGN 3000", businessId);
          break;

        case 'MAKE_OFFER':
          if (user.botState.status !== 'AWAITING_SELECTION' && user.botState.status !== 'NEGOTIATING') {
            await whatsappService.sendTextMessage(phone, "Please search for a product first before making an offer.", businessId);
          } else {
            await whatsappService.sendTextMessage(phone, \`Offer of NGN \${parsedCommand.data.amount} sent to the farmer! Waiting for response... ⏳\`, businessId);
          }
          break;

        case 'ACCEPT_OFFER':
          await whatsappService.sendTextMessage(phone, \`Offer \${parsedCommand.data.offerId} accepted! Proceeding to fulfillment.\`, businessId);
          break;
          
        case 'REJECT_OFFER':
          await whatsappService.sendTextMessage(phone, \`Offer \${parsedCommand.data.offerId} rejected.\`, businessId);
          break;

        case 'VIEW_ORDERS':
          await whatsappService.sendTextMessage(phone, "Your Recent Orders:\n\n1. BZ-1234 (Completed)\n2. BZ-5678 (Pending)", businessId);
          break;

        case 'TRACK_ORDER':
          await whatsappService.sendTextMessage(phone, \`Order \${parsedCommand.data.orderId} is currently OUT FOR DELIVERY 🚚.\`, businessId);
          break;

        case 'CONFIRM_DELIVERY':
          await whatsappService.sendTextMessage(phone, \`Delivery for \${parsedCommand.data.orderId} confirmed! Payment will be released to the farmer.\`, businessId);
          break;

        case 'CANCEL_ORDER':
          await whatsappService.sendTextMessage(phone, \`Order \${parsedCommand.data.orderId} has been cancelled.\`, businessId);
          break;

        case 'UPDATE_LOCATION':
          user.botState.status = 'AWAITING_LOCATION';
          await user.save();
          await whatsappService.sendTextMessage(phone, "Please open the attachment menu and send your current **Location Pin**.", businessId);
          break;

        default:
          if (user.botState.status === 'IDLE') {
            await whatsappService.sendTextMessage(phone, "I didn't understand that command. Try 'check account balance' or 'buy yam within 10km radius'.", businessId);
          }
          break;
      }
    }
  }
};

export default whatsappBotService;
