import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { orderSummaries } from '@/utils/mock-data'
import { CheckCircle2, Clock, Package2, Truck } from 'lucide-react'

const orderEvents = [
  {
    title: 'Order confirmed',
    description: 'Customer completed checkout on Bizone storefront',
    time: '08:41',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
  },
  {
    title: 'Items packaged',
    description: 'Warehouse scanned items into Bizone inventory',
    time: '08:58',
    icon: <Package2 className="h-5 w-5 text-blue-500" />
  },
  {
    title: 'Delivery dispatched',
    description: 'Rider picked up order and started Google Maps navigation',
    time: '09:14',
    icon: <Truck className="h-5 w-5 text-purple-500" />
  },
  {
    title: 'Delivered',
    description: 'Customer signed digitally and left a 5-star rating',
    time: '09:52',
    icon: <Clock className="h-5 w-5 text-amber-500" />
  }
]

export default function OrderTimeline() {
  const currentOrder = orderSummaries[0]

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Order timeline — {currentOrder.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
          <div className="font-semibold text-gray-900">{currentOrder.customer}</div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Status • {currentOrder.status}</span>
            <span>Fulfilment • {currentOrder.fulfillment}</span>
          </div>
        </div>
        <div className="space-y-4">
          {orderEvents.map((event, index) => (
            <div key={event.title} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                {event.icon}
                {index !== orderEvents.length - 1 && (
                  <span className="block w-px h-8 bg-gray-200 mt-1"></span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-500">{event.description}</p>
                <p className="text-xs text-gray-400 mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
import { Order, OrderStatus } from '@/types';

interface OrderTimelineProps {
  order: Order;
  currentStatus: OrderStatus;
}

const statusSteps: { key: OrderStatus; label: string; description: string }[] = [
  { key: 'pending', label: 'Order Placed', description: 'Customer has placed the order' },
  { key: 'confirmed', label: 'Confirmed', description: 'Business has confirmed the order' },
  { key: 'preparing', label: 'Preparing', description: 'Order is being prepared' },
  { key: 'ready', label: 'Ready', description: 'Order is ready for pickup' },
  { key: 'out-for-delivery', label: 'Out for Delivery', description: 'Rider is delivering order' },
  { key: 'delivered', label: 'Delivered', description: 'Order has been delivered' },
];

export default function OrderTimeline({ order, currentStatus }: OrderTimelineProps) {
  const currentIndex = statusSteps.findIndex(step => step.key === currentStatus);

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {statusSteps.map((step, stepIdx) => {
          const isCompleted = stepIdx < currentIndex;
          const isCurrent = stepIdx === currentIndex;
          const isUpcoming = stepIdx > currentIndex;

          return (
            <li key={step.key}>
              <div className="relative pb-8">
                {stepIdx !== statusSteps.length - 1 ? (
                  <span
                    className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                      isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                        isCompleted
                          ? 'bg-blue-600'
                          : isCurrent
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5 text-white" />
                      ) : isCurrent ? (
                        <span className="h-2.5 w-2.5 bg-white rounded-full" />
                      ) : (
                        <span className="h-2.5 w-2.5 bg-gray-300 rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                    {isCurrent && (
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        Current
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}