// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'business_owner' | 'rider' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

// Business types
export interface Business {
  _id: string;
  owner: string;
  name: string;
  description: string;
  category: string;
  contact: BusinessContact;
  social: SocialLinks;
  stats: BusinessStats;
  settings: BusinessSettings;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessContact {
  phone: string;
  email?: string;
  address: BusinessAddress;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Order types
export interface Order {
  _id: string;
  orderId: string;
  business: string | Business;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  payment: PaymentInfo;
  delivery: DeliveryInfo;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';