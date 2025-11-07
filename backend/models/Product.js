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

