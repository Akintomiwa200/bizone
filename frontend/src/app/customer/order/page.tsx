import OrderDetails from '@/components/orders/OrderDetails'
import OrderTimeline from '@/components/orders/OrderTimeline'

export default function CustomerOrderPage() {
  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Track your order</h1>
        <p className="text-sm text-gray-500">Real-time updates from payment confirmation to doorstep delivery.</p>
      </header>

      <OrderDetails />
      <OrderTimeline />
    </div>
  )
}

