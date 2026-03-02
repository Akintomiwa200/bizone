import { useState, useCallback, useMemo } from 'react';
import { productsAPI, Product, ProductCreateData, ProductUpdateData, ProductsFilter } from '@/lib/api/products';
import { notificationService } from '@/lib/services/notification-service';

export interface UseProductsReturn {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: ProductsFilter;
  fetchProducts: (page?: number, limit?: number, filter?: ProductsFilter) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  createProduct: (data: ProductCreateData) => Promise<Product>;
  updateProduct: (id: string, data: ProductUpdateData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  bulkUpdateProducts: (ids: string[], data: Partial<Product>) => Promise<void>;
  uploadProductImage: (file: File) => Promise<string>;
  setFilters: (filters: ProductsFilter) => void;
  clearFilters: () => void;
  clearCurrentProduct: () => void;
  clearError: () => void;
}

export const useProducts = (initialFilters: ProductsFilter = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState<ProductsFilter>(initialFilters);
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = useCallback(async (page: number = 1, limit: number = 20, filter?: ProductsFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      const effectiveFilters = filter || filters;
      const response = await productsAPI.getProducts(page, limit, effectiveFilters);
      setProducts(response.products || []);
      setPagination({
        page: response.page || page,
        limit: response.limit || limit,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch products';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productsAPI.getProduct(id);
      setCurrentProduct(product);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch product';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: ProductCreateData): Promise<Product> => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productsAPI.createProduct(data);
      setProducts((prev) => [product, ...prev]);
      notificationService.success('Product Created', `${(product as any).name || 'Item'} has been created successfully.`);
      return product;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create product';
      setError(message);
      notificationService.error('Creation Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, data: ProductUpdateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await productsAPI.updateProduct(id, data);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setCurrentProduct((prev) => (prev?.id === id ? updated : prev));
      notificationService.success('Product Updated', 'Product has been updated successfully.');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update product';
      setError(message);
      notificationService.error('Update Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setCurrentProduct((prev) => (prev?.id === id ? null : prev));
      notificationService.success('Product Deleted', 'Product has been deleted successfully.');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to delete product';
      setError(message);
      notificationService.error('Deletion Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bulkUpdateProducts = useCallback(async (ids: string[], data: Partial<Product>) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsAPI.bulkUpdateProducts(ids, data);
      notificationService.success('Products Updated', `${ids.length} products have been updated successfully.`);
      await fetchProducts();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update products';
      setError(message);
      notificationService.error('Bulk Update Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts]);

  const uploadProductImage = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);
    try {
      const result = await productsAPI.uploadProductImage(file);
      return result.url;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to upload image';
      setError(message);
      notificationService.error('Upload Failed', message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearCurrentProduct = useCallback(() => {
    setCurrentProduct(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

// Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!filters.search && !filters.category && !filters.tags) {
      return products;
    }

    return products.filter((product: any) => {
      let matches = true;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      matches = matches && (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      matches = matches && product.category === filters.category;
    }

    if (filters.tags && filters.tags.length > 0) {
      matches = matches && filters.tags.every(tag => product.tags.includes(tag));
    }

    if (filters.inStock !== undefined) {
      matches = matches && (
        filters.inStock ? product.inventory.quantity > 0 : product.inventory.quantity === 0
      );
    }

    if (filters.isActive !== undefined) {
      matches = matches && product.isActive === filters.isActive;
    }

      return matches;
    });
  }, [products, filters]);

  return {
    products: filteredProducts,
    currentProduct,
    isLoading: isLoading || isUploading,
    error,
    pagination,
    filters,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkUpdateProducts,
    uploadProductImage,
    setFilters,
    clearFilters,
    clearCurrentProduct,
    clearError,
  };
};
