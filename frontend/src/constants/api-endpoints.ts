// API endpoints configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
    ME: `${API_BASE_URL}/auth/me`,
  },

  // Business endpoints
  BUSINESS: {
    BASE: `${API_BASE_URL}/business`,
    LOGO: `${API_BASE_URL}/business/logo`,
    COVER_IMAGE: `${API_BASE_URL}/business/cover-image`,
    STATS: `${API_BASE_URL}/business/stats`,
    SUBSCRIPTION: `${API_BASE_URL}/business/subscription`,
    SETTINGS: `${API_BASE_URL}/business/settings`,
  },

  // Products endpoints
  PRODUCTS: {
    BASE: `${API_BASE_URL}/products`,
    BULK: `${API_BASE_URL}/products/bulk`,
    UPLOAD: `${API_BASE_URL}/products/upload`,
    CATEGORIES: `${API_BASE_URL}/products/categories`,
    LOW_STOCK: `${API_BASE_URL}/products/low-stock`,
    INVENTORY: `${API_BASE_URL}/products/inventory`,
    BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
  },

  // Orders endpoints
  ORDERS: {
    BASE: `${API_BASE_URL}/orders`,
    STATS: `${API_BASE_URL}/orders/stats`,
    EXPORT: `${API_BASE_URL}/orders/export`,
    CANCEL: (id: string) => `${API_BASE_URL}/orders/${id}/cancel`,
    BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },

  // Delivery endpoints
  DELIVERIES: {
    BASE: `${API_BASE_URL}/deliveries`,
    DRIVERS: `${API_BASE_URL}/deliveries/drivers`,
    CALCULATE_FEE: `${API_BASE_URL}/deliveries/calculate-fee`,
    TRACKING: (trackingNumber: string) => `${API_BASE_URL}/deliveries/tracking/${trackingNumber}`,
    ASSIGN: (id: string) => `${API_BASE_URL}/deliveries/${id}/assign`,
    STATUS: (id: string) => `${API_BASE_URL}/deliveries/${id}/status`,
    BY_ID: (id: string) => `${API_BASE_URL}/deliveries/${id}`,
  },

  // Payment endpoints
  PAYMENTS: {
    BASE: `${API_BASE_URL}/payments`,
    INITIATE: `${API_BASE_URL}/payments/initiate`,
    VERIFY: `${API_BASE_URL}/payments/verify`,
    STATS: `${API_BASE_URL}/payments/stats`,
    METHODS: `${API_BASE_URL}/payments/methods`,
    REFUND: (id: string) => `${API_BASE_URL}/payments/${id}/refund`,
    BY_ID: (id: string) => `${API_BASE_URL}/payments/${id}`,
  },

  // Analytics endpoints
  ANALYTICS: {
    OVERVIEW: `${API_BASE_URL}/analytics/overview`,
    REVENUE: `${API_BASE_URL}/analytics/revenue`,
    PRODUCTS: `${API_BASE_URL}/analytics/products`,
    CUSTOMERS: `${API_BASE_URL}/analytics/customers`,
    CHANNELS: `${API_BASE_URL}/analytics/channels`,
    GEOGRAPHIC: `${API_BASE_URL}/analytics/geographic`,
    EXPORT: `${API_BASE_URL}/analytics/export`,
  },

  // WhatsApp endpoints
  WHATSAPP: {
    MESSAGES: `${API_BASE_URL}/whatsapp/messages`,
    CONTACTS: `${API_BASE_URL}/whatsapp/contacts`,
    TEMPLATES: `${API_BASE_URL}/whatsapp/templates`,
    BUSINESS_PROFILE: `${API_BASE_URL}/whatsapp/business-profile`,
    WEBHOOK_VERIFY: `${API_BASE_URL}/whatsapp/webhook/verify`,
    TEMPLATE_BY_NAME: (name: string) => `${API_BASE_URL}/whatsapp/templates/${name}`,
  },

  // Chat endpoints
  CHAT: {
    MESSAGES: `${API_BASE_URL}/chat/messages`,
    SESSIONS: `${API_BASE_URL}/chat/sessions`,
    ANALYZE_INTENT: `${API_BASE_URL}/chat/analyze-intent`,
    GENERATE: `${API_BASE_URL}/chat/generate`,
    SESSION_BY_ID: (id: string) => `${API_BASE_URL}/chat/sessions/${id}`,
    SESSION_MESSAGES: (id: string) => `${API_BASE_URL}/chat/sessions/${id}/messages`,
    SESSION_SUGGESTIONS: (id: string) => `${API_BASE_URL}/chat/sessions/${id}/suggestions`,
  },

  // Customer endpoints
  CUSTOMERS: {
    BASE: `${API_BASE_URL}/customers`,
    BY_ID: (id: string) => `${API_BASE_URL}/customers/${id}`,
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: `${API_BASE_URL}/upload/image`,
    DOCUMENT: `${API_BASE_URL}/upload/document`,
    BULK: `${API_BASE_URL}/upload/bulk`,
  },

  // Socket endpoints
  SOCKET: {
    BASE: SOCKET_URL,
  },

  // Third-party API endpoints
  THIRD_PARTY: {
    PAYSTACK: {
      INITIALIZE: 'https://api.paystack.co/transaction/initialize',
      VERIFY: (reference: string) => `https://api.paystack.co/transaction/verify/${reference}`,
      BANKS: 'https://api.paystack.co/bank',
      RESOLVE_ACCOUNT: 'https://api.paystack.co/bank/resolve',
    },
    FLUTTERWAVE: {
      INITIALIZE: 'https://api.flutterwave.com/v3/payments',
      VERIFY: (id: string) => `https://api.flutterwave.com/v3/transactions/${id}/verify`,
      BANKS: 'https://api.flutterwave.com/v3/banks/NG',
    },
    OPENCAGE: {
      GEOCODE: 'https://api.opencagedata.com/geocode/v1/json',
    },
    GOOGLE_MAPS: {
      DIRECTIONS: 'https://maps.googleapis.com/maps/api/directions/json',
      GEOCODE: 'https://maps.googleapis.com/maps/api/geocode/json',
      PLACES: 'https://maps.googleapis.com/maps/api/place',
    },
  },
} as const;

