import { apiClient } from './client';
import { businessAPI } from './business';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendAnalytics {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers?: number;
    todayRevenue?: number;
    todayOrders?: number;
    weekRevenue?: number;
    weekOrders?: number;
    monthRevenue?: number;
    monthOrders?: number;
  };
  orderStatuses: Array<{ _id: string; count: number }>;
  topProducts: Array<{ _id?: string; productName: string; quantity: number; revenue: number }>;
  business?: {
    name?: string;
  };
}

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

const fetchAnalytics = async (): Promise<BackendAnalytics> => {
  const business = await businessAPI.getBusiness();
  const response = await apiClient.get<ApiEnvelope<BackendAnalytics>>(`/businesses/${business.id}/analytics`);
  return response.data;
};

export const analyticsAPI = {
  async getOverview(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<AnalyticsOverview> {
    const analytics = await fetchAnalytics();
    return {
      totalRevenue: analytics.overview.totalRevenue || 0,
      totalOrders: analytics.overview.totalOrders || 0,
      totalProducts: analytics.overview.totalProducts || 0,
      totalCustomers: analytics.overview.totalCustomers || 0,
      revenueGrowth: 0,
      orderGrowth: 0,
      customerGrowth: 0,
    };
  },

  async getRevenueData(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month', _startDate?: string, _endDate?: string): Promise<RevenueData[]> {
    const analytics = await fetchAnalytics();
    return [
      {
        date: 'Today',
        revenue: analytics.overview.todayRevenue || 0,
        orders: analytics.overview.todayOrders || 0,
      },
      {
        date: 'Last 7 Days',
        revenue: analytics.overview.weekRevenue || 0,
        orders: analytics.overview.weekOrders || 0,
      },
      {
        date: 'Last 30 Days',
        revenue: analytics.overview.monthRevenue || 0,
        orders: analytics.overview.monthOrders || 0,
      },
    ];
  },

  async getProductPerformance(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month', limit: number = 10): Promise<ProductPerformance[]> {
    const analytics = await fetchAnalytics();
    return (analytics.topProducts || []).slice(0, limit).map((item, index) => ({
      productId: item._id || `${index}`,
      name: item.productName,
      sales: item.quantity,
      quantity: item.quantity,
      revenue: item.revenue,
    }));
  },

  async getCustomerAnalytics(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<CustomerAnalytics> {
    const analytics = await fetchAnalytics();
    return {
      totalCustomers: analytics.overview.totalCustomers || 0,
      newCustomers: analytics.overview.totalCustomers || 0,
      returningCustomers: 0,
      customerAcquisition: [
        {
          date: new Date().toISOString().split('T')[0],
          newCustomers: analytics.overview.totalCustomers || 0,
        },
      ],
    };
  },

  async getSalesChannels(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<SalesChannel[]> {
    const analytics = await fetchAnalytics();
    const total = analytics.orderStatuses.reduce((sum, item) => sum + item.count, 0) || 1;

    return analytics.orderStatuses.map((status) => ({
      channel: status._id,
      sales: status.count,
      revenue: 0,
      percentage: Math.round((status.count / total) * 100),
    }));
  },

  async getGeographicData(): Promise<Array<{ state: string; orders: number; revenue: number }>> {
    return [];
  },

  async exportAnalytics(type: 'revenue' | 'products' | 'customers' | 'all', format: 'csv' | 'excel' = 'csv', _startDate?: string, _endDate?: string): Promise<Blob> {
    const overview = await this.getOverview();
    const rows = [`type,totalRevenue,totalOrders,totalProducts,totalCustomers`, `${type},${overview.totalRevenue},${overview.totalOrders},${overview.totalProducts},${overview.totalCustomers}`];
    return new Blob([rows.join('\n')], {
      type: format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv;charset=utf-8;',
    });
  },
};
