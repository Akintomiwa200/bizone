import { useState, useCallback, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { ordersAPI, Order, OrderCreateData, OrderUpdateData, OrdersFilter } from '@/lib/api/orders';
import { notificationService } from '@/lib/services/notification-service';

export interface UseOrdersReturn {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: OrdersFilter;
  fetchOrders: (page?: number, limit?: number, filter?: OrdersFilter) => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;
  createOrder: (data: OrderCreateData) => Promise<Order>;
  updateOrder: (id: string, data: OrderUpdateData) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
  exportOrders: (format?: 'csv' | 'excel') => Promise<void>;
  setFilters: (filters: OrdersFilter) => void;
  clearFilters: () => void;
  clearCurrentOrder: () => void;
  clearError: () => void;
}

export const useOrders = (initialFilters: OrdersFilter = {}) => {
  const {
    orders,
    currentOrder,
    ordersLoading,
    ordersError,
    ordersPagination,
    fetchOrders: storeFetchOrders,
    fetchOrder: storeFetchOrder,
    createOrder: storeCreateOrder,
    updateOrder: storeUpdateOrder,
    cancelOrder: storeCancelOrder,
    clearCurrentOrder: storeClearCurrentOrder,
  } = useStore();

  const [filters, setFilters] = useState<OrdersFilter>(initialFilters);
  const [isExporting, setIsExporting] = useState(false);

  const fetchOrders = useCallback(async (page: number = 1, limit: number = 20, filter?: OrdersFilter) => {
    try {
      const effectiveFilters = filter || filters;
      await storeFetchOrders(page, limit, effectiveFilters);
    } catch (error) {
      throw error;
    }
  }, [storeFetchOrders, filters]);

  const fetchOrder = useCallback(async (id: string) => {
    try {
      await storeFetchOrder(id);
    } catch (error) {
      throw error;
    }
  }, [storeFetchOrder]);

  const createOrder = useCallback(async (data: OrderCreateData): Promise<Order> => {
    try {
      const order = await storeCreateOrder(data);
      notificationService.success('Order Created', `Order #${order.orderNumber} has been created successfully.`);
      return order;
    } catch (error: any) {
      notificationService.error('Creation Failed', error.response?.data?.message || 'Failed to create order');
      throw error;
    }
  }, [storeCreateOrder]);

  const updateOrder = useCallback(async (id: string, data: OrderUpdateData) => {
    try {
      await storeUpdateOrder(id, data);
      notificationService.success('Order Updated', 'Order has been updated successfully.');
    } catch (error: any) {
      notificationService.error('Update Failed', error.response?.data?.message || 'Failed to update order');
      throw error;
    }
  }, [storeUpdateOrder]);

  const cancelOrder = useCallback(async (id: string) => {
    try {
      await storeCancelOrder(id);
      notificationService.success('Order Cancelled', 'Order has been cancelled successfully.');
    } catch (error: any) {
      notificationService.error('Cancellation Failed', error.response?.data?.message || 'Failed to cancel order');
      throw error;
    }
  }, [storeCancelOrder]);

  const exportOrders = useCallback(async (format: 'csv' | 'excel' = 'csv') => {
    setIsExporting(true);
    try {
      const blob = await ordersAPI.exportOrders(format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `orders_export.${format}`;
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      notificationService.success('Export Successful', `Orders exported as ${format.toUpperCase()}`);
    } catch (error: any) {
      notificationService.error('Export Failed', error.response?.data?.message || 'Failed to export orders');
      throw error;
    } finally {
      setIsExporting(false);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearCurrentOrder = useCallback(() => {
    storeClearCurrentOrder();
  }, [storeClearCurrentOrder]);

  const clearError = useCallback(() => {
    useStore.getState().ordersError = null;
  }, []);

  // Memoized order statistics
  const orderStats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(order => order.status === 'pending').length;
    const confirmed = orders.filter(order => order.status === 'confirmed').length;
    const processing = orders.filter(order => order.status === 'processing').length;
    const shipped = orders.filter(order => order.status === 'shipped').length;
    const delivered = orders.filter(order => order.status === 'delivered').length;
    const cancelled = orders.filter(order => order.status === 'cancelled').length;

    const totalRevenue = orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.total, 0);

    return {
      total,
      pending,
      confirmed,
      processing,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
    };
  }, [orders]);

  return {
    orders,
    currentOrder,
    isLoading: ordersLoading || isExporting,
    error: ordersError,
    pagination: ordersPagination,
    filters,
    orderStats,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    exportOrders,
    setFilters,
    clearFilters,
    clearCurrentOrder,
    clearError,
  };
};