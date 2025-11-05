// Delivery status configurations and tracking

export interface DeliveryStatus {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: 'scheduled' | 'active' | 'in_progress' | 'completed' | 'failed';
  isActive: boolean;
  canEdit: boolean;
  nextPossibleStatuses: string[];
  actions: string[];
  notifications: {
    customer: boolean;
    driver: boolean;
    admin: boolean;
    template?: string;
  };
  estimatedDuration?: number; // in minutes
}

export const DELIVERY_STATUSES: { [key: string]: DeliveryStatus } = {
  scheduled: {
    id: 'scheduled',
    name: 'Scheduled',
    description: 'Delivery has been scheduled for a future time',
    color: 'blue',
    icon: 'calendar',
    category: 'scheduled',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['assigned', 'cancelled'],
    actions: ['assign', 'cancel', 'reschedule'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'delivery_scheduled',
    },
  },
  assigned: {
    id: 'assigned',
    name: 'Assigned',
    description: 'Delivery has been assigned to a driver',
    color: 'indigo',
    icon: 'user-check',
    category: 'active',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['driver_accepted', 'driver_rejected', 'cancelled'],
    actions: ['track_driver', 'reassign', 'cancel'],
    notifications: {
      customer: true,
      driver: true,
      admin: false,
      template: 'delivery_assigned',
    },
  },
  driver_accepted: {
    id: 'driver_accepted',
    name: 'Driver Accepted',
    description: 'Driver has accepted the delivery assignment',
    color: 'green',
    icon: 'check-circle',
    category: 'active',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['en_route_to_pickup', 'cancelled'],
    actions: ['track_driver', 'contact_driver'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'driver_accepted',
    },
  },
  driver_rejected: {
    id: 'driver_rejected',
    name: 'Driver Rejected',
    description: 'Driver has rejected the delivery assignment',
    color: 'red',
    icon: 'x-circle',
    category: 'scheduled',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['assigned', 'cancelled'],
    actions: ['reassign', 'cancel'],
    notifications: {
      customer: false,
      driver: false,
      admin: true,
      template: 'driver_rejected',
    },
  },
  en_route_to_pickup: {
    id: 'en_route_to_pickup',
    name: 'En Route to Pickup',
    description: 'Driver is on the way to pickup location',
    color: 'orange',
    icon: 'navigation',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['arrived_at_pickup', 'delayed'],
    actions: ['track_driver', 'contact_driver'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'en_route_pickup',
    },
    estimatedDuration: 30,
  },
  arrived_at_pickup: {
    id: 'arrived_at_pickup',
    name: 'Arrived at Pickup',
    description: 'Driver has arrived at the pickup location',
    color: 'teal',
    icon: 'map-pin',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['picked_up', 'pickup_failed'],
    actions: ['contact_driver', 'verify_pickup'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'arrived_pickup',
    },
  },
  picked_up: {
    id: 'picked_up',
    name: 'Picked Up',
    description: 'Package has been picked up successfully',
    color: 'green',
    icon: 'package',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['en_route_to_delivery', 'delayed'],
    actions: ['track_driver', 'contact_driver'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'picked_up',
    },
  },
  pickup_failed: {
    id: 'pickup_failed',
    name: 'Pickup Failed',
    description: 'Failed to pickup the package',
    color: 'red',
    icon: 'x',
    category: 'failed',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['rescheduled', 'cancelled'],
    actions: ['reschedule', 'cancel'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'pickup_failed',
    },
  },
  en_route_to_delivery: {
    id: 'en_route_to_delivery',
    name: 'En Route to Delivery',
    description: 'Driver is on the way to delivery location',
    color: 'orange',
    icon: 'navigation',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['arrived_at_delivery', 'delayed'],
    actions: ['track_driver', 'contact_driver'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'en_route_delivery',
    },
    estimatedDuration: 45,
  },
  arrived_at_delivery: {
    id: 'arrived_at_delivery',
    name: 'Arrived at Delivery',
    description: 'Driver has arrived at the delivery location',
    color: 'teal',
    icon: 'map-pin',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['delivered', 'delivery_failed'],
    actions: ['contact_driver', 'verify_delivery'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'arrived_delivery',
    },
  },
  delivered: {
    id: 'delivered',
    name: 'Delivered',
    description: 'Package has been delivered successfully',
    color: 'green',
    icon: 'check-circle',
    category: 'completed',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: [],
    actions: ['view_proof', 'rate_delivery'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'delivered',
    },
  },
  delivery_failed: {
    id: 'delivery_failed',
    name: 'Delivery Failed',
    description: 'Failed to deliver the package',
    color: 'red',
    icon: 'x',
    category: 'failed',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['rescheduled', 'returned_to_sender'],
    actions: ['reschedule', 'return'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'delivery_failed',
    },
  },
  delayed: {
    id: 'delayed',
    name: 'Delayed',
    description: 'Delivery is experiencing delays',
    color: 'yellow',
    icon: 'clock',
    category: 'in_progress',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['en_route_to_pickup', 'en_route_to_delivery', 'cancelled'],
    actions: ['update_eta', 'contact_driver'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'delivery_delayed',
    },
  },
  rescheduled: {
    id: 'rescheduled',
    name: 'Rescheduled',
    description: 'Delivery has been rescheduled',
    color: 'blue',
    icon: 'calendar',
    category: 'scheduled',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['assigned', 'cancelled'],
    actions: ['assign', 'cancel'],
    notifications: {
      customer: true,
      driver: false,
      admin: false,
      template: 'delivery_rescheduled',
    },
  },
  returned_to_sender: {
    id: 'returned_to_sender',
    name: 'Returned to Sender',
    description: 'Package is being returned to sender',
    color: 'gray',
    icon: 'rotate-ccw',
    category: 'completed',
    isActive: true,
    canEdit: true,
    nextPossibleStatuses: ['returned'],
    actions: ['track_return'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'returned_to_sender',
    },
  },
  returned: {
    id: 'returned',
    name: 'Returned',
    description: 'Package has been returned to sender',
    color: 'gray',
    icon: 'package',
    category: 'completed',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: [],
    actions: ['process_refund'],
    notifications: {
      customer: true,
      driver: false,
      admin: true,
      template: 'returned',
    },
  },
  cancelled: {
    id: 'cancelled',
    name: 'Cancelled',
    description: 'Delivery has been cancelled',
    color: 'gray',
    icon: 'x',
    category: 'failed',
    isActive: false,
    canEdit: false,
    nextPossibleStatuses: [],
    actions: ['process_refund'],
    notifications: {
      customer: true,
      driver: true,
      admin: true,
      template: 'delivery_cancelled',
    },
  },
};

