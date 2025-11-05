// Application routes configuration
export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  CONTACT: '/contact',
  BLOG: '/blog',
  HELP: '/help',
  
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    PROFILE: '/auth/profile',
    SETTINGS: '/auth/settings',
  },
  
  // Dashboard routes
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    ANALYTICS: '/dashboard/analytics',
    REPORTS: '/dashboard/reports',
    PERFORMANCE: '/dashboard/performance',
  },
  
  // Business Management routes
  BUSINESS: {
    PROFILE: '/business/profile',
    SETTINGS: '/business/settings',
    SUBSCRIPTION: '/business/subscription',
    TEAM: '/business/team',
    BRANDING: '/business/branding',
    INTEGRATIONS: '/business/integrations',
  },
  
  // Products & Inventory routes
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products/create',
    EDIT: '/products/[id]/edit',
    VIEW: '/products/[id]',
    CATEGORIES: '/products/categories',
    INVENTORY: '/products/inventory',
    LOW_STOCK: '/products/low-stock',
    BULK_ACTIONS: '/products/bulk',
  },
  
  // Orders & Sales routes
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders/create',
    VIEW: '/orders/[id]',
    EDIT: '/orders/[id]/edit',
    DRAFTS: '/orders/drafts',
    ABANDONED: '/orders/abandoned',
  },
  
  // Customers & CRM routes
  CUSTOMERS: {
    LIST: '/customers',
    VIEW: '/customers/[id]',
    GROUPS: '/customers/groups',
    SEGMENTS: '/customers/segments',
    LOYALTY: '/customers/loyalty',
  },
  
  // Delivery & Logistics routes
  DELIVERIES: {
    LIST: '/deliveries',
    CREATE: '/deliveries/create',
    VIEW: '/deliveries/[id]',
    TRACK: '/deliveries/track/[trackingNumber]',
    DRIVERS: '/deliveries/drivers',
    VEHICLES: '/deliveries/vehicles',
    ZONES: '/deliveries/zones',
    PRICING: '/deliveries/pricing',
  },
  
  // Payments & Finance routes
  PAYMENTS: {
    LIST: '/payments',
    VIEW: '/payments/[id]',
    REFUND: '/payments/[id]/refund',
    TRANSACTIONS: '/payments/transactions',
    INVOICES: '/payments/invoices',
    TAXES: '/payments/taxes',
    COMMISSIONS: '/payments/commissions',
  },
  
  // Chat & Support routes
  CHAT: {
    MAIN: '/chat',
    SESSION: '/chat/[sessionId]',
    TEMPLATES: '/chat/templates',
    AUTOMATION: '/chat/automation',
  },
  
  // WhatsApp Integration routes
  WHATSAPP: {
    MAIN: '/whatsapp',
    CONTACTS: '/whatsapp/contacts',
    TEMPLATES: '/whatsapp/templates',
    BROADCAST: '/whatsapp/broadcast',
    CAMPAIGNS: '/whatsapp/campaigns',
    AUTOREPLY: '/whatsapp/autoreply',
  },
  
  // Analytics & Reports routes
  ANALYTICS: {
    OVERVIEW: '/analytics',
    SALES: '/analytics/sales',
    CUSTOMERS: '/analytics/customers',
    PRODUCTS: '/analytics/products',
    DELIVERY: '/analytics/delivery',
    FINANCIAL: '/analytics/financial',
  },
  
  // Settings routes
  SETTINGS: {
    PROFILE: '/settings/profile',
    ACCOUNT: '/settings/account',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security',
    BILLING: '/settings/billing',
    PREFERENCES: '/settings/preferences',
  },
  
  // Onboarding routes
  ONBOARDING: {
    WELCOME: '/onboarding/welcome',
    BUSINESS_TYPE: '/onboarding/business-type',
    STORE_SETUP: '/onboarding/store-setup',
    PRODUCTS_SETUP: '/onboarding/products-setup',
    PAYMENT_SETUP: '/onboarding/payment-setup',
    COMPLETE: '/onboarding/complete',
  },
} as const;

