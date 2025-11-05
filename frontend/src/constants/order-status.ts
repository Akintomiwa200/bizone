// Order status configurations and workflows

export interface OrderStatus {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: 'pending' | 'confirmed' | 'processing' | 'fulfillment' | 'completed' | 'cancelled';
  isActive: boolean;
  canEdit: boolean;
  nextPossibleStatuses: string[];
  actions: string[];
  notifications: {
    customer: boolean;
    admin: boolean;
    template?: string;
  };
}

export const ORDER_STATUSES: { [key: string]: OrderStatus } = {
  pending: {
    id: 'pending',
    name: 'Pending',
    description: 'Order has been placed but not yet confirmed',
    color: 'yellow',
    icon: 'clock',
    category: 'pending',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['confirmed', 'cancelled'],
    actions: ['confirm', 'cancel', 'edit'],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_pending',
    },
  },
  confirmed: {
    id: 'confirmed',
    name: 'Confirmed',
    description: 'Order has been confirmed and is being processed',
    color: 'blue',
    icon: 'check-circle',
    category: 'confirmed',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['processing', 'cancelled'],
    actions: ['process', 'cancel', 'edit'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_confirmed',
    },
  },
  processing: {
    id: 'processing',
    name: 'Processing',
    description: 'Order is being prepared for shipment',
    color: 'indigo',
    icon: 'settings',
    category: 'processing',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['ready_for_pickup', 'shipped', 'cancelled'],
    actions: ['mark_ready', 'ship', 'cancel'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_processing',
    },
  },
  ready_for_pickup: {
    id: 'ready_for_pickup',
    name: 'Ready for Pickup',
    description: 'Order is ready for customer pickup',
    color: 'purple',
    icon: 'package',
    category: 'fulfillment',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['picked_up', 'cancelled'],
    actions: ['mark_picked_up', 'cancel'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_ready_pickup',
    },
  },
  picked_up: {
    id: 'picked_up',
    name: 'Picked Up',
    description: 'Customer has picked up the order',
    color: 'green',
    icon: 'check-square',
    category: 'completed',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: [],
    actions: [],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_picked_up',
    },
  },
  shipped: {
    id: 'shipped',
    name: 'Shipped',
    description: 'Order has been shipped to the customer',
    color: 'teal',
    icon: 'truck',
    category: 'fulfillment',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['in_transit', 'delivered', 'cancelled'],
    actions: ['track', 'mark_delivered'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_shipped',
    },
  },
  in_transit: {
    id: 'in_transit',
    name: 'In Transit',
    description: 'Order is on the way to the customer',
    color: 'orange',
    icon: 'truck',
    category: 'fulfillment',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['out_for_delivery', 'delivered'],
    actions: ['track', 'mark_delivered'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_in_transit',
    },
  },
  out_for_delivery: {
    id: 'out_for_delivery',
    name: 'Out for Delivery',
    description: 'Order is out for final delivery',
    color: 'red',
    icon: 'truck',
    category: 'fulfillment',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['delivered', 'delivery_failed'],
    actions: ['track', 'mark_delivered'],
    notifications: {
      customer: true,
      admin: false,
      template: 'order_out_for_delivery',
    },
  },
  delivered: {
    id: 'delivered',
    name: 'Delivered',
    description: 'Order has been successfully delivered',
    color: 'green',
    icon: 'check-circle',
    category: 'completed',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: ['returned'],
    actions: ['request_return'],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_delivered',
    },
  },
  delivery_failed: {
    id: 'delivery_failed',
    name: 'Delivery Failed',
    description: 'Delivery attempt was unsuccessful',
    color: 'red',
    icon: 'x-circle',
    category: 'fulfillment',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['out_for_delivery', 'returned_to_sender'],
    actions: ['reschedule', 'return'],
    notifications: {
      customer: true,
      admin: true,
      template: 'delivery_failed',
    },
  },
  returned_to_sender: {
    id: 'returned_to_sender',
    name: 'Returned to Sender',
    description: 'Order was returned to the sender',
    color: 'gray',
    icon: 'rotate-ccw',
    category: 'cancelled',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: ['refunded'],
    actions: ['refund'],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_returned',
    },
  },
  returned: {
    id: 'returned',
    name: 'Returned',
    description: 'Customer has returned the order',
    color: 'gray',
    icon: 'rotate-ccw',
    category: 'cancelled',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: ['refunded'],
    actions: ['refund'],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_returned',
    },
  },
  cancelled: {
    id: 'cancelled',
    name: 'Cancelled',
    description: 'Order has been cancelled',
    color: 'gray',
    icon: 'x',
    category: 'cancelled',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: ['refunded'],
    actions: ['refund'],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_cancelled',
    },
  },
  refunded: {
    id: 'refunded',
    name: 'Refunded',
    description: 'Order has been refunded',
    color: 'gray',
    icon: 'dollar-sign',
    category: 'cancelled',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: [],
    actions: [],
    notifications: {
      customer: true,
      admin: true,
      template: 'order_refunded',
    },
  },
};

