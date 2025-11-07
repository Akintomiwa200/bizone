import DeliveryAssignment from '@/components/delivery/DeliveryAssignment'
import RiderCard from '@/components/delivery/RiderCard'
import LiveTracking from '@/components/delivery/LiveTracking'
import { riderPerformances } from '@/utils/mock-data'

export default function RiderWorkspacePage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Rider Workspace</h1>
        <p className="text-sm text-gray-500">Monitor active deliveries, earnings targets, and performance insights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riderPerformances.map((rider) => (
          <RiderCard key={rider.id} rider={rider} />
        ))}
      </div>

      <DeliveryAssignment />
      <LiveTracking />
    </div>
  )
}