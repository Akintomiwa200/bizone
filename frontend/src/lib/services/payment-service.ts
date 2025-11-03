import { paymentAPI } from '@/lib/api/payment';

export interface PaymentInitiationResult {
  success: boolean;
  authorizationUrl?: string;
  reference?: string;
  error?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  payment?: any;
  error?: string;
}

export class PaymentService {
  private static instance: PaymentService;

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async initiatePayment(orderId: string, amount: number, customer: {
    name: string;
    email: string;
    phone: string;
  }): Promise<PaymentInitiationResult> {
    try {
      const result = await paymentAPI.initiatePayment({
        orderId,
        amount,
        customer,
      });

      return {
        success: true,
        authorizationUrl: result.authorizationUrl,
        reference: result.reference,
      };
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Payment initiation failed',
      };
    }
  }

  async verifyPayment(reference: string, provider: string = 'paystack'): Promise<PaymentVerificationResult> {
    try {
      const payment = await paymentAPI.verifyPayment({
        reference,
        provider,
      });

      return {
        success: true,
        payment,
      };
    } catch (error: any) {
      console.error('Payment verification failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Payment verification failed',
      };
    }
  }

  async handleWebhook(payload: any, signature: string, provider: string = 'paystack'): Promise<boolean> {
    try {
      // Verify webhook signature
      const isValid = await this.verifyWebhookSignature(payload, signature, provider);
      if (!isValid) {
        return false;
      }

      // Process webhook based on provider and event type
      switch (provider) {
        case 'paystack':
          return await this.handlePaystackWebhook(payload);
        case 'flutterwave':
          return await this.handleFlutterwaveWebhook(payload);
        default:
          console.error('Unsupported payment provider:', provider);
          return false;
      }
    } catch (error) {
      console.error('Webhook handling failed:', error);
      return false;
    }
  }

  private async verifyWebhookSignature(payload: any, signature: string, provider: string): Promise<boolean> {
    // Implement webhook signature verification
    // This is a simplified version - in production, use proper signature verification
    return true;
  }

  private async handlePaystackWebhook(payload: any): Promise<boolean> {
    const event = payload.event;
    const data = payload.data;

    switch (event) {
      case 'charge.success':
        // Update order payment status
        await this.updatePaymentStatus(data.reference, 'paid', data);
        break;
      case 'charge.failed':
        await this.updatePaymentStatus(data.reference, 'failed', data);
        break;
      default:
        console.log('Unhandled Paystack event:', event);
    }

    return true;
  }

  private async handleFlutterwaveWebhook(payload: any): Promise<boolean> {
    const event = payload.event;
    const data = payload.data;

    switch (event) {
      case 'charge.completed':
        await this.updatePaymentStatus(data.tx_ref, 'paid', data);
        break;
      case 'charge.failed':
        await this.updatePaymentStatus(data.tx_ref, 'failed', data);
        break;
      default:
        console.log('Unhandled Flutterwave event:', event);
    }

    return true;
  }

  private async updatePaymentStatus(reference: string, status: string, data: any): Promise<void> {
    try {
      // Update payment status in your database
      // This would typically involve updating the order and payment records
      console.log(`Payment ${reference} updated to ${status}`, data);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<{ success: boolean; error?: string }> {
    try {
      await paymentAPI.refundPayment(paymentId, amount);
      return { success: true };
    } catch (error: any) {
      console.error('Refund failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Refund failed',
      };
    }
  }

  async getPaymentMethods(): Promise<Array<{ id: string; name: string; isActive: boolean }>> {
    try {
      return await paymentAPI.getPaymentMethods();
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
      return [];
    }
  }
}

export const paymentService = PaymentService.getInstance();