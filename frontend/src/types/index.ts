// types/index.ts

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  status: OrderStatus;
  fulfillment: 'pickup' | 'delivery';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  createdAt: string;
  // ... other fields
}

export interface User {
  id: string;
  name?: string;
  email: string;
  businessName?: string;
  role?: 'admin' | 'manager' | 'staff' | 'user' | 'rider' | 'customer';
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  ownerId: string;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface RegisterData {
  email: string;
  name?: string;
  password?: string;
}

export interface CreateBusinessData {
  name: string;
  description?: string;
}

// Add these new types for products
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  comparePrice?: number;
  costPerItem?: number;
  inventory: {
    trackQuantity: boolean;
    quantity: number;
    lowStockAlert?: number;
  };
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  category: string;
  price: number;
  comparePrice?: number;
  costPerItem?: number;
  inventory: {
    trackQuantity: boolean;
    quantity: number;
    lowStockAlert?: number;
  };
  images?: File[];
}
