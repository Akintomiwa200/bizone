import { StateCreator } from 'zustand';
import { deliveryAPI, Delivery, DeliveryCreateData, DeliveryUpdateData, Driver } from '@/lib/api/delivery';

export interface DeliveryState {
  deliveries: Delivery[];
  currentDelivery: Delivery | null;
  drivers: Driver[];
  deliveriesLoading: boolean;
  deliveriesError: string | null;
  deliveriesPagination: {
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
  clearCurrentDelivery: () => void;
}

export const deliveryStore: StateCreator<DeliveryState> = (set, get) => ({
  deliveries: [],
  currentDelivery: null,
  drivers: [],
  deliveriesLoading: false,
  deliveriesError: null,
  deliveriesPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },

  fetchDeliveries: async (page = 1, limit = 20, status) => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const response = await deliveryAPI.getDeliveries(page, limit, status);
      set({
        deliveries: response.deliveries,
        deliveriesPagination: {
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages,
        },
        deliveriesLoading: false,
      });
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to fetch deliveries',
        deliveriesLoading: false,
      });
    }
  },

  fetchDelivery: async (id: string) => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const delivery = await deliveryAPI.getDelivery(id);
      set({ currentDelivery: delivery, deliveriesLoading: false });
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to fetch delivery',
        deliveriesLoading: false,
      });
    }
  },

  createDelivery: async (data: DeliveryCreateData): Promise<Delivery> => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const delivery = await deliveryAPI.createDelivery(data);
      set((state) => ({
        deliveries: [delivery, ...state.deliveries],
        deliveriesLoading: false,
      }));
      return delivery;
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to create delivery',
        deliveriesLoading: false,
      });
      throw error;
    }
  },

  updateDelivery: async (id: string, data: DeliveryUpdateData) => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const delivery = await deliveryAPI.updateDelivery(id, data);
      set((state) => ({
        deliveries: state.deliveries.map((d) => (d.id === id ? delivery : d)),
        currentDelivery: state.currentDelivery?.id === id ? delivery : state.currentDelivery,
        deliveriesLoading: false,
      }));
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to update delivery',
        deliveriesLoading: false,
      });
      throw error;
    }
  },

  assignDriver: async (deliveryId: string, driverId: string) => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const delivery = await deliveryAPI.assignDriver(deliveryId, driverId);
      set((state) => ({
        deliveries: state.deliveries.map((d) => (d.id === deliveryId ? delivery : d)),
        currentDelivery: state.currentDelivery?.id === deliveryId ? delivery : state.currentDelivery,
        deliveriesLoading: false,
      }));
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to assign driver',
        deliveriesLoading: false,
      });
      throw error;
    }
  },

  updateDeliveryStatus: async (deliveryId: string, status: string) => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const delivery = await deliveryAPI.updateDeliveryStatus(deliveryId, status);
      set((state) => ({
        deliveries: state.deliveries.map((d) => (d.id === deliveryId ? delivery : d)),
        currentDelivery: state.currentDelivery?.id === deliveryId ? delivery : state.currentDelivery,
        deliveriesLoading: false,
      }));
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to update delivery status',
        deliveriesLoading: false,
      });
      throw error;
    }
  },

  fetchDrivers: async () => {
    set({ deliveriesLoading: true, deliveriesError: null });
    try {
      const drivers = await deliveryAPI.getDrivers();
      set({ drivers, deliveriesLoading: false });
    } catch (error: any) {
      set({
        deliveriesError: error.response?.data?.message || 'Failed to fetch drivers',
        deliveriesLoading: false,
      });
    }
  },

  clearCurrentDelivery: () => {
    set({ currentDelivery: null });
  },
});