import OrderDetails from '@/components/orders/OrderDetails';
import OrderTimeline from '@/components/orders/OrderTimeline';
import { orderSummaries } from '@/utils/mock-data';
import { Order } from '@/types';

export default function CustomerOrderPage() {
  // In a real app, you'd fetch this based on order ID from URL params
  const order = orderSummaries[0] as Order;
  
  if (!order) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order not found</h1>
        <p className="text-gray-500 mt-2">Please check your order ID and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Track your order</h1>
        <p className="text-sm text-gray-500">
          Real-time updates from payment confirmation to doorstep delivery.
        </p>
      </header>

      <OrderDetails order={order} />
      <OrderTimeline order={order} currentStatus={order.status} />
    </div>
  );
}