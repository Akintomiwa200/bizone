import mongoose from 'mongoose';

const riderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  vehicle: {
    type: {
      type: String,
      enum: ['bicycle', 'motorcycle', 'car', 'truck'],
      required: true
    },
    plateNumber: String,
    make: String,
    model: String,
    color: String
  },
  documents: {
    license: {
      number: String,
      expiryDate: Date,
      document: String
    },
    insurance: {
      number: String,
      expiryDate: Date,
      document: String
    },
    registration: {
      number: String,
      expiryDate: Date,
      document: String
    }
  },
  currentLocation: {
    coordinates: {
      lat: Number,
      lng: Number
    },
    address: String,
    lastUpdated: Date
  },
  status: {
    type: String,
    enum: ['available', 'on-delivery', 'offline', 'suspended'],
    default: 'offline'
  },
  currentDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  stats: {
    completedDeliveries: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    onTimeRate: { type: Number, default: 0 }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location-based queries
riderSchema.index({ 'currentLocation.coordinates': '2dsphere' });

export default mongoose.model('Rider', riderSchema);

