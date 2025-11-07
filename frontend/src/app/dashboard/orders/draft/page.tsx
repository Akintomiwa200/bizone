import CreateOrder from '@/components/orders/CreateOrder'
import OrderActions from '@/components/orders/OrderActions'

export default function DraftOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Draft Orders</h1>
        <p className="text-sm text-gray-500">Finish incomplete checkouts and convert assisted sales into revenue.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <OrderActions />
        <CreateOrder />
      </div>
    </div>
  )
}

