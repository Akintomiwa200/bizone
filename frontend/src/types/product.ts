export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  inventory: {
    quantity: number;
    trackQuantity: boolean;
    lowStockThreshold?: number;
  };
  status?: 'active' | 'draft' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}
