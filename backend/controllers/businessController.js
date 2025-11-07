import Business from '../models/Business.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { analyticsService } from '../services/analyticsService.js';

// @desc    Create a new business
// @route   POST /api/businesses
// @access  Private
export const createBusiness = async (req, res) => {
  try {
    const { name, description, category, contact, social } = req.body;
    
    // Check if user already has a business
    const existingBusiness = await Business.findOne({ owner: req.user._id });
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: 'You already have a business registered'
      });
    }

    const business = await Business.create({
      owner: req.user._id,
      name,
      description,
      category,
      contact,
      social
    });

    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating business',
      error: error.message
    });
  }
};

// @desc    Get user's business
// @route   GET /api/businesses/my-business
// @access  Private
export const getMyBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id })
      .populate('owner', 'name email phone');

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching business',
      error: error.message
    });
  }
};

// @desc    Update business
// @route   PUT /api/businesses/:id
// @access  Private
export const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Business updated successfully',
      data: updatedBusiness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating business',
      error: error.message
    });
  }
};

// @desc    Get business analytics
// @route   GET /api/businesses/:id/analytics
// @access  Private
export const getBusinessAnalytics = async (req, res) => {
  try {
    const business = await Business.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const analytics = await analyticsService.getBusinessAnalytics(business._id);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};

// @desc    Get nearby businesses
// @route   GET /api/businesses/nearby
// @access  Public
export const getNearbyBusinesses = async (req, res) => {
  try {
    const { lat, lng, radius = 10, category } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const query = {
      'contact.address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      },
      'settings.isActive': true
    };

    if (category) {
      query.category = category;
    }

    const businesses = await Business.find(query)
      .populate('owner', 'name phone')
      .limit(50);

    res.json({
      success: true,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby businesses',
      error: error.message
    });
  }
};

