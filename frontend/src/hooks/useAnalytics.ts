import { useState, useCallback, useMemo } from 'react';
import { analyticsAPI, AnalyticsOverview, RevenueData, ProductPerformance, CustomerAnalytics, SalesChannel } from '@/lib/api/analytics';

export interface UseAnalyticsReturn {
  overview: AnalyticsOverview | null;
  revenueData: RevenueData[];
  productPerformance: ProductPerformance[];
  customerAnalytics: CustomerAnalytics | null;
  salesChannels: SalesChannel[];
  geographicData: Array<{ state: string; orders: number; revenue: number }>;
  isLoading: boolean;
  error: string | null;
  timeframe: 'day' | 'week' | 'month' | 'year';
  fetchOverview: (timeframe?: 'day' | 'week' | 'month' | 'year') => Promise<void>;
  fetchRevenueData: (timeframe?: 'day' | 'week' | 'month' | 'year', startDate?: string, endDate?: string) => Promise<void>;
  fetchProductPerformance: (timeframe?: 'day' | 'week' | 'month' | 'year', limit?: number) => Promise<void>;
  fetchCustomerAnalytics: (timeframe?: 'day' | 'week' | 'month' | 'year') => Promise<void>;
  fetchSalesChannels: (timeframe?: 'day' | 'week' | 'month' | 'year') => Promise<void>;
  fetchGeographicData: () => Promise<void>;
  exportAnalytics: (type: 'revenue' | 'products' | 'customers' | 'all', format?: 'csv' | 'excel', startDate?: string, endDate?: string) => Promise<void>;
  setTimeframe: (timeframe: 'day' | 'week' | 'month' | 'year') => void;
  clearError: () => void;
}

export const useAnalytics = (initialTimeframe: 'day' | 'week' | 'month' | 'year' = 'month') => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
  const [customerAnalytics, setCustomerAnalytics] = useState<CustomerAnalytics | null>(null);
  const [salesChannels, setSalesChannels] = useState<SalesChannel[]>([]);
  const [geographicData, setGeographicData] = useState<Array<{ state: string; orders: number; revenue: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>(initialTimeframe);
  const [isExporting, setIsExporting] = useState(false);

  const fetchOverview = useCallback(async (timeframeParam?: 'day' | 'week' | 'month' | 'year') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getOverview(timeframeParam || timeframe);
      setOverview(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch analytics overview';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const fetchRevenueData = useCallback(async (
    timeframeParam?: 'day' | 'week' | 'month' | 'year',
    startDate?: string,
    endDate?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getRevenueData(timeframeParam || timeframe, startDate, endDate);
      setRevenueData(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch revenue data';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const fetchProductPerformance = useCallback(async (
    timeframeParam?: 'day' | 'week' | 'month' | 'year',
    limit: number = 10
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getProductPerformance(timeframeParam || timeframe, limit);
      setProductPerformance(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product performance';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const fetchCustomerAnalytics = useCallback(async (timeframeParam?: 'day' | 'week' | 'month' | 'year') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getCustomerAnalytics(timeframeParam || timeframe);
      setCustomerAnalytics(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch customer analytics';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const fetchSalesChannels = useCallback(async (timeframeParam?: 'day' | 'week' | 'month' | 'year') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getSalesChannels(timeframeParam || timeframe);
      setSalesChannels(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch sales channels';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const fetchGeographicData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getGeographicData();
      setGeographicData(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch geographic data';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const exportAnalytics = useCallback(async (
    type: 'revenue' | 'products' | 'customers' | 'all',
    format: 'csv' | 'excel' = 'csv',
    startDate?: string,
    endDate?: string
  ) => {
    setIsExporting(true);
    try {
      const blob = await analyticsAPI.exportAnalytics(type, format, startDate, endDate);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `analytics_${type}_${new Date().toISOString().split('T')[0]}.${format}`;
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to export analytics';
      setError(errorMessage);
      throw error;
    } finally {
      setIsExporting(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized computed analytics
  const computedAnalytics = useMemo(() => {
    if (!overview) return null;

    const revenueGrowth = overview.revenueGrowth || 0;
    const orderGrowth = overview.orderGrowth || 0;
    const customerGrowth = overview.customerGrowth || 0;

    const performance = {
      revenue: {
        value: overview.totalRevenue,
        growth: revenueGrowth,
        trend: revenueGrowth >= 0 ? 'up' : 'down',
      },
      orders: {
        value: overview.totalOrders,
        growth: orderGrowth,
        trend: orderGrowth >= 0 ? 'up' : 'down',
      },
      products: {
        value: overview.totalProducts,
        growth: 0, // Not provided in overview
        trend: 'stable',
      },
      customers: {
        value: overview.totalCustomers,
        growth: customerGrowth,
        trend: customerGrowth >= 0 ? 'up' : 'down',
      },
    };

    return performance;
  }, [overview]);

  // Fetch all analytics data
  const fetchAllAnalytics = useCallback(async (timeframeParam?: 'day' | 'week' | 'month' | 'year') => {
    const effectiveTimeframe = timeframeParam || timeframe;
    
    await Promise.all([
      fetchOverview(effectiveTimeframe),
      fetchRevenueData(effectiveTimeframe),
      fetchProductPerformance(effectiveTimeframe),
      fetchCustomerAnalytics(effectiveTimeframe),
      fetchSalesChannels(effectiveTimeframe),
      fetchGeographicData(),
    ]);
  }, [
    timeframe,
    fetchOverview,
    fetchRevenueData,
    fetchProductPerformance,
    fetchCustomerAnalytics,
    fetchSalesChannels,
    fetchGeographicData,
  ]);

  return {
    overview,
    revenueData,
    productPerformance,
    customerAnalytics,
    salesChannels,
    geographicData,
    isLoading: isLoading || isExporting,
    error,
    timeframe,
    computedAnalytics,
    fetchOverview,
    fetchRevenueData,
    fetchProductPerformance,
    fetchCustomerAnalytics,
    fetchSalesChannels,
    fetchGeographicData,
    exportAnalytics,
    fetchAllAnalytics,
    setTimeframe,
    clearError,
  };
};