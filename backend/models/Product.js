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
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  stats: {
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 }
  },
  // Advanced pricing configuration for WhatsApp trade flows
  pricing: {
    unitLabel: { type: String, default: 'unit' }, // e.g. "bag", "kg"
    basePricePerUnit: { type: Number, min: 0 },   // canonical per‑unit price
    minOrderQuantity: { type: Number, min: 1, default: 1 },
    bulkRules: [
      {
        minQuantity: { type: Number, min: 1 },
        pricePerUnit: { type: Number, min: 0 }
      }
    ],
    discountRules: [
      {
        type: { type: String, enum: ['PERCENTAGE', 'FLAT'], default: 'PERCENTAGE' },
        thresholdQuantity: { type: Number, min: 1 },
        value: { type: Number, min: 0 } // percentage or flat NGN amount
      }
    ]
  },
  // Delivery configuration specific to this product
  deliveryOptions: {
    enabled: { type: Boolean, default: false },
    radiusKm: { type: Number, min: 0, default: 0 },
    feeType: {
      type: String,
      enum: ['FLAT', 'PER_KM', 'NONE'],
      default: 'NONE'
    },
    feeFlat: { type: Number, min: 0, default: 0 },
    feePerKm: { type: Number, min: 0, default: 0 }
  },
  // Negotiation behaviour when buyers make offers via WhatsApp
  negotiationPlan: {
    mode: {
      type: String,
      enum: ['NONE', 'AUTO', 'MANUAL'],
      default: 'AUTO'
    },
    maxDiscountPercent: { type: Number, min: 0, max: 100, default: 10 },
    autoAcceptMinPrice: { type: Number, min: 0 } // explicit floor; if set it overrides computed floor
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

// GeoSpatial Index for radius searches
productSchema.index({ location: '2dsphere' });

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function () {
  if (!this.costPerItem) return 0;
  return ((this.price - this.costPerItem) / this.price) * 100;
});

export default mongoose.model('Product', productSchema);

