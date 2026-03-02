import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  costPrice: number;
  sku: string;
  barcode?: string;
  category: string;
  tags: string[];
  images: string[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
  };
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: {
    [key: string]: string; // e.g., { size: 'M', color: 'Red' }
  };
  price: number;
  costPrice: number;
  sku: string;
  inventory: number;
}

export interface ProductCreateData {
  name: string;
  description?: string;
  price: number;
  costPrice: number;
  sku: string;
  barcode?: string;
  category: string;
  tags?: string[];
  images?: string[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
  };
  variants?: Omit<ProductVariant, 'id'>[];
}

export interface ProductUpdateData extends Partial<ProductCreateData> {
  isActive?: boolean;
}

export interface ProductsFilter {
  businessId?: string;
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsAPI = {
  async getProducts(
    page: number = 1,
    limit: number = 20,
    filter?: ProductsFilter
  ): Promise<ProductsResponse> {
    if (!filter?.businessId) {
      return {
        products: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    const params = new URLSearchParams();
    if (filter.category) params.append('category', filter.category);
    const response = await apiClient.get<ApiEnvelope<Product[]>>(`/products/business/${filter.businessId}?${params}`);
    const products = response.data || [];
    return {
      products,
      total: products.length,
      page,
      limit,
      totalPages: products.length ? 1 : 0,
    };
  },

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<ApiEnvelope<Product>>(`/products/${id}`);
    return response.data;
  },

  async createProduct(data: ProductCreateData): Promise<Product> {
    const response = await apiClient.post<ApiEnvelope<Product>>('/products', data);
    return response.data;
  },

  async updateProduct(id: string, data: ProductUpdateData): Promise<Product> {
    const response = await apiClient.put<ApiEnvelope<Product>>(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async bulkUpdateProducts(ids: string[], data: Partial<Product>): Promise<void> {
    await Promise.all(ids.map((id) => productsAPI.updateProduct(id, data as ProductUpdateData)));
  },

  async uploadProductImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post<ApiEnvelope<{ url: string }>>('/products/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getCategories(): Promise<string[]> {
    return [];
  },

  async getLowStockProducts(): Promise<Product[]> {
    return [];
  },
};
