import { apiClient } from './client';

export interface Business {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
  };
  settings: {
    currency: string;
    timezone: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  subscription: {
    plan: 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'canceled';
    expiresAt: string;
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BusinessUpdateData {
  name?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  phone?: string;
  email?: string;
  address?: Partial<Business['address']>;
  socialMedia?: Partial<Business['socialMedia']>;
  settings?: Partial<Business['settings']>;
}

export const businessAPI = {
  async getBusiness(): Promise<Business> {
    return await apiClient.get<Business>('/business');
  },

  async updateBusiness(data: BusinessUpdateData): Promise<Business> {
    return await apiClient.patch<Business>('/business', data);
  },

  async uploadLogo(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('logo', file);
    return await apiClient.post<{ url: string }>('/business/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async uploadCoverImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('coverImage', file);
    return await apiClient.post<{ url: string }>('/business/cover-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async getBusinessStats(): Promise<Business['stats']> {
    return await apiClient.get<Business['stats']>('/business/stats');
  },

  async updateSubscription(plan: string): Promise<Business> {
    return await apiClient.post<Business>('/business/subscription', { plan });
  },
};