import { OrderSummary } from '@/utils/mock-data'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Truck, ClipboardList } from 'lucide-react'

interface OrderCardProps {
  order: OrderSummary
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.id}</p>
            <p className="text-xs text-gray-500">{order.createdAt}</p>
          </div>
          <Badge variant={order.status === 'completed' ? 'success' : order.status === 'shipped' ? 'secondary' : order.status === 'processing' ? 'primary' : order.status === 'pending' ? 'warning' : 'error'}>
            {order.status}
          </Badge>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-900">{order.customer}</p>
          <p className="capitalize">Fulfilment • {order.fulfillment}</p>
          <p>Payment • {order.paymentMethod.replace('-', ' ')}</p>
        </div>
        {order.eta && (
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-700 flex items-center gap-2">
            <Truck className="h-4 w-4" />
            {order.eta}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-gray-900">₦{order.total.toLocaleString()}</div>
          <Button size="sm" variant="outline" className="border-gray-200 text-gray-700">
            <ClipboardList className="h-4 w-4 mr-2" />
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

