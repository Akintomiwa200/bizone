




# **Bizone Platform - Complete Project Documentation**

## **🚀 Project Overview**

**Bizone** is an all-in-one business companion platform designed to empower Nigerian MSMEs (Micro, Small, and Medium Enterprises) by solving four critical challenges: Digitalization, Financial Inclusion, Productivity, and Logistics through an integrated tech solution.

### **Core Value Proposition**
- **For MSMEs**: Single platform to go digital, manage operations, access credit, and handle deliveries
- **For Customers**: Seamless shopping experience with reliable delivery
- **For Riders**: Gig economy opportunities in the delivery network

---

## **📁 Complete Backend Structure & Implementation**

### **1. Configuration Files**

#### **config/database.js**
```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🗄️ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

#### **config/cloudinary.js**
```javascript
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

#### **config/payment.js**
```javascript
import { Flutterwave } from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

export const paymentConfig = {
  // Flutterwave configuration
  currency: 'NGN',
  country: 'NG',
  paymentMethods: ['card', 'account', 'transfer', 'ussd'],
};

export default flw;
```

### **2. Database Models**

#### **models/User.js**
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['business_owner', 'rider', 'admin'],
    default: 'business_owner'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profile: {
    avatar: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    idNumber: String,
    idDocument: String
  },
  location: {
    address: String,
    city: { type: String, default: 'Jos' },
    state: { type: String, default: 'Plateau' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  },
  creditScore: {
    score: { type: Number, default: 0 },
    lastUpdated: Date,
    factors: {
      transactionConsistency: Number,
      orderCompletionRate: Number,
      customerRatings: Number,
      businessLongevity: Number
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);
```

#### **models/Product.js**
```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  costPerItem: {
    type: Number,
    min: 0
  },
  images: [{
    url: String,
    publicId: String
  }],
  inventory: {
    trackQuantity: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
    lowStockAlert: { type: Number, default: 5 }
  },
  variants: [{
    name: String, // e.g., "Size", "Color"
    options: [String] // e.g., ["Small", "Medium", "Large"]
  }],
  shipping: {
    weight: Number,
    requiresShipping: { type: Boolean, default: true }
  },
  seo: {
    title: String,
    description: String
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  stats: {
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ 
  name: 'text', 
  description: 'text',
  category: 'text'
});

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function() {
  if (!this.costPerItem) return 0;
  return ((this.price - this.costPerItem) / this.price) * 100;
});

export default mongoose.model('Product', productSchema);
```

#### **models/Delivery.js**
```javascript
import mongoose from 'mongoose';

const deliveryUpdateSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered', 'failed']
  },
  note: String,
  location: {
    coordinates: {
      lat: Number,
      lng: Number
    },
    address: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const deliverySchema = new mongoose.Schema({
  deliveryId: {
    type: String,
    unique: true,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  },
  pickup: {
    location: {
      coordinates: {
        lat: Number,
        lng: Number
      },
      address: String,
      contact: {
        name: String,
        phone: String
      }
    },
    instructions: String
  },
  dropoff: {
    location: {
      coordinates: {
        lat: Number,
        lng: Number
      },
      address: String,
      landmark: String
    },
    contact: {
      name: String,
      phone: String
    },
    instructions: String
  },
  package: {
    description: String,
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'xlarge']
    },
    weight: Number,
    items: [{
      name: String,
      quantity: Number
    }]
  },
  pricing: {
    baseFee: Number,
    distanceFee: Number,
    sizeFee: Number,
        total: Number,
    paymentMethod: {
      type: String,
      enum: ['prepaid', 'cash-on-delivery'],
      default: 'prepaid'
    },
    codAmount: Number
  },
  timeline: {
    estimatedPickup: Date,
    actualPickup: Date,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered', 'failed'],
    default: 'pending'
  },
  updates: [deliveryUpdateSchema],
  rating: {
    speed: { type: Number, min: 1, max: 5 },
    service: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    comment: String
  }
}, {
  timestamps: true
});

// Generate delivery ID before saving
deliverySchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Delivery').countDocuments();
    this.deliveryId = `DV${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index for location-based queries
deliverySchema.index({ 'pickup.location.coordinates': '2dsphere' });
deliverySchema.index({ 'dropoff.location.coordinates': '2dsphere' });

export default mongoose.model('Delivery', deliverySchema);
```

### **3. Controllers**

#### **controllers/businessController.js**
```javascript
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
```

