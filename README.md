# **Bizone Platform - Complete Professional Documentation**

## **📋 Table of Contents**
1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Technology Stack](#-technology-stack)
4. [System Requirements](#-system-requirements)
5. [Installation Guide](#-installation-guide)
6. [Environment Configuration](#-environment-configuration)
7. [Database Schema](#-database-schema)
8. [API Documentation](#-api-documentation)
9. [Frontend Structure](#-frontend-structure)
10. [Deployment Guide](#-deployment-guide)
11. [Testing Strategy](#-testing-strategy)
12. [Security Considerations](#-security-considerations)
13. [Performance Optimization](#-performance-optimization)
14. [Troubleshooting Guide](#-troubleshooting-guide)
15. [Contributing Guidelines](#-contributing-guidelines)
16. [License](#-license)
17. [Project Governance & Legal](#-project-governance--legal)

---

## **📘 Project Governance & Legal**

- License: `MIT` ([LICENSE](./LICENSE))
- Contributing Guide: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- Security Policy: [SECURITY.md](./SECURITY.md)
- Changelog: [CHANGELOG.md](./CHANGELOG.md)
- Release Checklist: [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)
- Root Environment Template: [\.env.example](./.env.example)

---

## **🚀 Project Overview**

**Bizone** is an all-in-one business companion platform designed to empower Nigerian MSMEs (Micro, Small, and Medium Enterprises) by solving four critical challenges: Digitalization, Financial Inclusion, Productivity, and Logistics through an integrated tech solution.

### **Core Value Proposition**
- **For MSMEs**: Single platform to go digital, manage operations, access credit, and handle deliveries
- **For Customers**: Seamless shopping experience with reliable delivery
- **For Riders**: Gig economy opportunities in the delivery network

### **Key Features**
- **Business Management**: Digital storefront, inventory management, order processing
- **Payment Integration**: Flutterwave for secure transactions
- **Delivery Network**: Real-time rider tracking and assignment
- **Analytics Dashboard**: Sales reports, customer insights, performance metrics
- **WhatsApp Integration**: Order notifications and customer communication
- **Credit Scoring**: Algorithm-based lending eligibility

---

## **🏗 System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
├───────────────────┬───────────────────┬─────────────────────┤
│   Next.js Frontend│   Mobile Web      │   WhatsApp Bot      │
│   (Port 3000)     │   (Responsive)    │   (Business API)    │
└─────────┬─────────┴─────────┬─────────┴──────────┬──────────┘
          │                   │                     │
          ▼                   ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                      Express.js Server                        │
│                      (Port 5000)                              │
│                      Socket.io (Real-time)                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
│  SERVICE LAYER  │ │  AUTH LAYER │ │  INTEGRATION    │
├─────────────────┤ ├─────────────┤ │     LAYER       │
│• Business       │ │• JWT Tokens │ ├─────────────────┤
│• Product        │ │• RBAC       │ │• Flutterwave    │
│• Order          │ │• Session    │ │• Cloudinary     │
│• Delivery       │ │  Management │ │• Termii SMS     │
│• Payment        │ └─────────────┘ │• Mapbox         │
│• Analytics      │                 └─────────────────┘
└─────────────────┘                             
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
├─────────────────────────────────────────────────────────────┤
│                   MongoDB (Primary DB)                       │
│                   Redis (Caching - Optional)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## **💻 Technology Stack**

### **Backend Stack**
| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Runtime | Node.js | 18+ | JavaScript runtime |
| Framework | Express | 5.2.1 | Web framework |
| Database | MongoDB | 5+ | Primary database |
| ODM | Mongoose | 9.2.2 | MongoDB object modeling |
| Authentication | JWT | 9.0.3 | Token-based auth |
| Real-time | Socket.io | 4.8.3 | Live updates |
| File Upload | Multer | 2.0.2 | File handling |
| Image Storage | Cloudinary | 2.9.0 | Cloud image storage |
| Payment | Flutterwave | 1.3.1 | Payment processing |
| Validation | Joi | 18.0.2 | Input validation |
| Logging | Winston | 3.19.0 | Application logging |
| Security | Helmet | 8.1.0 | HTTP headers security |
| Rate Limiting | express-rate-limit | 8.2.1 | API protection |
| Environment | dotenv | 17.3.1 | Config management |

### **Frontend Stack**
| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | Next.js | 14+ | React framework |
| Language | TypeScript | 5+ | Type safety |
| Styling | Tailwind CSS | 3+ | Utility-first CSS |
| State Management | Zustand | 4+ | Lightweight state |
| API Client | React Query | 5+ | Data fetching |
| Forms | React Hook Form | 7+ | Form handling |
| Maps | Mapbox GL | 3+ | Location services |
| Charts | Recharts | 2+ | Data visualization |

---

## **⚙️ System Requirements**

### **Development Environment**
```bash
# Minimum Requirements
- CPU: 2+ cores
- RAM: 4GB minimum, 8GB recommended
- Storage: 10GB free space
- OS: Windows 10/11, macOS 12+, or Linux (Ubuntu 20.04+)

# Software Requirements
- Node.js: v18.0.0 or higher
- npm: v8.0.0 or higher / pnpm: v7.0.0 or higher
- MongoDB: v5.0 or higher
- Git: v2.30 or higher
- Docker (optional): v20.10 or higher
```

### **Production Environment**
```bash
# Minimum Requirements
- CPU: 2+ cores (4+ recommended for high traffic)
- RAM: 4GB minimum, 8GB recommended
- Storage: 20GB SSD minimum
- Network: 100Mbps+ connection

# Recommended Cloud Specs (AWS EC2)
- Instance Type: t3.medium or larger
- Storage: gp3 SSD, 30GB+
- Load Balancer: Application Load Balancer
- CDN: CloudFront or Cloudflare
```

---

## **📦 Installation Guide**

### **Method 1: Standard Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/Akintomiwa200/bizone.git
cd bizone
```

#### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# or using pnpm (recommended for better performance)
pnpm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
# or
pnpm dev
```

#### **3. Frontend Setup**
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
# or
pnpm dev
```

#### **4. Database Setup**
```bash
# Start MongoDB locally
# On Ubuntu/Debian
sudo systemctl start mongod

# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:5
```

### **Method 2: Docker Installation**

#### **Using Docker Compose**
```bash
# Clone repository
git clone https://github.com/Akintomiwa200/bizone.git
cd bizone

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5
    container_name: bizone-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: bizone
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    container_name: bizone-backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      NODE_ENV: production
      PORT: 5000
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/bizone?authSource=admin
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    container_name: bizone-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000/api
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

volumes:
  mongodb_data:
```

---

## **🔧 Environment Configuration**

### **Backend Environment Variables (.env)**

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=development
PORT=5000
HOST=0.0.0.0
API_VERSION=v1

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/bizone

# MongoDB Atlas (Production)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bizone?retryWrites=true&w=majority

# With authentication
# MONGODB_URI=mongodb://username:password@localhost:27017/bizone?authSource=admin

# Connection Pool Settings
MONGODB_MAX_POOL_SIZE=10
MONGODB_MIN_POOL_SIZE=2
MONGODB_SOCKET_TIMEOUT_MS=45000
MONGODB_CONNECT_TIMEOUT_MS=10000

# ============================================
# AUTHENTICATION
# ============================================
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret-key
JWT_REFRESH_EXPIRES_IN=30d
BCRYPT_ROUNDS=12

# ============================================
# PAYMENT GATEWAY (Flutterwave)
# ============================================
FLW_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FLW_SECRET_KEY=FLWSECK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FLW_ENCRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FLW_WEBHOOK_SECRET=your-webhook-secret

# ============================================
# CLOUD STORAGE (Cloudinary)
# ============================================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_FOLDER=bizone

# ============================================
# SMS SERVICE (Termii)
# ============================================
TERMII_API_KEY=your_termii_api_key
TERMII_SENDER_ID=Bizone
TERMII_BASE_URL=https://api.termii.com

# ============================================
# EMAIL SERVICE (Optional)
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@bizone.com

# ============================================
# FRONTEND & CORS
# ============================================
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com

# ============================================
# RATE LIMITING
# ============================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=debug
LOG_FILE_PATH=logs/app.log

# ============================================
# REDIS (Optional - for caching)
# ============================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# ============================================
# WEBSOCKET
# ============================================
SOCKET_PATH=/socket.io
SOCKET_PING_TIMEOUT=60000
SOCKET_PING_INTERVAL=25000

# ============================================
# FILE UPLOAD
# ============================================
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
UPLOAD_PATH=uploads
```

### **Frontend Environment Variables (.env.local)**

```env
# ============================================
# API CONFIGURATION
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# MAP SERVICES
# ============================================
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...

# ============================================
# ANALYTICS
# ============================================
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=your-mixpanel-token

# ============================================
# FEATURE FLAGS
# ============================================
NEXT_PUBLIC_ENABLE_DELIVERY=true
NEXT_PUBLIC_ENABLE_PAYMENT=true
NEXT_PUBLIC_ENABLE_WHATSAPP=true

# ============================================
# PAYMENT
# ============================================
NEXT_PUBLIC_FLW_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# WHATSAPP BUSINESS API
# ============================================
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

---

## **🗄 Database Schema**

### **Complete MongoDB Schema Design**

```javascript
// ============================================
// USER COLLECTION
// ============================================
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  phone: String (unique, indexed),
  password: String (hashed),
  role: String (enum: ['business_owner', 'rider', 'admin']),
  isVerified: Boolean,
  isActive: Boolean,
  profile: {
    avatar: String,
    dateOfBirth: Date,
    gender: String,
    idNumber: String,
    idDocument: String,
    address: String
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  preferences: {
    notifications: Boolean,
    language: String,
    currency: String
  },
  creditScore: {
    score: Number,
    lastUpdated: Date,
    factors: {
      transactionConsistency: Number,
      orderCompletionRate: Number,
      customerRatings: Number,
      businessLongevity: Number
    }
  },
  metadata: {
    lastLogin: Date,
    loginCount: Number,
    deviceInfo: Mixed
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ location: '2dsphere' });
userSchema.index({ role: 1, isActive: 1 });

// ============================================
// BUSINESS COLLECTION
// ============================================
{
  _id: ObjectId,
  owner: ObjectId (ref: User),
  name: String (indexed),
  slug: String (unique),
  description: String,
  category: String,
  logo: String,
  coverImage: String,
  contact: {
    email: String,
    phone: String,
    website: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
      }
    },
    social: {
      facebook: String,
      instagram: String,
      twitter: String
    }
  },
  businessHours: [{
    day: String,
    open: String,
    close: String,
    closed: Boolean
  }],
  settings: {
    isActive: Boolean,
    acceptOrders: Boolean,
    autoConfirmOrders: Boolean,
    deliveryRadius: Number,
    minimumOrder: Number,
    preparationTime: Number
  },
  payment: {
    bankName: String,
    accountNumber: String,
    accountName: String,
    flutterwaveSubaccount: String
  },
  stats: {
    totalOrders: Number,
    totalRevenue: Number,
    averageRating: Number,
    totalProducts: Number
  },
  verification: {
    isVerified: Boolean,
    documents: [{
      type: String,
      url: String,
      verifiedAt: Date
    }]
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
businessSchema.index({ owner: 1 });
businessSchema.index({ slug: 1 }, { unique: true });
businessSchema.index({ category: 1, 'settings.isActive': 1 });
businessSchema.index({ 'contact.address.coordinates': '2dsphere' });
businessSchema.index({ name: 'text', description: 'text' });

// ============================================
// PRODUCT COLLECTION
// ============================================
{
  _id: ObjectId,
  business: ObjectId (ref: Business, indexed),
  name: String,
  description: String,
  category: String,
  price: Number,
  comparePrice: Number,
  costPerItem: Number,
  images: [{
    url: String,
    publicId: String,
    isPrimary: Boolean
  }],
  inventory: {
    trackQuantity: Boolean,
    quantity: Number,
    lowStockAlert: Number,
    soldOut: Boolean
  },
  variants: [{
    name: String,
    options: [String],
    price: Number
  }],
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    requiresShipping: Boolean
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  status: String (enum: ['active', 'draft', 'archived']),
  stats: {
    views: Number,
    sales: Number,
    revenue: Number
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
productSchema.index({ business: 1, status: 1 });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ name: 'text', description: 'text' });

// ============================================
// ORDER COLLECTION
// ============================================
{
  _id: ObjectId,
  orderId: String (unique),
  business: ObjectId (ref: Business),
  customer: {
    name: String,
    phone: String,
    email: String,
    deliveryAddress: {
      street: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number
      },
      instructions: String
    }
  },
  items: [{
    product: ObjectId (ref: Product),
    name: String,
    quantity: Number,
    price: Number,
    total: Number,
    variant: Mixed
  }],
  totals: {
    subtotal: Number,
    deliveryFee: Number,
    tax: Number,
    discount: Number,
    total: Number
  },
  payment: {
    method: String (enum: ['card', 'transfer', 'cash', 'wallet']),
    status: String (enum: ['pending', 'paid', 'failed', 'refunded']),
    transactionId: String,
    paidAt: Date,
    flutterwaveReference: String
  },
  delivery: {
    method: String (enum: ['pickup', 'delivery']),
    status: String (enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered']),
    rider: ObjectId (ref: User),
    trackingId: String,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  status: String (enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
  timeline: [{
    status: String,
    note: String,
    timestamp: Date
  }],
  notes: String,
  rating: {
    score: Number,
    review: String,
    createdAt: Date
  },
  metadata: {
    source: String (enum: ['web', 'whatsapp', 'mobile']),
    userAgent: String,
    ipAddress: String
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
orderSchema.index({ orderId: 1 }, { unique: true });
orderSchema.index({ business: 1, createdAt: -1 });
orderSchema.index({ 'customer.phone': 1 });
orderSchema.index({ status: 1, 'delivery.status': 1 });
orderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL

// ============================================
// DELIVERY COLLECTION
// ============================================
{
  _id: ObjectId,
  deliveryId: String (unique),
  order: ObjectId (ref: Order),
  business: ObjectId (ref: Business),
  rider: ObjectId (ref: User),
  pickup: {
    location: {
      coordinates: [Number],
      address: String
    },
    contact: {
      name: String,
      phone: String
    },
    instructions: String,
    timeWindow: {
      start: Date,
      end: Date
    }
  },
  dropoff: {
    location: {
      coordinates: [Number],
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
    size: String,
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
    paymentMethod: String
  },
  timeline: {
    estimatedPickup: Date,
    actualPickup: Date,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  status: String (enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered', 'failed']),
  updates: [{
    status: String,
    note: String,
    location: {
      coordinates: [Number],
      timestamp: Date
    }
  }],
  rating: {
    speed: Number,
    service: Number,
    communication: Number,
    comment: String
  },
  createdAt: Date,
  updatedAt: Date
}

// Indexes
deliverySchema.index({ deliveryId: 1 }, { unique: true });
deliverySchema.index({ order: 1 });
deliverySchema.index({ rider: 1, status: 1 });
deliverySchema.index({ 'pickup.location.coordinates': '2dsphere' });
deliverySchema.index({ 'dropoff.location.coordinates': '2dsphere' });

// ============================================
// TRANSACTION COLLECTION
// ============================================
{
  _id: ObjectId,
  transactionId: String (unique),
  user: ObjectId (ref: User),
  business: ObjectId (ref: Business),
  order: ObjectId (ref: Order),
  type: String (enum: ['payment', 'payout', 'refund', 'withdrawal']),
  amount: Number,
  currency: String,
  status: String (enum: ['pending', 'successful', 'failed']),
  paymentMethod: String,
  provider: String (enum: ['flutterwave', 'paystack', 'wallet']),
  providerReference: String,
  metadata: Mixed,
  fee: Number,
  netAmount: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
transactionSchema.index({ transactionId: 1 }, { unique: true });
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ business: 1, createdAt: -1 });
transactionSchema.index({ providerReference: 1 });
```

---

## **📡 API Documentation**

### **Base URL**
```
Development: http://localhost:5000/api/v1
Production: https://api.bizone.com/v1
```

### **Authentication**
All protected endpoints require a Bearer token:
```http
Authorization: Bearer <your_jwt_token>
```

### **Response Format**
```javascript
// Success Response
{
  success: true,
  message: "Operation successful",
  data: { ... }, // Response data
  meta: { // Pagination info
    page: 1,
    limit: 20,
    total: 100,
    pages: 5
  }
}

// Error Response
{
  success: false,
  error: "Error type",
  message: "Human readable message",
  code: 400,
  details: [ ... ] // Validation errors
}
```

### **Core Endpoints**

#### **Authentication**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| POST | `/auth/refresh` | Refresh access token | Public |
| GET | `/auth/me` | Get current user | Private |
| PUT | `/auth/profile` | Update profile | Private |
| POST | `/auth/logout` | Logout user | Private |
| POST | `/auth/verify-phone` | Verify phone number | Private |
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password` | Reset password | Public |

#### **Businesses**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/businesses` | Create business | Private |
| GET | `/businesses/my-business` | Get user's business | Private |
| PUT | `/businesses/:id` | Update business | Private |
| GET | `/businesses/nearby` | Get nearby businesses | Public |
| GET | `/businesses/:id/analytics` | Get business analytics | Private |
| GET | `/businesses/:id/products` | Get business products | Public |
| GET | `/businesses/:id/orders` | Get business orders | Private |

#### **Products**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | List products | Public |
| GET | `/products/search` | Search products | Public |
| GET | `/products/:id` | Get product details | Public |
| POST | `/products` | Create product | Private |
| PUT | `/products/:id` | Update product | Private |
| DELETE | `/products/:id` | Delete product | Private |
| POST | `/products/:id/images` | Upload product images | Private |

#### **Orders**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/orders` | Create order | Public |
| GET | `/orders/:id` | Get order details | Private |
| GET | `/orders/business/:businessId` | Get business orders | Private |
| PATCH | `/orders/:id/status` | Update order status | Private |
| POST | `/orders/:id/cancel` | Cancel order | Private |
| GET | `/orders/:id/track` | Track order | Public |

#### **Delivery**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/delivery/request` | Request delivery | Private |
| GET | `/delivery/:id/track` | Track delivery | Public |
| PATCH | `/delivery/:id/status` | Update delivery status | Private |
| POST | `/delivery/:id/assign` | Assign rider | Private |
| GET | `/delivery/nearby-riders` | Find nearby riders | Private |

#### **Payment**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/payment/initialize` | Initialize payment | Private |
| POST | `/payment/verify` | Verify payment | Private |
| POST | `/payment/webhook` | Payment webhook | Public |
| GET | `/payment/transactions` | List transactions | Private |

#### **WhatsApp**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/whatsapp/webhook` | WhatsApp webhook | Public |
| GET | `/whatsapp/webhook` | Webhook verification | Public |
| POST | `/whatsapp/send` | Send WhatsApp message | Private |

### **API Usage Examples**

#### **Register User**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "2348012345678",
    "password": "SecurePass123",
    "role": "business_owner"
  }'
```

#### **Login**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### **Create Business**
```bash
curl -X POST http://localhost:5000/api/v1/businesses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John's Store",
    "description": "Quality products",
    "category": "retail",
    "contact": {
      "phone": "2348012345678",
      "address": {
        "street": "123 Main St",
        "city": "Jos",
        "state": "Plateau",
        "coordinates": {
          "lat": 9.8965,
          "lng": 8.8583
        }
      }
    }
  }'
```

#### **Create Product**
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Rice",
    "description": "50kg bag of parboiled rice",
    "category": "food",
    "price": 45000,
    "inventory": {
      "trackQuantity": true,
      "quantity": 100
    }
  }'
```

#### **Create Order**
```bash
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "67bebf1a1c1d2e3f4a5b6c7d",
    "customer": {
      "name": "Jane Smith",
      "phone": "2348098765432",
      "email": "jane@example.com",
      "deliveryAddress": {
        "street": "456 Market Road",
        "city": "Jos",
        "coordinates": {
          "lat": 9.9025,
          "lng": 8.8673
        }
      }
    },
    "items": [
      {
        "productId": "67bebf1a1c1d2e3f4a5b6c7e",
        "quantity": 2
      }
    ]
  }'
```

---

## **🎨 Frontend Structure**

### **Project Structure**
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/           # Authentication components
│   │   ├── business/       # Business-specific components
│   │   ├── products/       # Product components
│   │   ├── orders/         # Order components
│   │   ├── delivery/       # Delivery components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI primitives
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes
│   │   ├── auth/           # Auth pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── products/       # Product pages
│   │   ├── orders/         # Order pages
│   │   └── settings/       # Settings pages
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBusiness.ts
│   │   ├── useOrders.ts
│   │   ├── useSocket.ts
│   │   └── useDebounce.ts
│   ├── lib/                # Utilities
│   │   ├── api.ts          # API client
│   │   ├── store.ts        # Zustand store
│   │   ├── socket.ts       # Socket.io client
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript types
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── business.ts
│   │   └── order.ts
│   ├── styles/             # Global styles
│   └── config/             # Configuration
├── .env.local              # Environment variables
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

### **Key Pages**

#### **Dashboard Page**
```typescript
// pages/dashboard/index.tsx
export default function DashboardPage() {
  const { business } = useBusiness();
  const { orders } = useOrders();
  const { stats } = useAnalytics();

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Today's Orders"
            value={stats.todayOrders}
            trend={stats.orderTrend}
            icon="📦"
          />
          <StatCard 
            title="Revenue"
            value={`₦${stats.todayRevenue.toLocaleString()}`}
            trend={stats.revenueTrend}
            icon="💰"
          />
          <StatCard 
            title="Active Deliveries"
            value={stats.activeDeliveries}
            icon="🚚"
          />
          <StatCard 
            title="Products"
            value={stats.totalProducts}
            icon="🛍️"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <OrderList orders={orders.slice(0, 5)} />
        </div>
      </div>
    </Layout>
  );
}
```

---

## **🚀 Deployment Guide**

### **Deploy to Production (Ubuntu Server)**

#### **1. Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### **2. Deploy Backend**
```bash
# Clone repository
git clone https://github.com/Akintomiwa200/bizone.git
cd bizone/backend

# Install dependencies
npm ci --production

# Setup environment
cp .env.example .env
nano .env  # Edit with production values

# Start with PM2
pm2 start server.js --name bizone-backend -i max
pm2 save
pm2 startup
```

#### **3. Deploy Frontend**
```bash
cd ../frontend

# Install dependencies
npm ci --production

# Build
npm run build

# Start with PM2
pm2 start npm --name bizone-frontend -- start
pm2 save
```

#### **4. Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/bizone
```

```nginx
# Backend API
upstream backend {
    server 127.0.0.1:5000;
}

# Frontend
upstream frontend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name bizone.com www.bizone.com;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket
    location /socket.io/ {
        proxy_pass http://backend/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/bizone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bizone.com -d www.bizone.com
```

---

## **🧪 Testing Strategy**

### **Backend Testing**
```javascript
// tests/unit/business.test.js
import request from 'supertest';
import app from '../server.js';
import Business from '../models/Business.js';

describe('Business API', () => {
  beforeEach(async () => {
    await Business.deleteMany({});
  });

  describe('POST /api/v1/businesses', () => {
    it('should create a new business', async () => {
      const token = await getAuthToken();
      
      const res = await request(app)
        .post('/api/v1/businesses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Business',
          category: 'retail',
          contact: {
            phone: '2348012345678',
            address: {
              street: '123 Test St',
              city: 'Jos',
              state: 'Plateau'
            }
          }
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Business');
    });
  });
});
```

### **Run Tests**
```bash
# Backend tests
cd backend
npm test
npm run test:coverage
npm run test:watch

# Frontend tests
cd frontend
npm test
npm run test:e2e
```

---

## **🔒 Security Considerations**

### **Security Headers (Helmet.js)**
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.flutterwave.com"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### **Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Stricter limits for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 failed attempts per hour
  skipSuccessfulRequests: true,
});

app.use('/api/auth/login', authLimiter);
```

### **Input Validation (Joi)**
```javascript
import Joi from 'joi';

const validateBusiness = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(1000),
    category: Joi.string().required(),
    contact: Joi.object({
      phone: Joi.string().pattern(/^[0-9]{11,14}$/).required(),
      email: Joi.string().email(),
      address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        coordinates: Joi.object({
          lat: Joi.number().min(-90).max(90),
          lng: Joi.number().min(-180).max(180)
        })
      }).required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(d => d.message)
    });
  }
  next();
};
```

### **MongoDB Security**
```javascript
// Create MongoDB user with limited privileges
db.createUser({
  user: "bizone_app",
  pwd: "strong_password",
  roles: [
    { role: "readWrite", db: "bizone" }
  ]
});

// Enable authentication in mongod.conf
security:
  authorization: enabled

// Use connection string with auth
MONGODB_URI=mongodb://bizone_app:strong_password@localhost:27017/bizone?authSource=bizone
```

---

## **⚡ Performance Optimization**

### **MongoDB Indexing Strategy**
```javascript
// Compound indexes for common queries
await db.collection('orders').createIndex(
  { business: 1, createdAt: -1 },
  { name: 'business_orders' }
);

// Text indexes for search
await db.collection('products').createIndex(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 5 } }
);

// TTL indexes for automatic cleanup
await db.collection('sessions').createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
);
```

### **Response Compression**
```javascript
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // Compression level (1-9)
}));
```

### **Database Connection Pooling**
```javascript
const mongoose = require('mongoose');

const connection = await mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
  heartbeatFrequencyMS: 10000
});
```

### **Caching Strategy (Redis)**
```javascript
import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache middleware
const cache = (duration = 60) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      res.sendResponse = res.json;
      res.json = async (data) => {
        await client.setEx(key, duration, JSON.stringify(data));
        res.sendResponse(data);
      };
      next();
    } catch (error) {
      next();
    }
  };
};

// Usage
app.get('/api/products', cache(300), getProducts);
```

---

## **🔧 Troubleshooting Guide**

### **Common Issues & Solutions**

#### **1. MongoDB Connection Error**
```
Error: MongoDB connection failed: MongoNetworkError
```
**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/bizone

# Test connection
mongosh --eval "db.runCommand({ping:1})"
```

#### **2. JWT Secret Error**
```
Error: secretOrPrivateKey must have a value
```
**Solution:**
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
JWT_SECRET=your_generated_secret_here
```

#### **3. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port
sudo lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 pnpm start
```

#### **4. File Upload Issues**
```
Error: Multer error: File too large
```
**Solution:**
```javascript
// Increase file size limit in server.js
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Update multer config
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});
```

#### **5. Socket.io Connection Issues**
```
WebSocket connection to 'ws://localhost:5000/socket.io/' failed
```
**Solution:**
```javascript
// Client-side
const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

// Server-side
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});
```

---

## **👥 Contributing Guidelines**

### **Development Workflow**

1. **Fork the Repository**
```bash
git clone https://github.com/your-username/bizone.git
cd bizone
git checkout -b feature/your-feature-name
```

2. **Setup Development Environment**
```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd ../frontend
npm install
cp .env.local.example .env.local
npm run dev
```

3. **Commit Guidelines**
```bash
# Format: type(scope): description
git commit -m "feat(auth): add phone verification"
git commit -m "fix(order): resolve delivery fee calculation"
git commit -m "docs(api): update payment endpoints"
git commit -m "test(business): add unit tests for business creation"
```

4. **Create Pull Request**
- Update documentation
- Add tests
- Ensure CI passes
- Request review

### **Code Style**
```javascript
// Use ESLint and Prettier
npm run lint
npm run format

// Follow naming conventions
// Variables: camelCase
const userName = 'John';

// Classes: PascalCase
class OrderService {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;

// Files: kebab-case
user-controller.js
```

---

## **📄 License**

Copyright © 2026 Bizone Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## **📞 Support**

- **Documentation**: [https://docs.bizone.com](https://docs.bizone.com)
- **Issues**: [https://github.com/Akintomiwa200/bizone/issues](https://github.com/Akintomiwa200/bizone/issues)
- **Email**: support@bizone.com
- **WhatsApp**: +234 801 234 5678

---

## **🙏 Acknowledgments**

- **Flutterwave** - Payment processing
- **Cloudinary** - Image storage and optimization
- **MongoDB** - Database infrastructure
- **Vercel** - Frontend hosting
- **DigitalOcean** - Backend hosting
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ for Nigerian MSMEs**
