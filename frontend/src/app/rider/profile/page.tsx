import RiderCard from '@/components/delivery/RiderCard'
import DeliveryProof from '@/components/delivery/DeliveryProof'
import TrackingView from '@/components/delivery/TrackingView'
import { riderPerformances } from '@/utils/mock-data'

export default function RiderProfilePage() {
  const rider = riderPerformances[0]

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Rider Profile</h1>
        <p className="text-sm text-gray-500">Performance overview, compliance status, and current shift details.</p>
      </header>

      <RiderCard rider={rider} />
      <TrackingView />
      <DeliveryProof />
    </div>
  )
}

