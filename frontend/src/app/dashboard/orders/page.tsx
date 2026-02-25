import OrderList from '@/components/orders/OrderList'
import OrderTimeline from '@/components/orders/OrderTimeline'
import OrderActions from '@/components/orders/OrderActions'
import { orderSummaries } from '@/utils/mock-data'
import { Order } from '@/types'

export default function OrdersPage() {
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
        <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">Monitor, fulfil, and recover orders across every Bizone channel.</p>
      </header>

      <OrderList />

      <section className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderActions />
        <OrderTimeline order={order} currentStatus={order.status} />
      </section>
    </div>
  )
}

