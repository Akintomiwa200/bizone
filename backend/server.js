import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import os from 'os';

import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import rateLimiter from './middleware/rateLimiter.js';

// Route imports
import authRoutes from './routes/auth.js';
import businessRoutes from './routes/businesses.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import deliveryRoutes from './routes/delivery.js';
import paymentRoutes from './routes/payment.js';
import whatsappRoutes from './routes/whatsapp.js';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Environment configuration
const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const API_VERSION = 'v1';

// Track server state
let isShuttingDown = false;

// Get MongoDB connection string (mask sensitive info)
const getMongoDBConnectionString = () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bizone';

  // Mask password if present
  if (uri.includes('@') && uri.includes(':')) {
    return uri.replace(/(:)([^@]+)(@)/, '$1*****$3');
  }
  return uri;
};

// Get local IP addresses for network access
const getNetworkInterfaces = () => {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        addresses.push(alias.address);
      }
    }
  }
  return addresses;
};

// Utility function to format startup message
const printStartupMessage = (port, ipAddresses, env, dbConnected) => {
  const border = '═'.repeat(60);
  const padding = ' '.repeat(4);
  const dbStatus = dbConnected ? '✅ Connected' : '❌ Disconnected';
  const dbString = getMongoDBConnectionString();

  console.log('\n' + border);
  console.log(`║${padding}🚀 BIZONE SERVER STARTED SUCCESSFULLY${padding}║`);
  console.log(border);
  console.log(`║ Environment:    ${env.padEnd(38)}║`);
  console.log(`║ Version:        ${API_VERSION.padEnd(38)}║`);
  console.log(`║ Port:           ${port.toString().padEnd(38)}║`);
  console.log(`║ Database:       ${dbStatus.padEnd(38)}║`);
  console.log(border);
  console.log(`║🗄️ MongoDB:`);
  console.log(`║   ➜ ${dbString.padEnd(52)}║`);
  console.log(border);
  console.log(`║📍 Local Access:`);
  console.log(`║   ➜ http://localhost:${port}`);
  console.log(`║   ➜ http://127.0.0.1:${port}`);

  if (ipAddresses.length > 0) {
    console.log(`║📡 Network Access:`);
    ipAddresses.forEach(ip => {
      console.log(`║   ➜ http://${ip}:${port}`);
    });
  }

  console.log(border);
  console.log(`║📚 API Documentation:`);
  console.log(`║   ➜ http://localhost:${port}/api/health`);
  console.log(border);
  console.log(`║⚡ WebSocket Server:   ws://localhost:${port}`);
  console.log(border);
  console.log(`║🔧 Available Routes:`);
  console.log(`║   ➜ /api/auth`);
  console.log(`║   ➜ /api/businesses`);
  console.log(`║   ➜ /api/products`);
  console.log(`║   ➜ /api/orders`);
  console.log(`║   ➜ /api/delivery`);
  console.log(`║   ➜ /api/payment`);
  console.log(`║   ➜ /api/whatsapp`);
  console.log(border);
  console.log(`║🕒 Started: ${new Date().toLocaleString().padEnd(37)}║`);
  console.log(border + '\n');
};

