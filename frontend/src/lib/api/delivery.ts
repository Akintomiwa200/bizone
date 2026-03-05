import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendDelivery {
  _id: string;
  order?: string | { _id: string };
  rider?: string | { _id: string; user?: { name?: string; phone?: string; email?: string } };
  pickup?: {
    location?: {
      address?: string;
      coordinates?: { lat?: number; lng?: number };
      contact?: { name?: string; phone?: string };
    };
  };
  dropoff?: {
    location?: {
      address?: string;
      coordinates?: { lat?: number; lng?: number };
      landmark?: string;
    };
    contact?: { name?: string; phone?: string };
  };
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  timeline?: {
    estimatedDelivery?: string;
    actualDelivery?: string;
  };
  deliveryId?: string;
  pricing?: {
    total?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

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
  distance: number;
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

const backendToFrontendStatus = (status: BackendDelivery['status']): Delivery['status'] => {
  if (status === 'picked-up') return 'picked_up';
  if (status === 'in-transit') return 'in_transit';
  return status as Delivery['status'];
};

const frontendToBackendStatus = (status: Delivery['status']): BackendDelivery['status'] => {
  if (status === 'picked_up') return 'picked-up';
  if (status === 'in_transit') return 'in-transit';
  return status as BackendDelivery['status'];
};

const splitAddress = (address = '') => {
  const parts = address.split(',').map((part) => part.trim());
  return {
    street: parts[0] || '',
    city: parts[1] || '',
    state: parts[2] || '',
    country: 'Nigeria',
    postalCode: '',
  };
};

const mapDelivery = (delivery: BackendDelivery): Delivery => {
  const pickupAddress = splitAddress(delivery.pickup?.location?.address || '');
  const dropoffAddress = splitAddress(delivery.dropoff?.location?.address || '');

  return {
    id: delivery._id,
    orderId: typeof delivery.order === 'string' ? delivery.order : delivery.order?._id || '',
    driverId: typeof delivery.rider === 'string' ? delivery.rider : delivery.rider?._id,
    pickupAddress: {
      name: delivery.pickup?.location?.contact?.name || '',
      phone: delivery.pickup?.location?.contact?.phone || '',
      ...pickupAddress,
    },
    deliveryAddress: {
      name: delivery.dropoff?.contact?.name || '',
      phone: delivery.dropoff?.contact?.phone || '',
      ...dropoffAddress,
    },
    status: backendToFrontendStatus(delivery.status),
    estimatedDelivery: delivery.timeline?.estimatedDelivery || new Date().toISOString(),
    actualDelivery: delivery.timeline?.actualDelivery,
    trackingNumber: delivery.deliveryId || delivery._id,
    distance: 0,
    fee: delivery.pricing?.total || 0,
    createdAt: delivery.createdAt || new Date().toISOString(),
    updatedAt: delivery.updatedAt || new Date().toISOString(),
  };
};

export const deliveryAPI = {
  async getDeliveries(page: number = 1, limit: number = 20, _status?: Delivery['status']) {
    return {
      deliveries: [] as Delivery[],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  },

  async getDelivery(id: string): Promise<Delivery> {
    const response = await apiClient.get<ApiEnvelope<BackendDelivery>>(`/delivery/${id}/track`);
    return mapDelivery(response.data);
  },

  async createDelivery(data: DeliveryCreateData): Promise<Delivery> {
    const payload = {
      orderId: data.orderId,
      pickup: {
        location: {
          address: `${data.pickupAddress.street}, ${data.pickupAddress.city}, ${data.pickupAddress.state}`,
          coordinates: { lat: 0, lng: 0 },
          contact: {
            name: data.pickupAddress.name,
            phone: data.pickupAddress.phone,
          },
        },
      },
      dropoff: {
        location: {
          address: `${data.deliveryAddress.street}, ${data.deliveryAddress.city}, ${data.deliveryAddress.state}`,
          coordinates: { lat: 0, lng: 0 },
        },
        contact: {
          name: data.deliveryAddress.name,
          phone: data.deliveryAddress.phone,
        },
      },
      package: {
        description: data.notes || 'General package',
        size: 'medium',
      },
    };

    const response = await apiClient.post<ApiEnvelope<BackendDelivery>>('/delivery/request', payload);
    return mapDelivery(response.data);
  },

  async updateDelivery(id: string, data: DeliveryUpdateData): Promise<Delivery> {
    const payload = {
      status: data.status ? frontendToBackendStatus(data.status) : undefined,
      note: data.notes,
    };
    const response = await apiClient.patch<ApiEnvelope<BackendDelivery>>(`/delivery/${id}/status`, payload);
    return mapDelivery(response.data);
  },

  async assignDriver(deliveryId: string, driverId: string): Promise<Delivery> {
    const response = await apiClient.post<ApiEnvelope<BackendDelivery>>(`/delivery/${deliveryId}/assign`, { riderId: driverId });
    return mapDelivery(response.data);
  },

  async updateDeliveryStatus(deliveryId: string, status: Delivery['status']): Promise<Delivery> {
    const response = await apiClient.patch<ApiEnvelope<BackendDelivery>>(`/delivery/${deliveryId}/status`, {
      status: frontendToBackendStatus(status),
    });
    return mapDelivery(response.data);
  },

  async getDrivers(): Promise<Driver[]> {
    return [];
  },

  async getDeliveryTracking(trackingNumber: string): Promise<Delivery> {
    return this.getDelivery(trackingNumber);
  },

  async calculateDeliveryFee(
    pickupAddress: Delivery['pickupAddress'],
    deliveryAddress: Delivery['deliveryAddress']
  ): Promise<{ distance: number; fee: number }> {
    const distance = pickupAddress.city === deliveryAddress.city ? 5 : 15;
    const fee = 500 + distance * 100;
    return { distance, fee };
  },
};
