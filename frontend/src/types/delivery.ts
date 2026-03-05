export interface Delivery {
  id: string;
  orderId: string;
  status: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt?: string;
  updatedAt?: string;
}
