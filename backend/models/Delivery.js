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
  if (this.isNew && !this.deliveryId) {
    const count = await mongoose.model('Delivery').countDocuments();
    this.deliveryId = `DV${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index for location-based queries
deliverySchema.index({ 'pickup.location.coordinates': '2dsphere' });
deliverySchema.index({ 'dropoff.location.coordinates': '2dsphere' });

export default mongoose.model('Delivery', deliverySchema);

