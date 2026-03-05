import { apiClient } from './client';
import { businessAPI } from './business';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  costPerItem?: number;
  status?: 'active' | 'draft' | 'archived';
  inventory?: {
    quantity?: number;
    lowStockAlert?: number;
    trackQuantity?: boolean;
  };
  variants?: Array<{
    _id?: string;
    name: string;
    options: string[];
  }>;
  images?: Array<{ url?: string }>;
  createdAt?: string;
  updatedAt?: string;
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
    [key: string]: string;
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

const mapProduct = (p: BackendProduct): Product => ({
  id: p._id,
  name: p.name,
  description: p.description,
  price: p.price,
  costPrice: p.costPerItem || 0,
  sku: p._id.slice(-8).toUpperCase(),
  barcode: undefined,
  category: p.category,
  tags: [],
  images: (p.images || []).map((image) => image.url || '').filter(Boolean),
  inventory: {
    quantity: p.inventory?.quantity || 0,
    lowStockThreshold: p.inventory?.lowStockAlert || 5,
    trackQuantity: p.inventory?.trackQuantity !== false,
  },
  variants: (p.variants || []).map((variant, index) => ({
    id: variant._id || `${p._id}-${index}`,
    name: variant.name,
    options: variant.options.reduce((acc, option, i) => ({ ...acc, [`option${i + 1}`]: option }), {}),
    price: p.price,
    costPrice: p.costPerItem || 0,
    sku: `${p._id.slice(-5).toUpperCase()}-${index + 1}`,
    inventory: p.inventory?.quantity || 0,
  })),
  isActive: (p.status || 'active') === 'active',
  createdAt: p.createdAt || new Date().toISOString(),
  updatedAt: p.updatedAt || new Date().toISOString(),
});

const toBackendPayload = (data: ProductCreateData | ProductUpdateData) => ({
  ...(data.name ? { name: data.name } : {}),
  ...(data.description ? { description: data.description } : {}),
  ...(data.category ? { category: data.category } : {}),
  ...(typeof data.price === 'number' ? { price: data.price } : {}),
  ...(typeof data.costPrice === 'number' ? { costPerItem: data.costPrice } : {}),
  ...(('isActive' in data && typeof data.isActive === 'boolean')
    ? { status: data.isActive ? 'active' : 'draft' }
    : {}),
  ...(data.inventory
    ? {
        inventory: {
          quantity: data.inventory.quantity,
          lowStockAlert: data.inventory.lowStockThreshold,
          trackQuantity: data.inventory.trackQuantity,
        },
      }
    : {}),
  ...(data.images?.length ? { images: data.images.map((url) => ({ url })) } : {}),
});

export const productsAPI = {
  async getProducts(page: number = 1, limit: number = 20, filter?: ProductsFilter): Promise<ProductsResponse> {
    let businessId = filter?.businessId;

    if (!businessId) {
      const business = await businessAPI.getBusiness();
      businessId = business.id;
    }

    const params = new URLSearchParams();
    if (filter?.category) params.append('category', filter.category);

    const response = await apiClient.get<ApiEnvelope<BackendProduct[]>>(`/products/business/${businessId}?${params}`);
    const products = (response.data || []).map(mapProduct);

    return {
      products,
      total: products.length,
      page,
      limit,
      totalPages: products.length ? Math.ceil(products.length / limit) : 0,
    };
  },

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<ApiEnvelope<BackendProduct>>(`/products/${id}`);
    return mapProduct(response.data);
  },

  async createProduct(data: ProductCreateData): Promise<Product> {
    const response = await apiClient.post<ApiEnvelope<BackendProduct>>('/products', toBackendPayload(data));
    return mapProduct(response.data);
  },

  async updateProduct(id: string, data: ProductUpdateData): Promise<Product> {
    const response = await apiClient.put<ApiEnvelope<BackendProduct>>(`/products/${id}`, toBackendPayload(data));
    return mapProduct(response.data);
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async bulkUpdateProducts(ids: string[], data: Partial<Product>): Promise<void> {
    await Promise.all(
      ids.map((id) =>
        productsAPI.updateProduct(id, {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          costPrice: data.costPrice,
          isActive: data.isActive,
          inventory: data.inventory,
        })
      )
    );
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
    const business = await businessAPI.getBusiness();
    const list = await productsAPI.getProducts(1, 200, { businessId: business.id });
    return Array.from(new Set(list.products.map((product) => product.category).filter(Boolean))).sort();
  },

  async getLowStockProducts(): Promise<Product[]> {
    const business = await businessAPI.getBusiness();
    const list = await productsAPI.getProducts(1, 200, { businessId: business.id });
    return list.products.filter((product) => product.inventory.trackQuantity && product.inventory.quantity <= product.inventory.lowStockThreshold);
  },
};
