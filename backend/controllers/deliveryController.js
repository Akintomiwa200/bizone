import Delivery from '../models/Delivery.js';
import Order from '../models/Order.js';
import Business from '../models/Business.js';
import { deliveryService } from '../services/deliveryService.js';

// @desc    Request a delivery for an order
// @route   POST /api/delivery/request
// @access  Private
export const requestDelivery = async (req, res) => {
  try {
    const { orderId, pickup, dropoff, package: packageInfo } = req.body;

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
        message: 'Not authorized'
      });
    }

    // Calculate delivery fee
    const distance = deliveryService.calculateDistance(
      pickup.location.coordinates,
      dropoff.location.coordinates
    );
    
    const baseFee = 500;
    const distanceFee = distance * 100;
    const sizeFee = packageInfo?.size === 'large' ? 200 : packageInfo?.size === 'xlarge' ? 500 : 0;
    const total = baseFee + distanceFee + sizeFee;

    // Calculate ETA
    const eta = await deliveryService.calculateETA(
      pickup.location.coordinates,
      dropoff.location.coordinates
    );

    const delivery = await Delivery.create({
      order: orderId,
      business: order.business._id,
      pickup,
      dropoff,
      package: packageInfo,
      pricing: {
        baseFee,
        distanceFee,
        sizeFee,
        total,
        paymentMethod: order.paymentMethod === 'cash' ? 'cash-on-delivery' : 'prepaid',
        codAmount: order.paymentMethod === 'cash' ? order.total : 0
      },
      timeline: {
        estimatedPickup: new Date(),
        estimatedDelivery: new Date(Date.now() + eta * 60000)
      }
    });

    // Update order with delivery reference
    order.delivery = delivery._id;
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Delivery requested successfully',
      data: delivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error requesting delivery',
      error: error.message
    });
  }
};

// @desc    Track a delivery
// @route   GET /api/delivery/:deliveryId/track
// @access  Public
export const trackDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    
    const delivery = await Delivery.findById(deliveryId)
      .populate('order', 'orderNumber customer')
      .populate({
        path: 'rider',
        select: 'vehicle status currentLocation rating stats',
        populate: {
          path: 'user',
          select: 'name phone email'
        }
      })
      .populate('business', 'name');

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    res.json({
      success: true,
      data: delivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking delivery',
      error: error.message
    });
  }
};

// @desc    Update delivery status
// @route   PATCH /api/delivery/:deliveryId/status
// @access  Private
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { status, note, location } = req.body;

    const delivery = await Delivery.findById(deliveryId).populate('business');
    
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Verify authorization (business owner or rider)
    const isBusinessOwner = delivery.business.owner.toString() === req.user._id.toString();
    
    // For rider check, we need to populate rider first to check rider.user
    let isRider = false;
    if (delivery.rider) {
      await delivery.populate({
        path: 'rider',
        select: 'user'
      });
      isRider = delivery.rider?.user?.toString() === req.user._id.toString();
    }
    
    if (!isBusinessOwner && !isRider) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedDelivery = await deliveryService.updateDeliveryStatus(
      deliveryId,
      status,
      note,
      location
    );

    res.json({
      success: true,
      message: 'Delivery status updated successfully',
      data: updatedDelivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating delivery status',
      error: error.message
    });
  }
};

// @desc    Find available riders for a delivery
// @route   GET /api/delivery/riders
// @access  Private
export const findAvailableRiders = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const riders = await deliveryService.findAvailableRiders(
      { lat: parseFloat(lat), lng: parseFloat(lng) },
      maxDistance
    );

    res.json({
      success: true,
      data: riders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error finding riders',
      error: error.message
    });
  }
};

// @desc    Assign rider to delivery
// @route   POST /api/delivery/:deliveryId/assign
// @access  Private
export const assignRider = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { riderId } = req.body;

    const delivery = await Delivery.findById(deliveryId).populate('business');
    
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Verify business ownership
    if (delivery.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedDelivery = await deliveryService.assignRider(deliveryId, riderId);

    res.json({
      success: true,
      message: 'Rider assigned successfully',
      data: updatedDelivery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning rider',
      error: error.message
    });
  }
};

