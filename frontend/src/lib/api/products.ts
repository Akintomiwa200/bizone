import { apiClient } from './client';

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
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filter as any),
    });
    return await apiClient.get<ProductsResponse>(`/products?${params}`);
  },

  async getProduct(id: string): Promise<Product> {
    return await apiClient.get<Product>(`/products/${id}`);
  },

  async createProduct(data: ProductCreateData): Promise<Product> {
    return await apiClient.post<Product>('/products', data);
  },

  async updateProduct(id: string, data: ProductUpdateData): Promise<Product> {
    return await apiClient.patch<Product>(`/products/${id}`, data);
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async bulkUpdateProducts(ids: string[], data: Partial<Product>): Promise<void> {
    await apiClient.patch('/products/bulk', { ids, data });
  },

  async uploadProductImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return await apiClient.post<{ url: string }>('/products/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async getCategories(): Promise<string[]> {
    return await apiClient.get<string[]>('/products/categories');
  },

  async getLowStockProducts(): Promise<Product[]> {
    return await apiClient.get<Product[]>('/products/low-stock');
  },
};