// API response timeout configurations
export const API_TIMEOUTS = {
  DEFAULT: 30000, // 30 seconds
  UPLOAD: 60000, // 60 seconds for file uploads
  PAYMENT: 45000, // 45 seconds for payment processing
  SOCKET: 10000, // 10 seconds for socket connections
} as const;

// API rate limiting configurations
export const API_RATE_LIMITS = {
  AUTH: {
    attempts: 5,
    window: 15 * 60 * 1000, // 15 minutes
  },
  UPLOAD: {
    attempts: 10,
    window: 60 * 1000, // 1 minute
  },
  MESSAGES: {
    attempts: 50,
    window: 60 * 1000, // 1 minute
  },
  PAYMENTS: {
    attempts: 20,
    window: 60 * 1000, // 1 minute
  },
} as const;

// Webhook endpoints
export const WEBHOOK_ENDPOINTS = {
  PAYSTACK: `${API_BASE_URL}/webhooks/paystack`,
  FLUTTERWAVE: `${API_BASE_URL}/webhooks/flutterwave`,
  WHATSAPP: `${API_BASE_URL}/webhooks/whatsapp`,
  STRIPE: `${API_BASE_URL}/webhooks/stripe`,
} as const;

// SSE (Server-Sent Events) endpoints
export const SSE_ENDPOINTS = {
  NOTIFICATIONS: `${API_BASE_URL}/sse/notifications`,
  ORDERS: `${API_BASE_URL}/sse/orders`,
  DELIVERIES: `${API_BASE_URL}/sse/deliveries`,
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
export type ApiTimeout = keyof typeof API_TIMEOUTS;