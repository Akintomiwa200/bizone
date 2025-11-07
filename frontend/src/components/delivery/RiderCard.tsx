import { RiderPerformance } from '@/utils/mock-data'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MapPin, TrendingUp, Timer } from 'lucide-react'

interface RiderCardProps {
  rider: RiderPerformance
}

export default function RiderCard({ rider }: RiderCardProps) {
  const completionRate = Math.round((rider.completedDeliveries / (rider.weekTarget * 2)) * 100)

  return (
    <Card className="h-full border border-gray-200/70 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ${rider.photoColor} text-white font-semibold flex items-center justify-center`}>
              {rider.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{rider.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {rider.location}
              </p>
            </div>
          </div>
          <Badge variant="success">Rating {rider.rating.toFixed(1)}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Weekly target</p>
            <p className="text-lg font-semibold text-gray-900">{rider.weekTarget}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Completed</p>
            <p className="text-lg font-semibold text-gray-900">{rider.completedDeliveries}</p>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            {completionRate}% completion vs target
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-emerald-500" />
            Avg. delivery time 38 mins
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

