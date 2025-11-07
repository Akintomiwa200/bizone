import Order from '../models/Order.js';
import flw, { paymentConfig } from '../config/payment.js';

// @desc    Initialize payment
// @route   POST /api/payment/initialize
// @access  Public
export const initializePayment = async (req, res) => {
  try {
    const { orderId, customer } = req.body;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Initialize Flutterwave payment
    const payload = {
      tx_ref: order.orderNumber,
      amount: order.total,
      currency: paymentConfig.currency,
      redirect_url: `${process.env.FRONTEND_URL}/payment/callback`,
      payment_options: paymentConfig.paymentMethods.join(','),
      customer: {
        email: customer.email || order.customer.email,
        phonenumber: customer.phone || order.customer.phone,
        name: customer.name || order.customer.name
      },
      customizations: {
        title: 'Bizone Payment',
        description: `Payment for order ${order.orderNumber}`,
        logo: process.env.FRONTEND_URL + '/logo.png'
      }
    };

    const response = await flw.Transaction.initialize(payload);

    if (response.status === 'success') {
      res.json({
        success: true,
        message: 'Payment initialized successfully',
        data: {
          paymentLink: response.data.link,
          txRef: response.data.tx_ref
        }
      });
    } else {
      throw new Error('Failed to initialize payment');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing payment',
      error: error.message
    });
  }
};

// @desc    Verify payment
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
  try {
    const { txRef } = req.body;

    const response = await flw.Transaction.verify({ tx_ref: txRef });

    if (response.status === 'success' && response.data.status === 'successful') {
      // Find order by order number
      const order = await Order.findOne({ orderNumber: txRef });
      
      if (order) {
        order.paymentStatus = 'paid';
        await order.save();
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: response.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        data: response.data
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// @desc    Handle payment webhook
// @route   POST /api/payment/webhook
// @access  Public
export const paymentWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === 'charge.completed') {
      const order = await Order.findOne({ orderNumber: data.tx_ref });
      
      if (order && data.status === 'successful') {
        order.paymentStatus = 'paid';
        await order.save();
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing webhook',
      error: error.message
    });
  }
};

