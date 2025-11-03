import { useState, useCallback, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { deliveryAPI, Delivery, DeliveryCreateData, DeliveryUpdateData, Driver } from '@/lib/api/delivery';
import { notificationService } from '@/lib/services/notification-service';

export interface UseDeliveryReturn {
  deliveries: Delivery[];
  currentDelivery: Delivery | null;
  drivers: Driver[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchDeliveries: (page?: number, limit?: number, status?: string) => Promise<void>;
  fetchDelivery: (id: string) => Promise<void>;
  createDelivery: (data: DeliveryCreateData) => Promise<Delivery>;
  updateDelivery: (id: string, data: DeliveryUpdateData) => Promise<void>;
  assignDriver: (deliveryId: string, driverId: string) => Promise<void>;
  updateDeliveryStatus: (deliveryId: string, status: string) => Promise<void>;
  fetchDrivers: () => Promise<void>;
  calculateDeliveryFee: (pickupAddress: any, deliveryAddress: any) => Promise<{ distance: number; fee: number }>;
  clearCurrentDelivery: () => void;
  clearError: () => void;
}

export const useDelivery = () => {
  const {
    deliveries,
    currentDelivery,
    drivers,
    deliveriesLoading,
    deliveriesError,
    deliveriesPagination,
    fetchDeliveries: storeFetchDeliveries,
    fetchDelivery: storeFetchDelivery,
    createDelivery: storeCreateDelivery,
    updateDelivery: storeUpdateDelivery,
    assignDriver: storeAssignDriver,
    updateDeliveryStatus: storeUpdateDeliveryStatus,
    fetchDrivers: storeFetchDrivers,
    clearCurrentDelivery: storeClearCurrentDelivery,
  } = useStore();

  const [isCalculating, setIsCalculating] = useState(false);

  const fetchDeliveries = useCallback(async (page: number = 1, limit: number = 20, status?: string) => {
    try {
      await storeFetchDeliveries(page, limit, status);
    } catch (error) {
      throw error;
    }
  }, [storeFetchDeliveries]);

  const fetchDelivery = useCallback(async (id: string) => {
    try {
      await storeFetchDelivery(id);
    } catch (error) {
      throw error;
    }
  }, [storeFetchDelivery]);

  const createDelivery = useCallback(async (data: DeliveryCreateData): Promise<Delivery> => {
    try {
      const delivery = await storeCreateDelivery(data);
      notificationService.success('Delivery Created', `Delivery #${delivery.trackingNumber} has been created successfully.`);
      return delivery;
    } catch (error: any) {
      notificationService.error('Creation Failed', error.response?.data?.message || 'Failed to create delivery');
      throw error;
    }
  }, [storeCreateDelivery]);

  const updateDelivery = useCallback(async (id: string, data: DeliveryUpdateData) => {
    try {
      await storeUpdateDelivery(id, data);
      notificationService.success('Delivery Updated', 'Delivery has been updated successfully.');
    } catch (error: any) {
      notificationService.error('Update Failed', error.response?.data?.message || 'Failed to update delivery');
      throw error;
    }
  }, [storeUpdateDelivery]);

  const assignDriver = useCallback(async (deliveryId: string, driverId: string) => {
    try {
      await storeAssignDriver(deliveryId, driverId);
      notificationService.success('Driver Assigned', 'Driver has been assigned to delivery successfully.');
    } catch (error: any) {
      notificationService.error('Assignment Failed', error.response?.data?.message || 'Failed to assign driver');
      throw error;
    }
  }, [storeAssignDriver]);

  const updateDeliveryStatus = useCallback(async (deliveryId: string, status: string) => {
    try {
      await storeUpdateDeliveryStatus(deliveryId, status);
      notificationService.success('Status Updated', `Delivery status updated to ${status}.`);
    } catch (error: any) {
      notificationService.error('Status Update Failed', error.response?.data?.message || 'Failed to update delivery status');
      throw error;
    }
  }, [storeUpdateDeliveryStatus]);

  const fetchDrivers = useCallback(async () => {
    try {
      await storeFetchDrivers();
    } catch (error) {
      throw error;
    }
  }, [storeFetchDrivers]);

  const calculateDeliveryFee = useCallback(async (pickupAddress: any, deliveryAddress: any) => {
    setIsCalculating(true);
    try {
      const result = await deliveryAPI.calculateDeliveryFee(pickupAddress, deliveryAddress);
      return result;
    } catch (error: any) {
      notificationService.error('Calculation Failed', error.response?.data?.message || 'Failed to calculate delivery fee');
      throw error;
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const clearCurrentDelivery = useCallback(() => {
    storeClearCurrentDelivery();
  }, [storeClearCurrentDelivery]);

  const clearError = useCallback(() => {
    useStore.getState().deliveriesError = null;
  }, []);

  // Memoized delivery statistics
  const deliveryStats = useMemo(() => {
    const total = deliveries.length;
    const pending = deliveries.filter(delivery => delivery.status === 'pending').length;
    const assigned = deliveries.filter(delivery => delivery.status === 'assigned').length;
    const pickedUp = deliveries.filter(delivery => delivery.status === 'picked_up').length;
    const inTransit = deliveries.filter(delivery => delivery.status === 'in_transit').length;
    const delivered = deliveries.filter(delivery => delivery.status === 'delivered').length;
    const failed = deliveries.filter(delivery => delivery.status === 'failed').length;

    const totalRevenue = deliveries.reduce((sum, delivery) => sum + delivery.fee, 0);
    const averageDeliveryTime = deliveries.length > 0 
      ? deliveries.reduce((sum, delivery) => {
          if (delivery.actualDelivery && delivery.createdAt) {
            const created = new Date(delivery.createdAt).getTime();
            const delivered = new Date(delivery.actualDelivery).getTime();
            return sum + (delivered - created);
          }
          return sum;
        }, 0) / deliveries.filter(d => d.actualDelivery).length
      : 0;

    return {
      total,
      pending,
      assigned,
      pickedUp,
      inTransit,
      delivered,
      failed,
      totalRevenue,
      averageDeliveryTime,
    };
  }, [deliveries]);

  return {
    deliveries,
    currentDelivery,
    drivers,
    isLoading: deliveriesLoading || isCalculating,
    error: deliveriesError,
    pagination: deliveriesPagination,
    deliveryStats,
    fetchDeliveries,
    fetchDelivery,
    createDelivery,
    updateDelivery,
    assignDriver,
    updateDeliveryStatus,
    fetchDrivers,
    calculateDeliveryFee,
    clearCurrentDelivery,
    clearError,
  };
};