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