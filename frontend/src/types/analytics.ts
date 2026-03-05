export interface AnalyticsOverview {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}