// Route permissions - which roles can access which routes
export const ROUTE_PERMISSIONS = {
  [ROUTES.DASHBOARD.OVERVIEW]: ['admin', 'manager', 'staff'],
  [ROUTES.DASHBOARD.ANALYTICS]: ['admin', 'manager'],
  [ROUTES.BUSINESS.PROFILE]: ['admin', 'manager'],
  [ROUTES.BUSINESS.SETTINGS]: ['admin'],
  [ROUTES.BUSINESS.SUBSCRIPTION]: ['admin'],
  [ROUTES.BUSINESS.TEAM]: ['admin'],
  
  [ROUTES.PRODUCTS.LIST]: ['admin', 'manager', 'staff'],
  [ROUTES.PRODUCTS.CREATE]: ['admin', 'manager'],
  [ROUTES.PRODUCTS.EDIT]: ['admin', 'manager'],
  [ROUTES.PRODUCTS.CATEGORIES]: ['admin', 'manager'],
  
  [ROUTES.ORDERS.LIST]: ['admin', 'manager', 'staff'],
  [ROUTES.ORDERS.CREATE]: ['admin', 'manager', 'staff'],
  [ROUTES.ORDERS.EDIT]: ['admin', 'manager'],
  
  [ROUTES.DELIVERIES.DRIVERS]: ['admin', 'manager'],
  [ROUTES.DELIVERIES.VEHICLES]: ['admin', 'manager'],
  [ROUTES.DELIVERIES.ZONES]: ['admin', 'manager'],
  
  [ROUTES.PAYMENTS.TRANSACTIONS]: ['admin', 'manager'],
  [ROUTES.PAYMENTS.TAXES]: ['admin'],
  [ROUTES.PAYMENTS.COMMISSIONS]: ['admin'],
  
  [ROUTES.WHATSAPP.BROADCAST]: ['admin', 'manager'],
  [ROUTES.WHATSAPP.CAMPAIGNS]: ['admin', 'manager'],
  
  [ROUTES.SETTINGS.ACCOUNT]: ['admin'],
  [ROUTES.SETTINGS.BILLING]: ['admin'],
  [ROUTES.SETTINGS.SECURITY]: ['admin'],
} as const;