#### **controllers/orderController.js**
```javascript
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Business from '../models/Business.js';
import { notificationService } from '../services/notificationService.js';

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
    const deliveryFee = calculateDeliveryFee(deliveryAddress, business.contact.address);
    const total = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      business: businessId,
      customer,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      notes,
      'customer.deliveryAddress': deliveryAddress
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
    io.to(`business-${businessId}`).emit('new-order', order);

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
    io.to(`business-${order.business._id}`).emit('order-updated', order);
    io.to(`order-${order._id}`).emit('status-changed', order);

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

// Helper function to calculate delivery fee
function calculateDeliveryFee(deliveryAddress, businessAddress) {
  // Simplified calculation - in production, use distance matrix API
  const baseFee = 500; // ₦500 base fee
  const perKmFee = 100; // ₦100 per km
  
  // Calculate distance (simplified)
  const distance = calculateDistance(
    businessAddress.coordinates,
    deliveryAddress.coordinates
  );
  
  return baseFee + (distance * perKmFee);
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
```

### **4. Services**

#### **services/deliveryService.js**
```javascript
import Delivery from '../models/Delivery.js';
import Rider from '../models/Rider.js';
import { notificationService } from './notificationService.js';

export const deliveryService = {
  // Find available riders near pickup location
  async findAvailableRiders(pickupLocation, maxDistance = 5) {
    try {
      const riders = await Rider.find({
        status: 'available',
        'currentLocation.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [pickupLocation.lng, pickupLocation.lat]
            },
            $maxDistance: maxDistance * 1000 // meters
          }
        }
      }).sort({ rating: -1 });

      return riders;
    } catch (error) {
      throw new Error(`Error finding riders: ${error.message}`);
    }
  },

  // Assign rider to delivery
  async assignRider(deliveryId, riderId) {
    try {
      const delivery = await Delivery.findById(deliveryId);
      const rider = await Rider.findById(riderId);

      if (!delivery || !rider) {
        throw new Error('Delivery or rider not found');
      }

      if (rider.status !== 'available') {
        throw new Error('Rider is not available');
      }

      delivery.rider = riderId;
      delivery.status = 'assigned';
      delivery.updates.push({
        status: 'assigned',
        note: `Rider ${rider.user.name} assigned to delivery`
      });

      rider.status = 'on-delivery';
      rider.currentDelivery = deliveryId;

      await Promise.all([delivery.save(), rider.save()]);

      // Notify rider
      await notificationService.sendDeliveryAssignment(rider.user.phone, delivery);

      return delivery;
    } catch (error) {
      throw new Error(`Error assigning rider: ${error.message}`);
    }
  },

  // Calculate delivery ETA
  async calculateETA(pickupLocation, dropoffLocation) {
    // In production, use Google Maps Distance Matrix API
    const distance = this.calculateDistance(pickupLocation, dropoffLocation);
    const averageSpeed = 25; // km/h in city traffic
    const baseTime = 15; // minutes for pickup and dropoff
    
    const travelTime = (distance / averageSpeed) * 60; // minutes
    return Math.round(baseTime + travelTime);
  },

  // Calculate distance between two points
  calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Update delivery status
  async updateDeliveryStatus(deliveryId, status, note = '', riderLocation = null) {
    try {
      const delivery = await Delivery.findById(deliveryId);
      
      if (!delivery) {
        throw new Error('Delivery not found');
      }

      delivery.status = status;
      delivery.updates.push({
        status,
        note,
        location: riderLocation
      });

      // Update timeline
      const now = new Date();
      if (status === 'picked-up' && !delivery.timeline.actualPickup) {
        delivery.timeline.actualPickup = now;
      } else if (status === 'delivered' && !delivery.timeline.actualDelivery) {
        delivery.timeline.actualDelivery = now;
        
        // Mark rider as available
        await Rider.findByIdAndUpdate(delivery.rider, {
          status: 'available',
          $unset: { currentDelivery: 1 },
          $inc: { completedDeliveries: 1 }
        });
      }

      await delivery.save();

      // Notify business and customer
      await notificationService.sendDeliveryStatusUpdate(delivery, status);

      return delivery;
    } catch (error) {
      throw new Error(`Error updating delivery status: ${error.message}`);
    }
  }
};
```

---

## **📱 Complete Frontend Implementation**

### **1. Core Hooks**

#### **hooks/useAuth.ts**
```typescript
import { useState, useEffect, createContext, useContext } from 'react';
import { useAppStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { User, LoginData, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setLoading } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('bizon_token');
      if (token) {
        const userData = await authAPI.getMe();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('bizon_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      
      localStorage.setItem('bizon_token', response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      
      localStorage.setItem('bizon_token', response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('bizon_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### **hooks/useBusiness.ts**
```typescript
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { businessAPI } from '@/lib/api';
import { Business, Product, CreateBusinessData, CreateProductData } from '@/types';
import { useAppStore } from '@/lib/store';

