import axios from 'axios';
import { 
  User, Business, Product, Order, 
  LoginData, RegisterData, CreateBusinessData, CreateProductData 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bizon_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bizon_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  }
};

export const businessAPI = {
  createBusiness: async (data: CreateBusinessData): Promise<Business> => {
    const response = await api.post('/businesses', data);
    return response.data.data;
  },

  getMyBusiness: async (): Promise<Business> => {
    const response = await api.get('/businesses/my-business');
    return response.data.data;
  },

  updateBusiness: async (id: string, data: Partial<Business>): Promise<Business> => {
    const response = await api.put(`/businesses/${id}`, data);
    return response.data.data;
  },

  getProducts: async (businessId: string): Promise<Product[]> => {
    const response = await api.get(`/businesses/${businessId}/products`);
    return response.data.data;
  },

  createProduct: async (businessId: string, data: CreateProductData): Promise<Product> => {
    const response = await api.post(`/businesses/${businessId}/products`, data);
    return response.data.data;
  },

  updateProduct: async (businessId: string, productId: string, data: Partial<Product>) => {
    const response = await api.put(`/businesses/${businessId}/products/${productId}`, data);
    return response.data.data;
  },

  deleteProduct: async (businessId: string, productId: string) => {
    const response = await api.delete(`/businesses/${businessId}/products/${productId}`);
    return response.data;
  }
};

export const ordersAPI = {
  createOrder: async (data: any): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data.data;
  },

  getBusinessOrders: async (businessId: string, params?: any) => {
    const response = await api.get(`/orders/business/${businessId}`, { params });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string, note?: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status, note });
    return response.data.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
  }
};

export const deliveryAPI = {
  requestDelivery: async (orderId: string, data: any) => {
    const response = await api.post('/delivery/request', { orderId, ...data });
    return response.data.data;
  },

  trackDelivery: async (deliveryId: string) => {
    const response = await api.get(`/delivery/${deliveryId}/track`);
    return response.data.data;
  },

  updateDeliveryStatus: async (deliveryId: string, status: string, note?: string) => {
    const response = await api.patch(`/delivery/${deliveryId}/status`, { status, note });
    return response.data.data;
  }
};

export default api;