// Order status workflows
export const ORDER_WORKFLOWS = {
  STANDARD_DELIVERY: [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'in_transit',
    'out_for_delivery',
    'delivered',
  ],
  PICKUP: [
    'pending',
    'confirmed',
    'processing',
    'ready_for_pickup',
    'picked_up',
  ],
  EXPRESS_DELIVERY: [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
  ],
};

// Order status helpers
export const getOrderStatus = (statusId: string): OrderStatus => {
  return ORDER_STATUSES[statusId] || ORDER_STATUSES.pending;
};

export const getNextPossibleStatuses = (currentStatus: string): OrderStatus[] => {
  const status = getOrderStatus(currentStatus);
  return status.nextPossibleStatuses.map(getOrderStatus);
};

export const canChangeStatus = (currentStatus: string, newStatus: string): boolean => {
  const status = getOrderStatus(currentStatus);
  return status.nextPossibleStatuses.includes(newStatus);
};

export const getStatusColor = (statusId: string): string => {
  return getOrderStatus(statusId).color;
};

export const getStatusIcon = (statusId: string): string => {
  return getOrderStatus(statusId).icon;
};

export const isFinalStatus = (statusId: string): boolean => {
  const status = getOrderStatus(statusId);
  return status.nextPossibleStatuses.length === 0;
};

export const isActiveStatus = (statusId: string): boolean => {
  return getOrderStatus(statusId).isActive;
};

// Order status categories
export const ORDER_STATUS_CATEGORIES = {
  pending: {
    name: 'Pending',
    description: 'Orders waiting for confirmation',
    statuses: ['pending'],
  },
  confirmed: {
    name: 'Confirmed',
    description: 'Orders that have been confirmed',
    statuses: ['confirmed'],
  },
  processing: {
    name: 'Processing',
    description: 'Orders being prepared',
    statuses: ['processing'],
  },
  fulfillment: {
    name: 'Fulfillment',
    description: 'Orders in delivery process',
    statuses: ['ready_for_pickup', 'shipped', 'in_transit', 'out_for_delivery'],
  },
  completed: {
    name: 'Completed',
    description: 'Successfully completed orders',
    statuses: ['picked_up', 'delivered'],
  },
  cancelled: {
    name: 'Cancelled',
    description: 'Cancelled or returned orders',
    statuses: ['cancelled', 'returned', 'returned_to_sender', 'refunded'],
  },
};

// Order timeline events
export interface OrderTimelineEvent {
  status: string;
  timestamp: string;
  description: string;
  actor?: string;
  metadata?: Record<string, any>;
}

export const createTimelineEvent = (
  status: string,
  description: string,
  actor?: string,
  metadata?: Record<string, any>
): OrderTimelineEvent => {
  return {
    status,
    timestamp: new Date().toISOString(),
    description,
    actor,
    metadata,
  };
};

// Order status change validations
export const validateStatusChange = (
  currentStatus: string,
  newStatus: string,
  orderData: any
): { isValid: boolean; message?: string } => {
  const current = getOrderStatus(currentStatus);
  const newStatusObj = getOrderStatus(newStatus);

  // Check if status change is allowed
  if (!current.nextPossibleStatuses.includes(newStatus)) {
    return {
      isValid: false,
      message: `Cannot change status from ${current.name} to ${newStatusObj.name}`,
    };
  }

  // Additional business logic validations
  if (newStatus === 'shipped' && !orderData.trackingNumber) {
    return {
      isValid: false,
      message: 'Tracking number is required before shipping',
    };
  }

  if (newStatus === 'delivered' && !orderData.deliveryProof) {
    return {
      isValid: false,
      message: 'Delivery proof is required before marking as delivered',
    };
  }

  return { isValid: true };
};

export type OrderStatusType = keyof typeof ORDER_STATUSES;
export type OrderWorkflowType = keyof typeof ORDER_WORKFLOWS;