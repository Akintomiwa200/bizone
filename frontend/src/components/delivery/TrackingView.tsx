import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { deliverySummaries } from '@/utils/mock-data'
import { CheckCircle2, Circle, Clock, Truck } from 'lucide-react'

const timeline = [
  {
    id: 1,
    title: 'Order placed',
    description: 'Customer confirmed payment via card checkout',
    time: '08:12',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Package ready',
    description: 'Warehouse completed quality check & sealed package',
    time: '08:45',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Rider picked up',
    description: 'Rider scanned QR code to confirm pickup',
    time: '09:05',
    status: 'completed'
  },
  {
    id: 4,
    title: 'En route',
    description: 'Navigating to customer via Ikoyi bridge',
    time: 'Live',
    status: 'current'
  },
  {
    id: 5,
    title: 'Delivered',
    description: 'Awaiting signature confirmation',
    time: 'Pending',
    status: 'upcoming'
  }
]

const statusIcon: Record<string, JSX.Element> = {
  completed: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  current: <Truck className="h-5 w-5 text-blue-500 animate-pulse" />,
  upcoming: <Circle className="h-5 w-5 text-gray-300" />
}

export default function TrackingView() {
  const activeDelivery = deliverySummaries[0]

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Delivery timeline — {activeDelivery.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-900">{activeDelivery.pickup} → {activeDelivery.dropoff}</p>
            <p>Rider • {activeDelivery.rider}</p>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>ETA {activeDelivery.eta}</span>
            <span>{activeDelivery.distanceKm} km remaining</span>
          </div>
        </div>

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                {statusIcon[item.status]}
                {index !== timeline.length - 1 && (
                  <span className="block w-px h-10 bg-gray-200 mt-1"></span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