// Delivery status workflows
export const DELIVERY_WORKFLOWS = {
  STANDARD_DELIVERY: [
    'scheduled',
    'assigned',
    'driver_accepted',
    'en_route_to_pickup',
    'arrived_at_pickup',
    'picked_up',
    'en_route_to_delivery',
    'arrived_at_delivery',
    'delivered',
  ],
  EXPRESS_DELIVERY: [
    'scheduled',
    'assigned',
    'driver_accepted',
    'en_route_to_pickup',
    'picked_up',
    'en_route_to_delivery',
    'delivered',
  ],
  PICKUP_ONLY: [
    'scheduled',
    'assigned',
    'driver_accepted',
    'en_route_to_pickup',
    'arrived_at_pickup',
    'picked_up',
  ],
};

// Delivery status helpers
export const getDeliveryStatus = (statusId: string): DeliveryStatus => {
  return DELIVERY_STATUSES[statusId] || DELIVERY_STATUSES.scheduled;
};

export const getNextPossibleDeliveryStatuses = (currentStatus: string): DeliveryStatus[] => {
  const status = getDeliveryStatus(currentStatus);
  return status.nextPossibleStatuses.map(getDeliveryStatus);
};

export const canChangeDeliveryStatus = (currentStatus: string, newStatus: string): boolean => {
  const status = getDeliveryStatus(currentStatus);
  return status.nextPossibleStatuses.includes(newStatus);
};

export const getDeliveryStatusColor = (statusId: string): string => {
  return getDeliveryStatus(statusId).color;
};

export const getDeliveryStatusIcon = (statusId: string): string => {
  return getDeliveryStatus(statusId).icon;
};

export const isDeliveryCompleted = (statusId: string): boolean => {
  const status = getDeliveryStatus(statusId);
  return status.category === 'completed';
};

export const isDeliveryActive = (statusId: string): boolean => {
  const status = getDeliveryStatus(statusId);
  return status.isActive;
};

// Delivery tracking events
export interface DeliveryTrackingEvent {
  status: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  description: string;
  driver?: string;
  metadata?: Record<string, any>;
}

export const createDeliveryTrackingEvent = (
  status: string,
  description: string,
  location?: { latitude: number; longitude: number; address?: string },
  driver?: string,
  metadata?: Record<string, any>
): DeliveryTrackingEvent => {
  return {
    status,
    timestamp: new Date().toISOString(),
    location,
    description,
    driver,
    metadata,
  };
};

// Delivery ETA calculations
export const calculateETA = (
  currentStatus: string,
  distance: number, // in kilometers
  trafficConditions: 'low' | 'medium' | 'high' = 'medium'
): number => {
  const baseSpeed = {
    low: 40, // km/h
    medium: 25, // km/h
    high: 15, // km/h
  };

  const speed = baseSpeed[trafficConditions];
  const travelTime = (distance / speed) * 60; // in minutes

  // Add buffer based on current status
  const statusBuffer = {
    en_route_to_pickup: 10,
    en_route_to_delivery: 15,
    arrived_at_pickup: 5,
    arrived_at_delivery: 5,
    default: 0,
  };

  const buffer = statusBuffer[currentStatus as keyof typeof statusBuffer] || statusBuffer.default;

  return Math.ceil(travelTime + buffer);
};

// Delivery priority levels
export const DELIVERY_PRIORITY = {
  LOW: {
    level: 1,
    name: 'Low',
    color: 'gray',
    description: 'Standard delivery within 3-5 business days',
    sla: 5 * 24 * 60, // 5 days in minutes
  },
  STANDARD: {
    level: 2,
    name: 'Standard',
    color: 'blue',
    description: 'Regular delivery within 1-2 business days',
    sla: 2 * 24 * 60, // 2 days in minutes
  },
  HIGH: {
    level: 3,
    name: 'High',
    color: 'orange',
    description: 'Priority delivery within 24 hours',
    sla: 24 * 60, // 24 hours in minutes
  },
  URGENT: {
    level: 4,
    name: 'Urgent',
    color: 'red',
    description: 'Express delivery within 4-6 hours',
    sla: 6 * 60, // 6 hours in minutes
  },
};

export type DeliveryStatusType = keyof typeof DELIVERY_STATUSES;
export type DeliveryPriority = keyof typeof DELIVERY_PRIORITY;