import { socketService } from './socket';
import { SOCKET_EVENTS, SocketEventMap } from './events';

export class SocketHandlers {
  private static instance: SocketHandlers;

  public static getInstance(): SocketHandlers {
    if (!SocketHandlers.instance) {
      SocketHandlers.instance = new SocketHandlers();
    }
    return SocketHandlers.instance;
  }

  // Order handlers
  onOrderCreated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.ORDER_CREATED]) => void): void {
    socketService.on(SOCKET_EVENTS.ORDER_CREATED, handler);
  }

  onOrderUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.ORDER_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.ORDER_UPDATED, handler);
  }

  onOrderStatusChanged(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.ORDER_STATUS_CHANGED]) => void): void {
    socketService.on(SOCKET_EVENTS.ORDER_STATUS_CHANGED, handler);
  }

  // Delivery handlers
  onDeliveryCreated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.DELIVERY_CREATED]) => void): void {
    socketService.on(SOCKET_EVENTS.DELIVERY_CREATED, handler);
  }

  onDeliveryUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.DELIVERY_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.DELIVERY_UPDATED, handler);
  }

  onDeliveryStatusChanged(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.DELIVERY_STATUS_CHANGED]) => void): void {
    socketService.on(SOCKET_EVENTS.DELIVERY_STATUS_CHANGED, handler);
  }

  onDeliveryLocationUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.DELIVERY_LOCATION_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.DELIVERY_LOCATION_UPDATED, handler);
  }

  // Payment handlers
  onPaymentCreated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.PAYMENT_CREATED]) => void): void {
    socketService.on(SOCKET_EVENTS.PAYMENT_CREATED, handler);
  }

  onPaymentUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.PAYMENT_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.PAYMENT_UPDATED, handler);
  }

  onPaymentStatusChanged(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.PAYMENT_STATUS_CHANGED]) => void): void {
    socketService.on(SOCKET_EVENTS.PAYMENT_STATUS_CHANGED, handler);
  }

  // Chat handlers
  onChatMessage(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.CHAT_MESSAGE]) => void): void {
    socketService.on(SOCKET_EVENTS.CHAT_MESSAGE, handler);
  }

  onChatTyping(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.CHAT_TYPING]) => void): void {
    socketService.on(SOCKET_EVENTS.CHAT_TYPING, handler);
  }

  onChatRead(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.CHAT_READ]) => void): void {
    socketService.on(SOCKET_EVENTS.CHAT_READ, handler);
  }

  // Notification handlers
  onNotificationCreated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.NOTIFICATION_CREATED]) => void): void {
    socketService.on(SOCKET_EVENTS.NOTIFICATION_CREATED, handler);
  }

  onNotificationRead(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.NOTIFICATION_READ]) => void): void {
    socketService.on(SOCKET_EVENTS.NOTIFICATION_READ, handler);
  }

  // Business handlers
  onBusinessStatsUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.BUSINESS_STATS_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.BUSINESS_STATS_UPDATED, handler);
  }

  onBusinessSettingsUpdated(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.BUSINESS_SETTINGS_UPDATED]) => void): void {
    socketService.on(SOCKET_EVENTS.BUSINESS_SETTINGS_UPDATED, handler);
  }

  // System handlers
  onUserOnline(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.USER_ONLINE]) => void): void {
    socketService.on(SOCKET_EVENTS.USER_ONLINE, handler);
  }

  onUserOffline(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.USER_OFFLINE]) => void): void {
    socketService.on(SOCKET_EVENTS.USER_OFFLINE, handler);
  }

  onConnectionError(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.CONNECTION_ERROR]) => void): void {
    socketService.on(SOCKET_EVENTS.CONNECTION_ERROR, handler);
  }

  onReconnectAttempt(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.RECONNECT_ATTEMPT]) => void): void {
    socketService.on(SOCKET_EVENTS.RECONNECT_ATTEMPT, handler);
  }

  onReconnectSuccess(handler: (data: SocketEventMap[typeof SOCKET_EVENTS.RECONNECT_SUCCESS]) => void): void {
    socketService.on(SOCKET_EVENTS.RECONNECT_SUCCESS, handler);
  }

  // Remove all handlers
  removeAllHandlers(): void {
    Object.values(SOCKET_EVENTS).forEach(event => {
      socketService.off(event);
    });
  }
}

export const socketHandlers = SocketHandlers.getInstance();