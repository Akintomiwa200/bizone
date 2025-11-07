import DeliveryMap from '@/components/delivery/DeliveryMap'
import RouteOptimizer from '@/components/delivery/RouteOptimizer'

export default function DeliveryZonesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Delivery Zones</h1>
        <p className="text-sm text-gray-500">Configure SLA expectations, dispatch coverage, and compliance per region.</p>
      </header>

      <DeliveryMap />
      <RouteOptimizer />
    </div>
  )
}

