import { useState, useCallback, useMemo } from 'react';
import { useStore } from '@/lib/store';
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
  const {
    products,
    currentProduct,
    ordersLoading,
    ordersError,
    ordersPagination,
    fetchOrders: storeFetchProducts,
    fetchOrder: storeFetchProduct,
    createOrder: storeCreateProduct,
    updateOrder: storeUpdateProduct,
    deleteOrder: storeDeleteProduct,
    clearCurrentOrder: storeClearCurrentProduct,
  } = useStore();

  const [filters, setFilters] = useState<ProductsFilter>(initialFilters);
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = useCallback(async (page: number = 1, limit: number = 20, filter?: ProductsFilter) => {
    try {
      const effectiveFilters = filter || filters;
      await storeFetchProducts(page, limit, effectiveFilters);
    } catch (error) {
      throw error;
    }
  }, [storeFetchProducts, filters]);

  const fetchProduct = useCallback(async (id: string) => {
    try {
      await storeFetchProduct(id);
    } catch (error) {
      throw error;
    }
  }, [storeFetchProduct]);

  const createProduct = useCallback(async (data: ProductCreateData): Promise<Product> => {
    try {
      const product = await storeCreateProduct(data);
      notificationService.success('Product Created', `${product.name} has been created successfully.`);
      return product;
    } catch (error: any) {
      notificationService.error('Creation Failed', error.response?.data?.message || 'Failed to create product');
      throw error;
    }
  }, [storeCreateProduct]);

  const updateProduct = useCallback(async (id: string, data: ProductUpdateData) => {
    try {
      await storeUpdateProduct(id, data);
      notificationService.success('Product Updated', 'Product has been updated successfully.');
    } catch (error: any) {
      notificationService.error('Update Failed', error.response?.data?.message || 'Failed to update product');
      throw error;
    }
  }, [storeUpdateProduct]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await storeDeleteProduct(id);
      notificationService.success('Product Deleted', 'Product has been deleted successfully.');
    } catch (error: any) {
      notificationService.error('Deletion Failed', error.response?.data?.message || 'Failed to delete product');
      throw error;
    }
  }, [storeDeleteProduct]);

  const bulkUpdateProducts = useCallback(async (ids: string[], data: Partial<Product>) => {
    try {
      await productsAPI.bulkUpdateProducts(ids, data);
      notificationService.success('Products Updated', `${ids.length} products have been updated successfully.`);
      
      // Refresh the products list
      await fetchProducts();
    } catch (error: any) {
      notificationService.error('Bulk Update Failed', error.response?.data?.message || 'Failed to update products');
      throw error;
    }
  }, [fetchProducts]);

  const uploadProductImage = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const result = await productsAPI.uploadProductImage(file);
      return result.url;
    } catch (error: any) {
      notificationService.error('Upload Failed', error.response?.data?.message || 'Failed to upload image');
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearCurrentProduct = useCallback(() => {
    storeClearCurrentProduct();
  }, [storeClearCurrentProduct]);

  const clearError = useCallback(() => {
    useStore.getState().ordersError = null;
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!filters.search && !filters.category && !filters.tags) {
      return products;
    }

    return products.filter(product => {
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
    isLoading: ordersLoading || isUploading,
    error: ordersError,
    pagination: ordersPagination,
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