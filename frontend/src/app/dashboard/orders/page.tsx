import OrderList from '@/components/orders/OrderList'
import OrderTimeline from '@/components/orders/OrderTimeline'
import OrderActions from '@/components/orders/OrderActions'

export default function OrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">Monitor, fulfil, and recover orders across every Bizone channel.</p>
      </header>

      <OrderList />

      <section className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderActions />
        <OrderTimeline />
      </section>
    </div>
  )
}

