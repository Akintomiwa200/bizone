import CreateOrder from '@/components/orders/CreateOrder'
import OrderTimeline from '@/components/orders/OrderTimeline'

export default function CreateOrderPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Create Order</h1>
        <p className="text-sm text-gray-500">Capture phone, in-store, and wholesale orders with automatic inventory sync.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderTimeline />
        <CreateOrder />
      </div>
    </div>
  )
}

