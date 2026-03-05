import { apiClient } from './client';
import { businessAPI } from './business';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendOrder {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email?: string;
    phone: string;
    deliveryAddress?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      landmark?: string;
    };
  };
  items: Array<{
    product: string | { _id: string; name?: string; price?: number };
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  deliveryFee?: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'transfer' | 'ussd';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

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
  businessId?: string;
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
  businessId?: string;
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

const backendToFrontendStatus = (status: BackendOrder['status']): Order['status'] => {
  if (status === 'preparing' || status === 'ready') return 'processing';
  if (status === 'out-for-delivery') return 'shipped';
  return status as Order['status'];
};

const frontendToBackendStatus = (status: Order['status']): BackendOrder['status'] => {
  if (status === 'processing') return 'preparing';
  if (status === 'shipped') return 'out-for-delivery';
  return status as BackendOrder['status'];
};

const mapOrder = (order: BackendOrder): Order => ({
  id: order._id,
  orderNumber: order.orderNumber,
  customer: {
    id: order.customer.phone,
    name: order.customer.name,
    email: order.customer.email || '',
    phone: order.customer.phone,
  },
  items: (order.items || []).map((item) => ({
    productId: typeof item.product === 'string' ? item.product : item.product?._id || '',
    name: typeof item.product === 'string' ? 'Product' : item.product?.name || 'Product',
    price: item.price,
    quantity: item.quantity,
    total: item.total,
  })),
  subtotal: order.subtotal,
  tax: 0,
  shipping: order.deliveryFee || 0,
  discount: 0,
  total: order.total,
  status: backendToFrontendStatus(order.status),
  paymentStatus: order.paymentStatus,
  paymentMethod: order.paymentMethod === 'ussd' ? 'wallet' : (order.paymentMethod || 'cash') as Order['paymentMethod'],
  shippingAddress: {
    name: order.customer.name,
    phone: order.customer.phone,
    street: order.customer.deliveryAddress?.street || '',
    city: order.customer.deliveryAddress?.city || '',
    state: order.customer.deliveryAddress?.state || '',
    country: order.customer.deliveryAddress?.country || 'Nigeria',
    postalCode: '',
  },
  notes: order.notes,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});

const getBusinessId = async (filter?: OrdersFilter) => {
  if (filter?.businessId) return filter.businessId;
  const business = await businessAPI.getBusiness();
  return business.id;
};

export const ordersAPI = {
  async getOrders(page: number = 1, limit: number = 20, filter?: OrdersFilter): Promise<OrdersResponse> {
    const businessId = await getBusinessId(filter);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (filter?.status) params.append('status', frontendToBackendStatus(filter.status));

    const response = await apiClient.get<ApiEnvelope<BackendOrder[]> & { pagination?: { total?: number; pages?: number; page?: number; limit?: number } }>(
      `/orders/business/${businessId}?${params}`
    );

    const orders = (response.data || []).map(mapOrder);
    const total = response.pagination?.total ?? orders.length;
    const totalPages = response.pagination?.pages ?? (orders.length ? Math.ceil(total / limit) : 0);

    return {
      orders,
      total,
      page: response.pagination?.page ?? page,
      limit: response.pagination?.limit ?? limit,
      totalPages,
    };
  },

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<ApiEnvelope<BackendOrder>>(`/orders/${id}`);
    return mapOrder(response.data);
  },

  async createOrder(data: OrderCreateData): Promise<Order> {
    const businessId = data.businessId || (await getBusinessId());

    const payload = {
      businessId,
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
      },
      items: data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      notes: data.notes,
      deliveryAddress: {
        street: data.shippingAddress.street,
        city: data.shippingAddress.city,
        state: data.shippingAddress.state,
        country: data.shippingAddress.country,
      },
    };

    const response = await apiClient.post<ApiEnvelope<BackendOrder>>('/orders', payload);
    return mapOrder(response.data);
  },

  async updateOrder(id: string, data: OrderUpdateData): Promise<Order> {
    const payload = {
      status: frontendToBackendStatus(data.status || 'pending'),
      note: data.notes,
    };
    const response = await apiClient.patch<ApiEnvelope<BackendOrder>>(`/orders/${id}/status`, payload);
    return mapOrder(response.data);
  },

  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.patch<ApiEnvelope<BackendOrder>>(`/orders/${id}/status`, { status: 'cancelled' });
    return mapOrder(response.data);
  },

  async getOrderStats(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month') {
    const orders = await ordersAPI.getOrders(1, 200);
    return {
      total: orders.total,
      pending: orders.orders.filter((order) => order.status === 'pending').length,
      confirmed: orders.orders.filter((order) => order.status === 'confirmed').length,
      revenue: orders.orders.reduce((sum, order) => sum + order.total, 0),
    };
  },

  async exportOrders(format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const orders = await ordersAPI.getOrders(1, 200);
    const header = 'OrderNumber,Customer,Phone,Total,Status,PaymentStatus,CreatedAt';
    const rows = orders.orders.map(
      (order) =>
        `${order.orderNumber},"${order.customer.name}","${order.customer.phone}",${order.total},${order.status},${order.paymentStatus},${order.createdAt}`
    );
    const content = [header, ...rows].join('\n');
    return new Blob([content], {
      type: format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv;charset=utf-8;',
    });
  },
};
