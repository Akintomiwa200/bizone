import { useState, useCallback, useMemo } from 'react';
import { paymentAPI, Payment, PaymentInitiateData, PaymentStats } from '@/lib/api/payment';
import { notificationService } from '@/lib/services/notification-service';

export interface UsePaymentReturn {
  payments: Payment[];
  currentPayment: Payment | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  paymentMethods: Array<{ id: string; name: string; isActive: boolean }>;
  initiatePayment: (data: PaymentInitiateData) => Promise<{ authorizationUrl: string; reference: string }>;
  verifyPayment: (reference: string, provider?: string) => Promise<Payment>;
  fetchPayments: (page?: number, limit?: number, status?: string) => Promise<void>;
  fetchPayment: (id: string) => Promise<void>;
  refundPayment: (paymentId: string, amount?: number) => Promise<void>;
  fetchPaymentStats: (timeframe?: 'day' | 'week' | 'month' | 'year') => Promise<PaymentStats>;
  fetchPaymentMethods: () => Promise<void>;
  clearError: () => void;
}

export const usePayment = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [paymentMethods, setPaymentMethods] = useState<Array<{ id: string; name: string; isActive: boolean }>>([]);

  const initiatePayment = useCallback(async (data: PaymentInitiateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentAPI.initiatePayment(data);
      notificationService.info('Payment Initiated', 'Redirecting to payment gateway...');
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to initiate payment';
      setError(errorMessage);
      notificationService.error('Payment Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyPayment = useCallback(async (reference: string, provider: string = 'paystack') => {
    setIsLoading(true);
    setError(null);
    try {
      const payment = await paymentAPI.verifyPayment({ reference, provider });
      
      if (payment.status === 'completed') {
        notificationService.success('Payment Successful', 'Your payment has been processed successfully.');
      } else if (payment.status === 'failed') {
        notificationService.error('Payment Failed', 'Your payment could not be processed.');
      }
      
      return payment;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to verify payment';
      setError(errorMessage);
      notificationService.error('Verification Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPayments = useCallback(async (page: number = 1, limit: number = 20, status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.getPayments(page, limit, status);
      setPayments(response.payments);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payments';
      setError(errorMessage);
      notificationService.error('Fetch Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPayment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const payment = await paymentAPI.getPayment(id);
      setCurrentPayment(payment);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment';
      setError(errorMessage);
      notificationService.error('Fetch Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refundPayment = useCallback(async (paymentId: string, amount?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await paymentAPI.refundPayment(paymentId, amount);
      notificationService.success('Refund Initiated', 'Payment refund has been processed successfully.');
      
      // Refresh the payment details
      await fetchPayment(paymentId);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to process refund';
      setError(errorMessage);
      notificationService.error('Refund Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchPayment]);

  const fetchPaymentStats = useCallback(async (timeframe: 'day' | 'week' | 'month' | 'year' = 'month') => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await paymentAPI.getPaymentStats(timeframe);
      return stats;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment statistics';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const methods = await paymentAPI.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch payment methods';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized payment statistics
  const paymentStats = useMemo(() => {
    const total = payments.length;
    const pending = payments.filter(payment => payment.status === 'pending').length;
    const processing = payments.filter(payment => payment.status === 'processing').length;
    const completed = payments.filter(payment => payment.status === 'completed').length;
    const failed = payments.filter(payment => payment.status === 'failed').length;
    const refunded = payments.filter(payment => payment.status === 'refunded').length;

    const totalRevenue = payments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const averageTransactionValue = completed > 0 ? totalRevenue / completed : 0;

    return {
      total,
      pending,
      processing,
      completed,
      failed,
      refunded,
      totalRevenue,
      averageTransactionValue,
    };
  }, [payments]);

  return {
    payments,
    currentPayment,
    isLoading,
    error,
    pagination,
    paymentMethods,
    paymentStats,
    initiatePayment,
    verifyPayment,
    fetchPayments,
    fetchPayment,
    refundPayment,
    fetchPaymentStats,
    fetchPaymentMethods,
    clearError,
  };
};