// Business types and configurations

export interface BusinessCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Clothing, shoes, accessories',
    icon: 'shopping-bag',
    subcategories: ["Men's Clothing", "Women's Clothing", "Kids' Clothing", 'Shoes', 'Accessories', 'Jewelry'],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Gadgets, devices, and tech accessories',
    icon: 'smartphone',
    subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Accessories', 'Audio', 'Cameras'],
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    description: 'Home decor, furniture, and kitchenware',
    icon: 'home',
    subcategories: ['Furniture', 'Home Decor', 'Kitchenware', 'Bedding', 'Lighting', 'Gardening'],
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Cosmetics, skincare, and personal care products',
    icon: 'heart',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care', 'Wellness'],
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    description: 'Food items, drinks, and groceries',
    icon: 'coffee',
    subcategories: ['Groceries', 'Beverages', 'Snacks', 'Fresh Produce', 'Bakery', 'Dairy'],
  },
  {
    id: 'health',
    name: 'Health & Pharmacy',
    description: 'Medicines, health supplements, and medical equipment',
    icon: 'activity',
    subcategories: ['Medicines', 'Supplements', 'Medical Equipment', 'Personal Care', 'Wellness Products'],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Vehicle parts, accessories, and services',
    icon: 'car',
    subcategories: ['Car Parts', 'Accessories', 'Tools', 'Lubricants', 'Tires', 'Car Care'],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear',
    icon: 'dribbble',
    subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Team Sports', 'Water Sports', 'Cycling', 'Camping'],
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    description: 'Books, educational materials, and office supplies',
    icon: 'book',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Office Supplies', 'Art Materials', 'Gifts'],
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other business categories',
    icon: 'grid',
    subcategories: ['Services', 'Digital Products', 'Handmade', 'Vintage', 'Custom Orders'],
  },
];

export interface BusinessSize {
  id: string;
  name: string;
  description: string;
  maxEmployees: number;
  maxRevenue: number;
}

export const BUSINESS_SIZES: BusinessSize[] = [
  {
    id: 'micro',
    name: 'Micro Business',
    description: '1-5 employees, small scale operations',
    maxEmployees: 5,
    maxRevenue: 1000000, // 1 million Naira
  },
  {
    id: 'small',
    name: 'Small Business',
    description: '6-50 employees, growing operations',
    maxEmployees: 50,
    maxRevenue: 10000000, // 10 million Naira
  },
  {
    id: 'medium',
    name: 'Medium Business',
    description: '51-200 employees, established operations',
    maxEmployees: 200,
    maxRevenue: 50000000, // 50 million Naira
  },
  {
    id: 'large',
    name: 'Large Business',
    description: '200+ employees, corporate operations',
    maxEmployees: 1000,
    maxRevenue: 1000000000, // 1 billion Naira
  },
];

