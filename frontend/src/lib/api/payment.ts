import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

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
  metadata?: unknown;
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
  metadata?: unknown;
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

export interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const toPayment = (input: {
  txRef: string;
  amount?: number;
  customer?: { name?: string; email?: string; phone?: string };
  status?: Payment['status'];
}): Payment => ({
  id: input.txRef,
  orderId: input.txRef,
  amount: input.amount || 0,
  currency: 'NGN',
  method: 'transfer',
  status: input.status || 'pending',
  reference: input.txRef,
  provider: 'flutterwave',
  providerReference: input.txRef,
  customer: {
    id: input.customer?.phone || input.txRef,
    name: input.customer?.name || 'Customer',
    email: input.customer?.email || '',
    phone: input.customer?.phone || '',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const paymentAPI = {
  async initiatePayment(data: PaymentInitiateData): Promise<{
    authorizationUrl: string;
    reference: string;
    accessCode: string;
  }> {
    const response = await apiClient.post<ApiEnvelope<{ paymentLink: string; txRef: string }>>('/payment/initialize', {
      orderId: data.orderId,
      customer: data.customer,
    });

    return {
      authorizationUrl: response.data.paymentLink,
      reference: response.data.txRef,
      accessCode: response.data.txRef,
    };
  },

  async verifyPayment(data: PaymentVerificationData): Promise<Payment> {
    const response = await apiClient.post<ApiEnvelope<unknown>>('/payment/verify', {
      txRef: data.reference,
    });

    const completed = response.success;
    return toPayment({
      txRef: data.reference,
      status: completed ? 'completed' : 'failed',
    });
  },

  async getPayments(page: number = 1, limit: number = 20, _status?: Payment['status']): Promise<PaymentsResponse> {
    return {
      payments: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  },

  async getPayment(id: string): Promise<Payment> {
    return toPayment({ txRef: id, status: 'pending' });
  },

  async refundPayment(paymentId: string, _amount?: number): Promise<Payment> {
    return toPayment({ txRef: paymentId, status: 'refunded' });
  },

  async getPaymentStats(_timeframe: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<PaymentStats> {
    return {
      totalRevenue: 0,
      successfulPayments: 0,
      failedPayments: 0,
      pendingPayments: 0,
      averageTransactionValue: 0,
    };
  },

  async getPaymentMethods(): Promise<Array<{ id: string; name: string; isActive: boolean }>> {
    return [
      { id: 'flutterwave', name: 'Flutterwave', isActive: true },
      { id: 'cash', name: 'Cash', isActive: true },
      { id: 'transfer', name: 'Bank Transfer', isActive: true },
    ];
  },
};
