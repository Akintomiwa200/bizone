import { deliverySummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Camera, Signature, Download } from 'lucide-react'

export default function DeliveryProof() {
  const deliveredOrders = deliverySummaries.filter((delivery) => delivery.status === 'delivered')

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Camera className="h-5 w-5 text-green-500" />
          Proof of delivery
        </CardTitle>
        <CardDescription>
          Collect digital signatures, photos, and timestamps for compliance and dispute resolution.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveredOrders.map((delivery) => (
          <div
            key={delivery.id}
            className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">{delivery.id}</p>
              <p className="text-xs text-gray-500">Delivered by {delivery.rider} • {delivery.eta}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Signature className="h-4 w-4 text-gray-400" />
                Signed digitally by customer — stored in Bizone Vault.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-gray-200 text-gray-700">
                Preview photo
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download receipt
              </Button>
            </div>
          </div>
        ))}
        {deliveredOrders.length === 0 && (
          <div className="text-sm text-gray-500">No deliveries completed today.</div>
        )}
      </CardContent>
    </Card>
  )
}

