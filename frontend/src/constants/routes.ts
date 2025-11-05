// Application routes configuration
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  OVERVIEW: '/dashboard/overview',
  ANALYTICS: '/dashboard/analytics',
  
  // Business routes
  BUSINESS: {
    PROFILE: '/business/profile',
    SETTINGS: '/business/settings',
    SUBSCRIPTION: '/business/subscription',
  },
  
  // Product routes
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products/create',
    EDIT: '/products/[id]/edit',
    VIEW: '/products/[id]',
    CATEGORIES: '/products/categories',
    INVENTORY: '/products/inventory',
  },
  
  // Order routes
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders/create',
    VIEW: '/orders/[id]',
    EDIT: '/orders/[id]/edit',
  },
  
  // Delivery routes
  DELIVERIES: {
    LIST: '/deliveries',
    CREATE: '/deliveries/create',
    VIEW: '/deliveries/[id]',
    TRACK: '/deliveries/track/[trackingNumber]',
    DRIVERS: '/deliveries/drivers',
  },
  
  // Payment routes
  PAYMENTS: {
    LIST: '/payments',
    VIEW: '/payments/[id]',
    REFUND: '/payments/[id]/refund',
  },
  
  // Chat routes
  CHAT: {
    MAIN: '/chat',
    SESSION: '/chat/[sessionId]',
  },
  
  // WhatsApp routes
  WHATSAPP: {
    MAIN: '/whatsapp',
    CONTACTS: '/whatsapp/contacts',
    TEMPLATES: '/whatsapp/templates',
    BROADCAST: '/whatsapp/broadcast',
  },
  
  // Customer routes
  CUSTOMERS: {
    LIST: '/customers',
    VIEW: '/customers/[id]',
  },
  
  // Settings routes
  SETTINGS: {
    PROFILE: '/settings/profile',
    ACCOUNT: '/settings/account',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security',
    INTEGRATIONS: '/settings/integrations',
  },
} as const;

// Route permissions - which roles can access which routes
export const ROUTE_PERMISSIONS = {
  [ROUTES.DASHBOARD]: ['admin', 'manager', 'staff'],
  [ROUTES.ANALYTICS]: ['admin', 'manager'],
  [ROUTES.BUSINESS.PROFILE]: ['admin', 'manager'],
  [ROUTES.BUSINESS.SETTINGS]: ['admin'],
  [ROUTES.PRODUCTS.LIST]: ['admin', 'manager', 'staff'],
  [ROUTES.PRODUCTS.CREATE]: ['admin', 'manager'],
  [ROUTES.ORDERS.LIST]: ['admin', 'manager', 'staff'],
  [ROUTES.ORDERS.CREATE]: ['admin', 'manager', 'staff'],
  [ROUTES.DELIVERIES.DRIVERS]: ['admin', 'manager'],
  [ROUTES.SETTINGS.ACCOUNT]: ['admin'],
  [ROUTES.WHATSAPP.BROADCAST]: ['admin', 'manager'],
} as const;

// Navigation menu structure
export const NAVIGATION_MENU = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'dashboard',
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
        label: 'Drivers',
        href: ROUTES.DELIVERIES.DRIVERS,
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
    href: ROUTES.ANALYTICS,
    icon: 'bar-chart',
    roles: ['admin', 'manager'],
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
    ],
  },
] as const;

// API route helpers
export const getProductRoute = (id: string) => ROUTES.PRODUCTS.VIEW.replace('[id]', id);
export const getOrderRoute = (id: string) => ROUTES.ORDERS.VIEW.replace('[id]', id);
export const getDeliveryRoute = (id: string) => ROUTES.DELIVERIES.VIEW.replace('[id]', id);
export const getPaymentRoute = (id: string) => ROUTES.PAYMENTS.VIEW.replace('[id]', id);
export const getCustomerRoute = (id: string) => ROUTES.CUSTOMERS.VIEW.replace('[id]', id);
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

export type AppRoute = typeof ROUTES;
export type NavigationItem = typeof NAVIGATION_MENU[0];