export const useBusiness = () => {
  const { currentBusiness, setCurrentBusiness } = useAppStore();
  const queryClient = useQueryClient();

  // Fetch user's business
  const { data: business, isLoading, error } = useQuery(
    'my-business',
    businessAPI.getMyBusiness,
    {
      enabled: !currentBusiness,
      onSuccess: (data) => {
        if (data) setCurrentBusiness(data);
      }
    }
  );

  // Create business mutation
  const createBusinessMutation = useMutation(
    (data: CreateBusinessData) => businessAPI.createBusiness(data),
    {
      onSuccess: (newBusiness) => {
        setCurrentBusiness(newBusiness);
        queryClient.setQueryData('my-business', newBusiness);
      }
    }
  );

  // Update business mutation
  const updateBusinessMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<Business> }) => 
      businessAPI.updateBusiness(id, data),
    {
      onSuccess: (updatedBusiness) => {
        setCurrentBusiness(updatedBusiness);
        queryClient.setQueryData('my-business', updatedBusiness);
      }
    }
  );

  // Products management
  const { data: products = [] } = useQuery(
    ['products', currentBusiness?._id],
    () => businessAPI.getProducts(currentBusiness!._id),
    { enabled: !!currentBusiness }
  );

  const createProductMutation = useMutation(
    (data: CreateProductData) => businessAPI.createProduct(currentBusiness!._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products', currentBusiness?._id]);
      }
    }
  );

  return {
    business: currentBusiness || business,
    isLoading,
    error,
    products,
    createBusiness: createBusinessMutation.mutateAsync,
    updateBusiness: updateBusinessMutation.mutateAsync,
    createProduct: createProductMutation.mutateAsync,
    isCreatingBusiness: createBusinessMutation.isLoading,
    isUpdatingBusiness: updateBusinessMutation.isLoading,
    isCreatingProduct: createProductMutation.isLoading
  };
};
```

### **2. API Layer**

#### **lib/api.ts**
```typescript
import axios from 'axios';
import { 
  User, Business, Product, Order, 
  LoginData, RegisterData, CreateBusinessData, CreateProductData 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bizon_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bizon_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  }
};

export const businessAPI = {
  createBusiness: async (data: CreateBusinessData): Promise<Business> => {
    const response = await api.post('/businesses', data);
    return response.data.data;
  },

  getMyBusiness: async (): Promise<Business> => {
    const response = await api.get('/businesses/my-business');
    return response.data.data;
  },

  updateBusiness: async (id: string, data: Partial<Business>): Promise<Business> => {
    const response = await api.put(`/businesses/${id}`, data);
    return response.data.data;
  },

  getProducts: async (businessId: string): Promise<Product[]> => {
    const response = await api.get(`/businesses/${businessId}/products`);
    return response.data.data;
  },

  createProduct: async (businessId: string, data: CreateProductData): Promise<Product> => {
    const response = await api.post(`/businesses/${businessId}/products`, data);
    return response.data.data;
  },

  updateProduct: async (businessId: string, productId: string, data: Partial<Product>) => {
    const response = await api.put(`/businesses/${businessId}/products/${productId}`, data);
    return response.data.data;
  },

  deleteProduct: async (businessId: string, productId: string) => {
    const response = await api.delete(`/businesses/${businessId}/products/${productId}`);
    return response.data;
  }
};

export const ordersAPI = {
  createOrder: async (data: any): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data.data;
  },

  getBusinessOrders: async (businessId: string, params?: any) => {
    const response = await api.get(`/orders/business/${businessId}`, { params });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string, note?: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status, note });
    return response.data.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
  }
};

export const deliveryAPI = {
  requestDelivery: async (orderId: string, data: any) => {
    const response = await api.post('/delivery/request', { orderId, ...data });
    return response.data.data;
  },

  trackDelivery: async (deliveryId: string) => {
    const response = await api.get(`/delivery/${deliveryId}/track`);
    return response.data.data;
  },

  updateDeliveryStatus: async (deliveryId: string, status: string, note?: string) => {
    const response = await api.patch(`/delivery/${deliveryId}/status`, { status, note });
    return response.data.data;
  }
};

