import { StateCreator } from 'zustand';
import { ordersAPI, Order, OrderCreateData, OrderUpdateData, OrdersFilter } from '@/lib/api/orders';

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  ordersLoading: boolean;
  ordersError: string | null;
  ordersPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchOrders: (page?: number, limit?: number, filter?: OrdersFilter) => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;
  createOrder: (data: OrderCreateData) => Promise<Order>;
  updateOrder: (id: string, data: OrderUpdateData) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
  clearCurrentOrder: () => void;
}

export const orderStore: StateCreator<OrderState> = (set, get) => ({
  orders: [],
  currentOrder: null,
  ordersLoading: false,
  ordersError: null,
  ordersPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },

  fetchOrders: async (page = 1, limit = 20, filter = {}) => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const response = await ordersAPI.getOrders(page, limit, filter);
      set({
        orders: response.orders,
        ordersPagination: {
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        },
        ordersLoading: false,
      });
    } catch (error: any) {
      set({
        ordersError: error.response?.data?.message || 'Failed to fetch orders',
        ordersLoading: false,
      });
    }
  },

  fetchOrder: async (id: string) => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const order = await ordersAPI.getOrder(id);
      set({ currentOrder: order, ordersLoading: false });
    } catch (error: any) {
      set({
        ordersError: error.response?.data?.message || 'Failed to fetch order',
        ordersLoading: false,
      });
    }
  },

  createOrder: async (data: OrderCreateData): Promise<Order> => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const order = await ordersAPI.createOrder(data);
      set((state) => ({
        orders: [order, ...state.orders],
        ordersLoading: false,
      }));
      return order;
    } catch (error: any) {
      set({
        ordersError: error.response?.data?.message || 'Failed to create order',
        ordersLoading: false,
      });
      throw error;
    }
  },

  updateOrder: async (id: string, data: OrderUpdateData) => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const order = await ordersAPI.updateOrder(id, data);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? order : o)),
        currentOrder: state.currentOrder?.id === id ? order : state.currentOrder,
        ordersLoading: false,
      }));
    } catch (error: any) {
      set({
        ordersError: error.response?.data?.message || 'Failed to update order',
        ordersLoading: false,
      });
      throw error;
    }
  },

  cancelOrder: async (id: string) => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const order = await ordersAPI.cancelOrder(id);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? order : o)),
        currentOrder: state.currentOrder?.id === id ? order : state.currentOrder,
        ordersLoading: false,
      }));
    } catch (error: any) {
      set({
        ordersError: error.response?.data?.message || 'Failed to cancel order',
        ordersLoading: false,
      });
      throw error;
    }
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },
});