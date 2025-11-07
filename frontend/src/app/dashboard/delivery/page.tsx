import DeliveryAssignment from '@/components/delivery/DeliveryAssignment'
import LiveTracking from '@/components/delivery/LiveTracking'
import RouteOptimizer from '@/components/delivery/RouteOptimizer'

export default function DeliveryDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Delivery Operations</h1>
        <p className="text-sm text-gray-500">Manage last-mile fulfilment with AI routing, rider performance, and real-time tracking.</p>
      </header>

      <DeliveryAssignment />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <RouteOptimizer />
        <LiveTracking />
      </div>
    </div>
  )
}

