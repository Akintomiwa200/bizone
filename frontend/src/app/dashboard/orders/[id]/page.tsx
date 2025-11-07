import OrderDetails from '@/components/orders/OrderDetails'
import OrderTimeline from '@/components/orders/OrderTimeline'
import OrderActions from '@/components/orders/OrderActions'

export default function OrderDetailsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Order Detail</h1>
        <p className="text-sm text-gray-500">Full audit trail across checkout, payments, logistics, and customer touch points.</p>
      </header>

      <OrderDetails />

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderActions />
        <OrderTimeline />
      </div>
    </div>
  )
}

