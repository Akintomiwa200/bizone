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