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
    sparse: true,
    // Phone is optional for OAuth users, required for local auth
    // Validation handled in pre-save hook
  },
  password: {
    type: String,
    required: function() {
      return this.authProvider === 'local';
    },
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
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  facebookId: {
    type: String,
    sparse: true,
    unique: true
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

// Validate phone for local auth users
userSchema.pre('validate', function(next) {
  if (this.authProvider === 'local' && !this.phone) {
    this.invalidate('phone', 'Phone number is required for local authentication');
  }
  next();
});

// Hash password before saving (only for local auth)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  if (this.authProvider !== 'local' && !this.password) {
    // OAuth users don't need passwords
    return next();
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
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

