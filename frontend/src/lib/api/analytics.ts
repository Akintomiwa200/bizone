import { apiClient } from './client';

export interface AnalyticsOverview {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface ProductPerformance {
  productId: string;
  name: string;
  sales: number;
  revenue: number;
  quantity: number;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerAcquisition: Array<{
    date: string;
    newCustomers: number;
  }>;
}

export interface SalesChannel {
  channel: string;
  sales: number;
  revenue: number;
  percentage: number;
}

export const analyticsAPI = {
  async getOverview(timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<AnalyticsOverview> {
    return await apiClient.get<AnalyticsOverview>(`/analytics/overview?timeframe=${timeframe}`);
  },

  async getRevenueData(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month',
    startDate?: string,
    endDate?: string
  ): Promise<RevenueData[]> {
    const params = new URLSearchParams({ timeframe });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return await apiClient.get<RevenueData[]>(`/analytics/revenue?${params}`);
  },

  async getProductPerformance(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month',
    limit: number = 10
  ): Promise<ProductPerformance[]> {
    return await apiClient.get<ProductPerformance[]>(
      `/analytics/products?timeframe=${timeframe}&limit=${limit}`
    );
  },

  async getCustomerAnalytics(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<CustomerAnalytics> {
    return await apiClient.get<CustomerAnalytics>(`/analytics/customers?timeframe=${timeframe}`);
  },

  async getSalesChannels(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<SalesChannel[]> {
    return await apiClient.get<SalesChannel[]>(`/analytics/channels?timeframe=${timeframe}`);
  },

  async getGeographicData(): Promise<Array<{ state: string; orders: number; revenue: number }>> {
    return await apiClient.get('/analytics/geographic');
  },

  async exportAnalytics(
    type: 'revenue' | 'products' | 'customers' | 'all',
    format: 'csv' | 'excel' = 'csv',
    startDate?: string,
    endDate?: string
  ): Promise<Blob> {
    const params = new URLSearchParams({ type, format });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await apiClient.get(`/analytics/export?${params}`, {
      responseType: 'blob',
    });
    return response;
  },
};