import { riderPerformances } from '@/utils/mock-data'
import RiderCard from '@/components/delivery/RiderCard'
import DeliveryAssignment from '@/components/delivery/DeliveryAssignment'

export default function DeliveryRidersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Rider Performance</h1>
        <p className="text-sm text-gray-500">Coach and incentivize your riders with live metrics and earnings visibility.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riderPerformances.map((rider) => (
          <RiderCard key={rider.id} rider={rider} />
        ))}
      </div>

      <DeliveryAssignment />
    </div>
  )
}

