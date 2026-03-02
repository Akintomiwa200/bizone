import mongoose from 'mongoose';

const riderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'on-delivery', 'offline'],
    default: 'offline'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  vehicle: {
    type: {
      type: String,
      enum: ['bike', 'tricycle', 'car', 'van'],
      default: 'bike'
    },
    plateNumber: String,
    color: String
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    },
    updatedAt: Date
  },
  currentDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  stats: {
    completedDeliveries: { type: Number, default: 0 },
    failedDeliveries: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

riderSchema.index({ currentLocation: '2dsphere' });

export default mongoose.model('Rider', riderSchema);