export interface BusinessModel {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

export const BUSINESS_MODELS: BusinessModel[] = [
  {
    id: 'b2c',
    name: 'Business to Consumer (B2C)',
    description: 'Selling products or services directly to consumers',
    examples: ['Retail stores', 'E-commerce', 'Restaurants', 'Service providers'],
  },
  {
    id: 'b2b',
    name: 'Business to Business (B2B)',
    description: 'Selling products or services to other businesses',
    examples: ['Wholesale', 'Manufacturing', 'Software services', 'Consulting'],
  },
  {
    id: 'c2c',
    name: 'Consumer to Consumer (C2C)',
    description: 'Facilitating transactions between consumers',
    examples: ['Marketplaces', 'Platforms', 'Auction sites'],
  },
  {
    id: 'subscription',
    name: 'Subscription Model',
    description: 'Recurring revenue through subscriptions',
    examples: ['SaaS', 'Membership sites', 'Box subscriptions'],
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Connecting buyers and sellers',
    examples: ['E-commerce platforms', 'Service marketplaces', 'Rental platforms'],
  },
];

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    products: number;
    orders: number;
    storage: number; // in MB
    users: number;
    analytics: boolean;
    support: string;
  };
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses just getting started',
    price: 0,
    currency: 'NGN',
    interval: 'monthly',
    features: [
      'Up to 50 products',
      '100 orders per month',
      'Basic analytics',
      'Email support',
      '1GB storage',
      '1 user account',
    ],
    limits: {
      products: 50,
      orders: 100,
      storage: 1024,
      users: 1,
      analytics: false,
      support: 'email',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing businesses with more needs',
    price: 5000,
    currency: 'NGN',
    interval: 'monthly',
    features: [
      'Up to 500 products',
      '1000 orders per month',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      '5 user accounts',
      'WhatsApp integration',
    ],
    limits: {
      products: 500,
      orders: 1000,
      storage: 10240,
      users: 5,
      analytics: true,
      support: 'priority',
    },
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large businesses with advanced requirements',
    price: 15000,
    currency: 'NGN',
    interval: 'monthly',
    features: [
      'Unlimited products',
      'Unlimited orders',
      'Advanced analytics & reports',
      '24/7 phone support',
      '50GB storage',
      'Unlimited users',
      'All integrations',
      'Custom features',
      'Dedicated account manager',
    ],
    limits: {
      products: -1, // unlimited
      orders: -1, // unlimited
      storage: 51200,
      users: -1, // unlimited
      analytics: true,
      support: '24/7',
    },
  },
];

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export const DEFAULT_BUSINESS_HOURS: BusinessHours[] = [
  { day: 'monday', open: '09:00', close: '17:00', closed: false },
  { day: 'tuesday', open: '09:00', close: '17:00', closed: false },
  { day: 'wednesday', open: '09:00', close: '17:00', closed: false },
  { day: 'thursday', open: '09:00', close: '17:00', closed: false },
  { day: 'friday', open: '09:00', close: '17:00', closed: false },
  { day: 'saturday', open: '10:00', close: '14:00', closed: false },
  { day: 'sunday', open: '00:00', close: '00:00', closed: true },
];

export interface TaxConfiguration {
  enabled: boolean;
  rate: number;
  inclusive: boolean;
  number?: string;
}

export const DEFAULT_TAX_CONFIG: TaxConfiguration = {
  enabled: false,
  rate: 7.5, // VAT rate in Nigeria
  inclusive: false,
};

export interface ShippingConfiguration {
  enabled: boolean;
  rates: Array<{
    name: string;
    price: number;
    conditions?: {
      minOrder?: number;
      maxOrder?: number;
      locations?: string[];
    };
  }>;
}

export const DEFAULT_SHIPPING_CONFIG: ShippingConfiguration = {
  enabled: true,
  rates: [
    {
      name: 'Standard Delivery',
      price: 500,
      conditions: {
        minOrder: 0,
      },
    },
    {
      name: 'Express Delivery',
      price: 1000,
      conditions: {
        minOrder: 2000,
      },
    },
    {
      name: 'Free Delivery',
      price: 0,
      conditions: {
        minOrder: 5000,
      },
    },
  ],
};

export interface NotificationPreferences {
  email: {
    orders: boolean;
    payments: boolean;
    deliveries: boolean;
    marketing: boolean;
  };
  push: {
    orders: boolean;
    payments: boolean;
    deliveries: boolean;
    chat: boolean;
  };
  sms: {
    orders: boolean;
    payments: boolean;
    important: boolean;
  };
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  email: {
    orders: true,
    payments: true,
    deliveries: true,
    marketing: false,
  },
  push: {
    orders: true,
    payments: true,
    deliveries: true,
    chat: true,
  },
  sms: {
    orders: false,
    payments: true,
    important: true,
  },
};

// Business verification status
export type BusinessVerificationStatus = 
  | 'unverified' 
  | 'pending' 
  | 'verified' 
  | 'rejected';

export interface BusinessVerification {
  status: BusinessVerificationStatus;
  submittedAt?: string;
  verifiedAt?: string;
  rejectedReason?: string;
  documents: Array<{
    type: string;
    url: string;
    verified: boolean;
  }>;
}

// Business performance metrics
export interface BusinessMetrics {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  orders: {
    current: number;
    previous: number;
    growth: number;
  };
  customers: {
    current: number;
    previous: number;
    growth: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
  };
  conversion: {
    rate: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export type BusinessType = typeof BUSINESS_CATEGORIES[0];
export type BusinessSizeType = typeof BUSINESS_SIZES[0];
export type BusinessModelType = typeof BUSINESS_MODELS[0];
export type SubscriptionPlanType = typeof SUBSCRIPTION_PLANS[0];