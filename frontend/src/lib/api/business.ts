import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendBusiness {
  _id: string;
  name: string;
  description?: string;
  category: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
    };
    website?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
  };
  settings?: {
    currency?: string;
    isActive?: boolean;
    acceptOrders?: boolean;
    acceptDelivery?: boolean;
  };
  stats?: {
    totalOrders?: number;
    totalRevenue?: number;
    totalCustomers?: number;
    averageRating?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

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
  category?: string;
  address?: Partial<Business['address']>;
  socialMedia?: Partial<Business['socialMedia']>;
  settings?: Partial<Business['settings']>;
}

const mapBusiness = (business: BackendBusiness): Business => {
  const contactAddress = business.contact?.address || {};
  return {
    id: business._id,
    name: business.name,
    description: business.description,
    phone: business.contact?.phone || '',
    email: business.contact?.email || '',
    address: {
      street: contactAddress.street || '',
      city: contactAddress.city || '',
      state: contactAddress.state || '',
      country: contactAddress.country || 'Nigeria',
      postalCode: '',
    },
    socialMedia: {
      facebook: business.social?.facebook,
      twitter: business.social?.twitter,
      instagram: business.social?.instagram,
      whatsapp: business.social?.whatsapp,
    },
    settings: {
      currency: business.settings?.currency || 'NGN',
      timezone: 'Africa/Lagos',
      language: 'en',
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
    },
    subscription: {
      plan: 'basic',
      status: business.settings?.isActive === false ? 'inactive' : 'active',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    stats: {
      totalProducts: 0,
      totalOrders: business.stats?.totalOrders || 0,
      totalRevenue: business.stats?.totalRevenue || 0,
      totalCustomers: business.stats?.totalCustomers || 0,
    },
    createdAt: business.createdAt || new Date().toISOString(),
    updatedAt: business.updatedAt || new Date().toISOString(),
  };
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const businessAPI = {
  async getBusiness(): Promise<Business> {
    const response = await apiClient.get<ApiEnvelope<BackendBusiness>>('/businesses/my-business');
    return mapBusiness(response.data);
  },

  async createBusiness(data: { name: string; category: string; email?: string; phone?: string; description?: string }): Promise<Business> {
    const payload = {
      name: data.name,
      category: data.category,
      description: data.description,
      contact: {
        email: data.email,
        phone: data.phone,
      },
    };

    const response = await apiClient.post<ApiEnvelope<BackendBusiness>>('/businesses', payload);
    return mapBusiness(response.data);
  },

  async updateBusiness(data: BusinessUpdateData): Promise<Business> {
    const current = await this.getBusiness();

    const payload: Record<string, unknown> = {
      ...(data.name ? { name: data.name } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.category ? { category: data.category } : {}),
    };

    if (data.phone || data.email || data.address) {
      payload.contact = {
        ...(data.email ? { email: data.email } : {}),
        ...(data.phone ? { phone: data.phone } : {}),
        ...(data.address
          ? {
              address: {
                ...(data.address.street ? { street: data.address.street } : {}),
                ...(data.address.city ? { city: data.address.city } : {}),
                ...(data.address.state ? { state: data.address.state } : {}),
                ...(data.address.country ? { country: data.address.country } : {}),
              },
            }
          : {}),
      };
    }

    if (data.socialMedia) {
      payload.social = {
        ...(data.socialMedia.facebook ? { facebook: data.socialMedia.facebook } : {}),
        ...(data.socialMedia.twitter ? { twitter: data.socialMedia.twitter } : {}),
        ...(data.socialMedia.instagram ? { instagram: data.socialMedia.instagram } : {}),
        ...(data.socialMedia.whatsapp ? { whatsapp: data.socialMedia.whatsapp } : {}),
      };
    }

    const response = await apiClient.put<ApiEnvelope<BackendBusiness>>(`/businesses/${current.id}`, payload);
    return mapBusiness(response.data);
  },

  async uploadLogo(file: File): Promise<{ url: string }> {
    const url = await readFileAsDataUrl(file);
    return { url };
  },

  async uploadCoverImage(file: File): Promise<{ url: string }> {
    const url = await readFileAsDataUrl(file);
    return { url };
  },

  async getBusinessStats(): Promise<Business['stats']> {
    const business = await this.getBusiness();
    return business.stats;
  },

  async updateSubscription(_plan: string): Promise<Business> {
    return this.getBusiness();
  },
};
