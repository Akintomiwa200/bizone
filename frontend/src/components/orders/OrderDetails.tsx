import { orderSummaries, OrderSummary, deliverySummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Truck, CreditCard, User, Package } from 'lucide-react'

interface OrderDetailsProps {
  order?: OrderSummary
}

export default function OrderDetails({ order = orderSummaries[0] }: OrderDetailsProps) {
  const delivery = deliverySummaries.find((item) => item.id.includes(order.id.slice(-2))) || deliverySummaries[0]

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Order {order.id}</CardTitle>
        <CardDescription>Consolidated details across commerce, payments, and logistics.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Customer</h3>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4" />
                {order.customer}
              </div>
              <div>Email: customer@bizone.africa</div>
              <div>Phone: +234 801 000 0000</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Payment</h3>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="h-4 w-4" />
                {order.paymentMethod.replace('-', ' ')}
              </div>
              <div>Amount • ₦{order.total.toLocaleString()}</div>
              <div>
                Status • <Badge variant={order.status === 'completed' ? 'success' : 'warning'}>{order.status}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fulfilment</h3>
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2 text-gray-700">
              <Truck className="h-4 w-4" />
              {order.fulfillment === 'delivery' ? 'Door delivery' : order.fulfillment === 'pickup' ? 'Store pickup' : 'Digital fulfilment'}
            </div>
            <div>Assigned rider • {delivery.rider}</div>
            <div>SLA • {delivery.eta}</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['Organic Yams (10kg)', 'Delivery insurance', 'Logistics fee'].map((item) => (
              <div key={item} className="rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-600 flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

