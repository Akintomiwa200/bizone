import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Business from '../models/Business.js';
import { notificationService } from '../services/notificationService.js';

// Helper function to calculate delivery fee
function calculateDeliveryFee(deliveryAddress, businessAddress) {
  // Simplified calculation - in production, use distance matrix API
  const baseFee = 500; // ₦500 base fee
  const perKmFee = 100; // ₦100 per km
  
  // Calculate distance (simplified)
  if (deliveryAddress?.coordinates && businessAddress?.coordinates) {
    const distance = calculateDistance(
      businessAddress.coordinates,
      deliveryAddress.coordinates
    );
    return baseFee + (distance * perKmFee);
  }
  
  return baseFee;
}

function calculateDistance(coord1, coord2) {
  // Haversine formula implementation
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { businessId, customer, items, notes, deliveryAddress } = req.body;

    // Verify business exists and is active
    const business = await Business.findOne({ 
      _id: businessId, 
      'settings.isActive': true,
      'settings.acceptOrders': true 
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found or not accepting orders'
      });
    }

    // Calculate order totals and verify products
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        business: businessId,
        status: 'active'
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      if (product.inventory.trackQuantity && product.inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for: ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }

    // Calculate delivery fee (simplified for MVP)
    const deliveryFee = calculateDeliveryFee(deliveryAddress, business.contact?.address);
    const total = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      business: businessId,
      customer: {
        ...customer,
        deliveryAddress
      },
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      notes
    });

    // Update product inventory
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { 'inventory.quantity': -item.quantity } }
      );
    }

    // Send notification to business owner
    await notificationService.sendNewOrderNotification(business.owner, order);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`business-${businessId}`).emit('new-order', order);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// @desc    Get business orders
// @route   GET /api/orders/business/:businessId
// @access  Private
export const getBusinessOrders = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { status, page = 1, limit = 20 } = req.query;

    // Verify business ownership
    const business = await Business.findOne({ 
      _id: businessId, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const query = { business: businessId };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:orderId/status
// @access  Private
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(orderId).populate('business');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify business ownership
    if (order.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.status = status;
    if (note) order.notes = note;
    await order.save();

    // Send notification to customer
    await notificationService.sendOrderStatusUpdate(order.customer.phone, order);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`business-${order.business._id}`).emit('order-updated', order);
      io.to(`order-${order._id}`).emit('status-changed', order);
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:orderId
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId)
      .populate('business', 'name')
      .populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

