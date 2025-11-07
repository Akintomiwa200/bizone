import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
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
  logo: {
    url: String,
    publicId: String
  },
  coverImage: {
    url: String,
    publicId: String
  },
  contact: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: { type: String, default: 'Nigeria' },
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    website: String
  },
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String
  },
  settings: {
    isActive: { type: Boolean, default: true },
    acceptOrders: { type: Boolean, default: true },
    acceptDelivery: { type: Boolean, default: true },
    currency: { type: String, default: 'NGN' }
  },
  stats: {
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for location-based queries
businessSchema.index({ 'contact.address.coordinates': '2dsphere' });
businessSchema.index({ category: 1 });

export default mongoose.model('Business', businessSchema);