// Navigation menu structure for dashboard sidebar
export const DASHBOARD_NAVIGATION = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD.OVERVIEW,
    icon: 'layout-dashboard',
    roles: ['admin', 'manager', 'staff'],
  },
  {
    label: 'Products',
    href: ROUTES.PRODUCTS.LIST,
    icon: 'package',
    roles: ['admin', 'manager', 'staff'],
    children: [
      {
        label: 'All Products',
        href: ROUTES.PRODUCTS.LIST,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Add Product',
        href: ROUTES.PRODUCTS.CREATE,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Categories',
        href: ROUTES.PRODUCTS.CATEGORIES,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Inventory',
        href: ROUTES.PRODUCTS.INVENTORY,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Orders',
    href: ROUTES.ORDERS.LIST,
    icon: 'shopping-cart',
    roles: ['admin', 'manager', 'staff'],
    children: [
      {
        label: 'All Orders',
        href: ROUTES.ORDERS.LIST,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Create Order',
        href: ROUTES.ORDERS.CREATE,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Abandoned Carts',
        href: ROUTES.ORDERS.ABANDONED,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Customers',
    href: ROUTES.CUSTOMERS.LIST,
    icon: 'users',
    roles: ['admin', 'manager', 'staff'],
    children: [
      {
        label: 'All Customers',
        href: ROUTES.CUSTOMERS.LIST,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Customer Groups',
        href: ROUTES.CUSTOMERS.GROUPS,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Loyalty Program',
        href: ROUTES.CUSTOMERS.LOYALTY,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Deliveries',
    href: ROUTES.DELIVERIES.LIST,
    icon: 'truck',
    roles: ['admin', 'manager', 'staff'],
    children: [
      {
        label: 'All Deliveries',
        href: ROUTES.DELIVERIES.LIST,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Create Delivery',
        href: ROUTES.DELIVERIES.CREATE,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Drivers',
        href: ROUTES.DELIVERIES.DRIVERS,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Delivery Zones',
        href: ROUTES.DELIVERIES.ZONES,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Payments',
    href: ROUTES.PAYMENTS.LIST,
    icon: 'credit-card',
    roles: ['admin', 'manager'],
  },
  {
    label: 'Chat',
    href: ROUTES.CHAT.MAIN,
    icon: 'message-circle',
    roles: ['admin', 'manager', 'staff'],
  },
  {
    label: 'WhatsApp',
    href: ROUTES.WHATSAPP.MAIN,
    icon: 'message-square',
    roles: ['admin', 'manager', 'staff'],
    children: [
      {
        label: 'Messages',
        href: ROUTES.WHATSAPP.MAIN,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Contacts',
        href: ROUTES.WHATSAPP.CONTACTS,
        roles: ['admin', 'manager', 'staff'],
      },
      {
        label: 'Templates',
        href: ROUTES.WHATSAPP.TEMPLATES,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Broadcast',
        href: ROUTES.WHATSAPP.BROADCAST,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Analytics',
    href: ROUTES.ANALYTICS.OVERVIEW,
    icon: 'bar-chart',
    roles: ['admin', 'manager'],
    children: [
      {
        label: 'Overview',
        href: ROUTES.ANALYTICS.OVERVIEW,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Sales Analytics',
        href: ROUTES.ANALYTICS.SALES,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Customer Analytics',
        href: ROUTES.ANALYTICS.CUSTOMERS,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Delivery Analytics',
        href: ROUTES.ANALYTICS.DELIVERY,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'Settings',
    href: ROUTES.SETTINGS.PROFILE,
    icon: 'settings',
    roles: ['admin', 'manager'],
    children: [
      {
        label: 'Profile',
        href: ROUTES.SETTINGS.PROFILE,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Business',
        href: ROUTES.BUSINESS.SETTINGS,
        roles: ['admin'],
      },
      {
        label: 'Account',
        href: ROUTES.SETTINGS.ACCOUNT,
        roles: ['admin'],
      },
      {
        label: 'Notifications',
        href: ROUTES.SETTINGS.NOTIFICATIONS,
        roles: ['admin', 'manager'],
      },
      {
        label: 'Security',
        href: ROUTES.SETTINGS.SECURITY,
        roles: ['admin'],
      },
    ],
  },
] as const;

// Public navigation for header (non-authenticated users)
export const PUBLIC_NAVIGATION = [
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Solutions',
    href: '#solutions',
  },
  {
    label: 'Pricing',
    href: ROUTES.PRICING,
  },
  {
    label: 'About',
    href: ROUTES.ABOUT,
  },
  {
    label: 'Contact',
    href: ROUTES.CONTACT,
  },
] as const;

// Helper functions for dynamic routes
export const getProductRoute = (id: string) => ROUTES.PRODUCTS.VIEW.replace('[id]', id);
export const getOrderRoute = (id: string) => ROUTES.ORDERS.VIEW.replace('[id]', id);
export const getCustomerRoute = (id: string) => ROUTES.CUSTOMERS.VIEW.replace('[id]', id);
export const getDeliveryRoute = (id: string) => ROUTES.DELIVERIES.VIEW.replace('[id]', id);
export const getPaymentRoute = (id: string) => ROUTES.PAYMENTS.VIEW.replace('[id]', id);
export const getChatRoute = (sessionId: string) => ROUTES.CHAT.SESSION.replace('[sessionId]', sessionId);
export const getTrackDeliveryRoute = (trackingNumber: string) => 
  ROUTES.DELIVERIES.TRACK.replace('[trackingNumber]', trackingNumber);

// Route validation
export const isValidRoute = (path: string): boolean => {
  const allRoutes = Object.values(ROUTES).flatMap(route => 
    typeof route === 'string' ? [route] : Object.values(route)
  );
  return allRoutes.some(route => {
    if (route.includes('[')) {
      // Dynamic route pattern matching
      const pattern = route.replace(/\[.*?\]/g, '[^/]+');
      return new RegExp(`^${pattern}$`).test(path);
    }
    return route === path;
  });
};

// Check if user has permission to access a route
export const canAccessRoute = (route: string, userRole: string): boolean => {
  const permission = ROUTE_PERMISSIONS[route as keyof typeof ROUTE_PERMISSIONS];
  if (!permission) return true; // If no specific permission, allow access
  return permission.includes(userRole as any);
};

// Get all routes for a specific user role
export const getRoutesForRole = (role: string) => {
  return Object.entries(ROUTE_PERMISSIONS)
    .filter(([_, roles]) => roles.includes(role as any))
    .map(([route]) => route);
};

// Type exports
export type AppRoute = typeof ROUTES;
export type DashboardNavItem = typeof DASHBOARD_NAVIGATION[0];
export type PublicNavItem = typeof PUBLIC_NAVIGATION[0];
export type UserRole = 'admin' | 'manager' | 'staff';