export default api;
```

### **3. Key Components**

#### **components/business/ProductForm.tsx**
```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product, CreateProductData } from '@/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({ 
  product, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: ProductFormProps) {
  const isEditing = !!product;
  const { register, handleSubmit, formState: { errors } } = useForm<CreateProductData>({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      comparePrice: product.comparePrice,
      costPerItem: product.costPerItem,
      inventory: {
        trackQuantity: product.inventory.trackQuantity,
        quantity: product.inventory.quantity,
        lowStockAlert: product.inventory.lowStockAlert
      }
    } : {}
  });

  const [images, setImages] = useState<File[]>([]);

  const handleFormSubmit = async (data: CreateProductData) => {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(data).forEach(key => {
      if (key === 'inventory') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key as keyof CreateProductData] as string);
      }
    });

    // Append images
    images.forEach(image => {
      formData.append('images', image);
    });

    await onSubmit(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Product Name */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Product name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="food">Food & Beverages</option>
            <option value="fashion">Fashion & Apparel</option>
            <option value="electronics">Electronics</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="home">Home & Living</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₦) *
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Compare Price */}
        <div>
          <label htmlFor="comparePrice" className="block text-sm font-medium text-gray-700">
            Compare Price (₦)
          </label>
          <input
            type="number"
            id="comparePrice"
            step="0.01"
            min="0"
            {...register('comparePrice')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Cost per Item */}
        <div>
          <label htmlFor="costPerItem" className="block text-sm font-medium text-gray-700">
            Cost per Item (₦)
          </label>
          <input
            type="number"
            id="costPerItem"
            step="0.01"
            min="0"
            {...register('costPerItem')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Inventory Tracking */}
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="trackQuantity"
              {...register('inventory.trackQuantity')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="trackQuantity" className="ml-2 block text-sm text-gray-700">
              Track quantity
            </label>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity in Stock
          </label>
          <input
            type="number"
            id="quantity"
            min="0"
            {...register('inventory.quantity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Low Stock Alert */}
        <div>
          <label htmlFor="lowStockAlert" className="block text-sm font-medium text-gray-700">
            Low Stock Alert
          </label>
          <input
            type="number"
            id="lowStockAlert"
            min="0"
            {...register('inventory.lowStockAlert')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Images */}
        <div className="sm:col-span-2">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
```

#### **components/orders/OrderTimeline.tsx**
```typescript
import { Order, OrderStatus } from '@/types';

interface OrderTimelineProps {
  order: Order;
  currentStatus: OrderStatus;
}

const statusSteps: { key: OrderStatus; label: string; description: string }[] = [
  { key: 'pending', label: 'Order Placed', description: 'Customer has placed the order' },
  { key: 'confirmed', label: 'Confirmed', description: 'Business has confirmed the order' },
  { key: 'preparing', label: 'Preparing', description: 'Order is being prepared' },
  { key: 'ready', label: 'Ready', description: 'Order is ready for pickup' },
  { key: 'out-for-delivery', label: 'Out for Delivery', description: 'Rider is delivering order' },
  { key: 'delivered', label: 'Delivered', description: 'Order has been delivered' },
];

export default function OrderTimeline({ order, currentStatus }: OrderTimelineProps) {
  const currentIndex = statusSteps.findIndex(step => step.key === currentStatus);

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {statusSteps.map((step, stepIdx) => {
          const isCompleted = stepIdx < currentIndex;
          const isCurrent = stepIdx === currentIndex;
          const isUpcoming = stepIdx > currentIndex;

          return (
            <li key={step.key}>
              <div className="relative pb-8">
                {stepIdx !== statusSteps.length - 1 ? (
                  <span
                    className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                      isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                        isCompleted
                          ? 'bg-blue-600'
                          : isCurrent
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5 text-white" />
                      ) : isCurrent ? (
                        <span className="h-2.5 w-2.5 bg-white rounded-full" />
                      ) : (
                        <span className="h-2.5 w-2.5 bg-gray-300 rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                    {isCurrent && (
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        Current
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

---

## **🚀 Quick Start Guide**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 5+
- npm or yarn

### **Installation & Setup**

1. **Clone and Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

2. **Clone and Setup Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure your .env.local file
npm run dev
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api/docs

### **Environment Variables**

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bizon
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Flutterwave Payments
FLW_PUBLIC_KEY=your_flutterwave_public_key
FLW_SECRET_KEY=your_flutterwave_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMS (Termii)
TERMII_API_KEY=your_termii_key
TERMII_SENDER_ID=Bizon

FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## **🎯 MVP Implementation Priority**

### **Phase 1 (Day 1) - Core Business Features**
1. User authentication & registration
2. Business profile creation
3. Product management (CRUD)
4. Basic order creation system

### **Phase 2 (Day 2) - Order & Delivery System**
1. Order management dashboard
2. Delivery request system
3. Rider assignment simulation
4. Real-time order tracking

### **Key Features Demonstrable in 48 Hours**
- ✅ Business onboarding
- ✅ Product catalog management
- ✅ Order placement & processing
- ✅ Delivery request & tracking
- ✅ Real-time status updates
- ✅ Basic analytics dashboard

This comprehensive structure provides a solid foundation for building the Bizon platform with proper separation of concerns, scalability, and all the essential features needed for MSME empowerment in Nigeria.
    



 -->