// Connect to database
const initializeDatabase = async () => {
  try {
    await connectDB();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter);

// Request logging in development
if (ENV === 'development') {
  app.use((req, res, next) => {
    // Don't log during shutdown
    if (!isShuttingDown) {
      console.log(`📨 ${req.method} ${req.url} - ${new Date().toISOString()}`);
    }
    next();
  });
}

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id} - ${new Date().toLocaleTimeString()}`);

  socket.on('join-business', (businessId) => {
    socket.join(`business-${businessId}`);
    console.log(`🏢 Business room joined: ${businessId}`);
  });

  socket.on('join-delivery', (deliveryId) => {
    socket.join(`delivery-${deliveryId}`);
    console.log(`🚚 Delivery room joined: ${deliveryId}`);
  });

  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`);
    console.log(`📦 Order room joined: ${orderId}`);
  });

  socket.on('error', (error) => {
    console.error(`❌ Socket error from ${socket.id}:`, error);
  });

  socket.on('disconnect', (reason) => {
    console.log(`🔌 User disconnected: ${socket.id} - Reason: ${reason}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// =============================================
// ROUTES - ORDER IS IMPORTANT!
// =============================================

// Health check (public, no auth needed)
app.get('/api/health', (req, res) => {
  // Import mongoose dynamically to avoid circular dependency
  import('mongoose').then(({ default: mongoose }) => {
    res.status(200).json({
      status: 'OK',
      message: 'BizOne API is running',
      timestamp: new Date().toISOString(),
      environment: ENV,
      uptime: process.uptime(),
      shuttingDown: isShuttingDown,
      database: {
        connected: mongoose.connection.readyState === 1,
        host: mongoose.connection.host,
        name: mongoose.connection.name
      }
    });
  }).catch(() => {
    res.status(200).json({
      status: 'OK',
      message: 'BizOne API is running',
      timestamp: new Date().toISOString(),
      environment: ENV,
      uptime: process.uptime(),
      shuttingDown: isShuttingDown
    });
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// =============================================
// IMPORTANT: Express 5 404 Handler
// =============================================
app.use((req, res, next) => {
  // Don't handle new requests during shutdown
  if (isShuttingDown) {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Server is shutting down',
      timestamp: new Date().toISOString()
    });
  }

  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    availableEndpoints: [
      '/api/health',
      '/api/auth',
      '/api/businesses',
      '/api/products',
      '/api/orders',
      '/api/delivery',
      '/api/payment',
      '/api/whatsapp'
    ]
  });
});

// =============================================
// Error Handler (must be last)
// =============================================
app.use(errorHandler);

// =============================================
// Start Server
// =============================================
const startServer = async () => {
  try {
    // Connect to database
    const dbConnected = await initializeDatabase();

    // Start HTTP server
    httpServer.listen(PORT, HOST, () => {
      const ipAddresses = getNetworkInterfaces();
      printStartupMessage(PORT, ipAddresses, ENV, dbConnected);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// =============================================
// FIXED: Graceful Shutdown - No ELIFECYCLE error
// =============================================
const gracefulShutdown = (signal) => {
  // Prevent multiple shutdown calls
  if (isShuttingDown) {
    console.log('⚠️  Shutdown already in progress...');
    return;
  }

  isShuttingDown = true;
  console.log(`\n\n⚠️  Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  httpServer.close(async () => {
    console.log('✅ HTTP server closed - no new connections accepted');

    // Close Socket.io connections
    try {
      await io.close();
      console.log('✅ Socket.io server closed');
    } catch (err) {
      console.log('⚠️  Socket.io close warning:', err.message);
    }

    // Close database connection
    try {
      const mongoose = (await import('mongoose')).default;
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('✅ Database connection closed');
      }
    } catch (err) {
      console.log('⚠️  Database close warning:', err.message);
    }

    console.log('👋 Server shutdown complete. Goodbye!');

    // Always exit with 0 (success) for graceful shutdown
    // This prevents the ELIFECYCLE error
    process.exit(0);
  });

  // Force shutdown if graceful fails
  const forceShutdownTimer = setTimeout(() => {
    console.error('❌ Forceful shutdown due to timeout');
    process.exit(1);
  }, 10000); // 10 seconds timeout

  // Clear timer if graceful shutdown completes
  forceShutdownTimer.unref();
};

// =============================================
// Handle various shutdown signals
// =============================================

// SIGTERM (standard termination signal)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// SIGINT (Ctrl+C)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// SIGQUIT (Ctrl+\)
process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'));

// =============================================
// Handle uncaught exceptions and rejections
// =============================================

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Log error but don't crash immediately
  console.log('Attempting graceful shutdown after uncaught exception...');
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Log but don't crash
  console.log('Continuing despite unhandled rejection...');
});

// =============================================
// Prevent process from exiting unexpectedly
// =============================================

// Handle warning events
process.on('warning', (warning) => {
  console.warn('⚠️  Warning:', warning.name, warning.message);
  if (warning.stack) {
    console.warn(warning.stack);
  }
});

// Start the server
startServer();

export default app;