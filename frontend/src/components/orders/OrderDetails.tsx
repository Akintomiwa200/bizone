import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Order } from '@/types';

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Order Details — {order.orderId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="text-sm font-medium">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-sm font-medium capitalize">{order.status}</p>
              <p className="text-sm text-gray-600 capitalize">{order.fulfillment}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">₦{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₦{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}