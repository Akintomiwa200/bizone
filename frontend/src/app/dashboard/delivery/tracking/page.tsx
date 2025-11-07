import TrackingView from '@/components/delivery/TrackingView'
import LiveTracking from '@/components/delivery/LiveTracking'

export default function DeliveryTrackingPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Live Tracking</h1>
        <p className="text-sm text-gray-500">Follow orders end-to-end with GPS updates, AI alerts, and proof of delivery.</p>
      </header>

      <TrackingView />
      <LiveTracking />
    </div>
  )
}

