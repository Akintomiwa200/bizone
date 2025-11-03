export const SOCKET_EVENTS = {
  // Order events
  ORDER_CREATED: 'order:created',
  ORDER_UPDATED: 'order:updated',
  ORDER_STATUS_CHANGED: 'order:status_changed',

  // Delivery events
  DELIVERY_CREATED: 'delivery:created',
  DELIVERY_UPDATED: 'delivery:updated',
  DELIVERY_STATUS_CHANGED: 'delivery:status_changed',
  DELIVERY_LOCATION_UPDATED: 'delivery:location_updated',

  // Payment events
  PAYMENT_CREATED: 'payment:created',
  PAYMENT_UPDATED: 'payment:updated',
  PAYMENT_STATUS_CHANGED: 'payment:status_changed',

  // Chat events
  CHAT_MESSAGE: 'chat:message',
  CHAT_TYPING: 'chat:typing',
  CHAT_READ: 'chat:read',

  // Notification events
  NOTIFICATION_CREATED: 'notification:created',
  NOTIFICATION_READ: 'notification:read',

  // Business events
  BUSINESS_STATS_UPDATED: 'business:stats_updated',
  BUSINESS_SETTINGS_UPDATED: 'business:settings_updated',

  // System events
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',
  CONNECTION_ERROR: 'connection:error',
  RECONNECT_ATTEMPT: 'reconnect:attempt',
  RECONNECT_SUCCESS: 'reconnect:success',
} as const;

export interface SocketEventMap {
  [SOCKET_EVENTS.ORDER_CREATED]: { order: any };
  [SOCKET_EVENTS.ORDER_UPDATED]: { order: any };
  [SOCKET_EVENTS.ORDER_STATUS_CHANGED]: { orderId: string; status: string };
  
  [SOCKET_EVENTS.DELIVERY_CREATED]: { delivery: any };
  [SOCKET_EVENTS.DELIVERY_UPDATED]: { delivery: any };
  [SOCKET_EVENTS.DELIVERY_STATUS_CHANGED]: { deliveryId: string; status: string };
  [SOCKET_EVENTS.DELIVERY_LOCATION_UPDATED]: { deliveryId: string; location: { lat: number; lng: number } };
  
  [SOCKET_EVENTS.PAYMENT_CREATED]: { payment: any };
  [SOCKET_EVENTS.PAYMENT_UPDATED]: { payment: any };
  [SOCKET_EVENTS.PAYMENT_STATUS_CHANGED]: { paymentId: string; status: string };
  
  [SOCKET_EVENTS.CHAT_MESSAGE]: { message: any; sessionId: string };
  [SOCKET_EVENTS.CHAT_TYPING]: { sessionId: string; isTyping: boolean };
  [SOCKET_EVENTS.CHAT_READ]: { sessionId: string; messageId: string };
  
  [SOCKET_EVENTS.NOTIFICATION_CREATED]: { notification: any };
  [SOCKET_EVENTS.NOTIFICATION_READ]: { notificationId: string };
  
  [SOCKET_EVENTS.BUSINESS_STATS_UPDATED]: { stats: any };
  [SOCKET_EVENTS.BUSINESS_SETTINGS_UPDATED]: { settings: any };
  
  [SOCKET_EVENTS.USER_ONLINE]: { userId: string };
  [SOCKET_EVENTS.USER_OFFLINE]: { userId: string };
  [SOCKET_EVENTS.CONNECTION_ERROR]: { error: string };
  [SOCKET_EVENTS.RECONNECT_ATTEMPT]: { attempt: number };
  [SOCKET_EVENTS.RECONNECT_SUCCESS]: void;
}