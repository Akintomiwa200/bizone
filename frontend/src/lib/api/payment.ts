import { apiClient } from './client';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: 'card' | 'transfer' | 'cash' | 'wallet';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  reference: string;
  provider: 'paystack' | 'flutterwave' | 'stripe' | 'cash';
  providerReference?: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentInitiateData {
  orderId: string;
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  metadata?: any;
}

export interface PaymentVerificationData {
  reference: string;
  provider: string;
}

export interface PaymentStats {
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  averageTransactionValue: number;
}

export const paymentAPI = {
  async initiatePayment(data: PaymentInitiateData): Promise<{
    authorizationUrl: string;
    reference: string;
    accessCode: string;
  }> {
    return await apiClient.post('/payments/initiate', data);
  },

  async verifyPayment(data: PaymentVerificationData): Promise<Payment> {
    return await apiClient.post<Payment>('/payments/verify', data);
  },

  async getPayments(
    page: number = 1,
    limit: number = 20,
    status?: Payment['status']
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    return await apiClient.get(`/payments?${params}`);
  },

  async getPayment(id: string): Promise<Payment> {
    return await apiClient.get<Payment>(`/payments/${id}`);
  },

  async refundPayment(paymentId: string, amount?: number): Promise<Payment> {
    return await apiClient.post<Payment>(`/payments/${paymentId}/refund`, {
      amount,
    });
  },

  async getPaymentStats(timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<PaymentStats> {
    return await apiClient.get<PaymentStats>(`/payments/stats?timeframe=${timeframe}`);
  },

  async getPaymentMethods(): Promise<Array<{ id: string; name: string; isActive: boolean }>> {
    return await apiClient.get('/payments/methods');
  },
};