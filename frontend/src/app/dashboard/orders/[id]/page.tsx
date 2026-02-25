import OrderDetails from '@/components/orders/OrderDetails'
import OrderTimeline from '@/components/orders/OrderTimeline'
import OrderActions from '@/components/orders/OrderActions'
import { orderSummaries } from '@/utils/mock-data'
import { Order } from '@/types'

export default function OrderDetailsPage() {
  const summary = orderSummaries[0];
  const order: Order = summary ? {
    id: summary.id,
    orderId: summary.id,
    customer: {
      name: summary.customer,
      phone: '+234 800 000 0000',
    },
    status: summary.status as any,
    fulfillment: summary.fulfillment === 'digital' ? 'delivery' : summary.fulfillment,
    items: [
      { name: 'Sample Item', quantity: 1, price: summary.total }
    ],
    total: summary.total,
    createdAt: summary.createdAt,
  } : null as any;

  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Order Detail</h1>
        <p className="text-sm text-gray-500">Full audit trail across checkout, payments, logistics, and customer touch points.</p>
      </header>

      <OrderDetails order={order} />

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderActions />
        <OrderTimeline order={order} currentStatus={order.status} />
      </div>
    </div>
  )
}

