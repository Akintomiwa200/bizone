import { deliveryZones } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Map, Target, Shield } from 'lucide-react'

export default function DeliveryMap() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-500" />
            Delivery coverage map
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Real-time dispatch zones with SLA commitments, rider capacity, and risk levels.
          </CardDescription>
        </div>
        <Badge variant="secondary">Live GPS</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 h-64 flex items-center justify-center text-sm text-gray-500">
          Interactive map placeholder — connect to Mapbox or Google Maps using Bizone API key.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deliveryZones.map((zone) => (
            <div key={zone.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">{zone.name}</p>
                <Badge variant={zone.risk === 'low' ? 'success' : zone.risk === 'medium' ? 'warning' : 'error'}>
                  {zone.risk} risk
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{zone.coverage}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5" />
                  {zone.riders} riders
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  SLA {zone.sla}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

