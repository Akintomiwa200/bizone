import { apiClient } from './client';

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'transfer' | 'cash' | 'wallet';
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreateData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
  shippingAddress: Order['shippingAddress'];
  paymentMethod: Order['paymentMethod'];
  notes?: string;
}

export interface OrderUpdateData {
  status?: Order['status'];
  paymentStatus?: Order['paymentStatus'];
  notes?: string;
}

export interface OrdersFilter {
  status?: Order['status'];
  paymentStatus?: Order['paymentStatus'];
  customerId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const ordersAPI = {
  async getOrders(
    page: number = 1,
    limit: number = 20,
    filter?: OrdersFilter
  ): Promise<OrdersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filter as any),
    });
    return await apiClient.get<OrdersResponse>(`/orders?${params}`);
  },

  async getOrder(id: string): Promise<Order> {
    return await apiClient.get<Order>(`/orders/${id}`);
  },

  async createOrder(data: OrderCreateData): Promise<Order> {
    return await apiClient.post<Order>('/orders', data);
  },

  async updateOrder(id: string, data: OrderUpdateData): Promise<Order> {
    return await apiClient.patch<Order>(`/orders/${id}`, data);
  },

  async cancelOrder(id: string): Promise<Order> {
    return await apiClient.patch<Order>(`/orders/${id}/cancel`);
  },

  async getOrderStats(timeframe: 'day' | 'week' | 'month' | 'year' = 'month') {
    return await apiClient.get(`/orders/stats?timeframe=${timeframe}`);
  },

  async exportOrders(format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const response = await apiClient.get(`/orders/export?format=${format}`, {
      responseType: 'blob',
    });
    return response;
  },
};