import { deliverySummaries, riderPerformances } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import RiderCard from './RiderCard'
import { Truck, Clock, Navigation } from 'lucide-react'

export default function DeliveryAssignment() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card className="border border-gray-200/70 shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Active deliveries
            </CardTitle>
            <Badge variant="secondary">Live routes</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {deliverySummaries.map((delivery) => (
              <div
                key={delivery.id}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {delivery.id}
                    <Badge variant={delivery.status === 'delivered' ? 'success' : delivery.status === 'delayed' ? 'error' : delivery.status === 'in-transit' ? 'primary' : 'warning'}>
                      {delivery.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{delivery.pickup} → {delivery.dropoff}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Clock className="h-3.5 w-3.5" />
                    ETA {delivery.eta}
                    <Navigation className="h-3.5 w-3.5" />
                    {delivery.distanceKm} km • ₦{delivery.fee.toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="text-sm text-gray-600">
                    Assigned to <span className="font-semibold text-gray-900">{delivery.rider}</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-200 text-gray-700">
                    Reassign
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border border-gray-200/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Top riders this week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riderPerformances.map((rider) => (
              <RiderCard key={rider.id} rider={rider} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

