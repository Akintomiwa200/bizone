import DeliveryAssignment from '@/components/delivery/DeliveryAssignment'
import DeliveryProof from '@/components/delivery/DeliveryProof'

export default function RiderDeliveriesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">My Deliveries</h1>
        <p className="text-sm text-gray-500">See current assignments, completed drop-offs, and proof of delivery.</p>
      </header>

      <DeliveryAssignment />
      <DeliveryProof />
    </div>
  )
}

