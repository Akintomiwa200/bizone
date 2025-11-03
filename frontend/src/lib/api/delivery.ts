import { apiClient } from './client';

export interface Delivery {
  id: string;
  orderId: string;
  driverId?: string;
  pickupAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  deliveryAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingNumber: string;
  distance: number; // in kilometers
  fee: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: {
    type: string;
    plateNumber: string;
    capacity: string;
  };
  status: 'available' | 'busy' | 'offline';
  currentLocation?: {
    lat: number;
    lng: number;
  };
  rating: number;
  totalDeliveries: number;
}

export interface DeliveryCreateData {
  orderId: string;
  pickupAddress: Delivery['pickupAddress'];
  deliveryAddress: Delivery['deliveryAddress'];
  estimatedDelivery: string;
  notes?: string;
}

export interface DeliveryUpdateData {
  driverId?: string;
  status?: Delivery['status'];
  actualDelivery?: string;
  notes?: string;
}

export const deliveryAPI = {
  async getDeliveries(
    page: number = 1,
    limit: number = 20,
    status?: Delivery['status']
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    return await apiClient.get(`/deliveries?${params}`);
  },

  async getDelivery(id: string): Promise<Delivery> {
    return await apiClient.get<Delivery>(`/deliveries/${id}`);
  },

  async createDelivery(data: DeliveryCreateData): Promise<Delivery> {
    return await apiClient.post<Delivery>('/deliveries', data);
  },

  async updateDelivery(id: string, data: DeliveryUpdateData): Promise<Delivery> {
    return await apiClient.patch<Delivery>(`/deliveries/${id}`, data);
  },

  async assignDriver(deliveryId: string, driverId: string): Promise<Delivery> {
    return await apiClient.patch<Delivery>(`/deliveries/${deliveryId}/assign`, { driverId });
  },

  async updateDeliveryStatus(
    deliveryId: string,
    status: Delivery['status']
  ): Promise<Delivery> {
    return await apiClient.patch<Delivery>(`/deliveries/${deliveryId}/status`, { status });
  },

  async getDrivers(): Promise<Driver[]> {
    return await apiClient.get<Driver[]>('/deliveries/drivers');
  },

  async getDeliveryTracking(trackingNumber: string): Promise<Delivery> {
    return await apiClient.get<Delivery>(`/deliveries/tracking/${trackingNumber}`);
  },

  async calculateDeliveryFee(
    pickupAddress: Delivery['pickupAddress'],
    deliveryAddress: Delivery['deliveryAddress']
  ): Promise<{ distance: number; fee: number }> {
    return await apiClient.post<{ distance: number; fee: number }>(
      '/deliveries/calculate-fee',
      { pickupAddress, deliveryAddress }
    );
  },
};