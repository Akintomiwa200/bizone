import { deliverySummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Navigation2, Clock, Activity } from 'lucide-react'

export default function LiveTracking() {
  const activeDeliveries = deliverySummaries.filter((delivery) => delivery.status === 'in-transit' || delivery.status === 'assigned')

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Navigation2 className="h-5 w-5 text-blue-500" />
          Live tracking
        </CardTitle>
        <Badge variant="secondary">GPS synced</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{delivery.pickup} → {delivery.dropoff}</p>
                <p className="text-xs text-gray-500">Rider • {delivery.rider}</p>
              </div>
              <Badge variant={delivery.status === 'in-transit' ? 'primary' : 'warning'}>
                {delivery.status.replace('-', ' ')}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="h-2 rounded-full bg-white border border-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: delivery.status === 'in-transit' ? '65%' : '35%' }}
                ></div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  ETA {delivery.eta}
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" />
                  {delivery.distanceKm} km remaining
                </span>
              </div>
            </div>
          </div>
        ))}
        {activeDeliveries.length === 0 && (
          <div className="text-sm text-gray-500">No active deliveries at the moment.</div>
        )}
      </CardContent>
    </Card>
  )
}

