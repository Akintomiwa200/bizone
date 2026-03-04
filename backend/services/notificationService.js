// Notification service for sending notifications via various channels
import User from '../models/User.js';
import { whatsappService } from './whatsappService.js';

export const notificationService = {
  // Send new order notification to business owner (WhatsApp when phone available)
  async sendNewOrderNotification(businessOwnerId, order) {
    try {
      const businessId = order.business?.toString?.() || order.business;
      const owner = await User.findById(businessOwnerId).select('phone').lean();
      if (owner?.phone && businessId) {
        await whatsappService.sendTextMessage(
          owner.phone,
          `📦 *New order* ${order.orderNumber}\nTotal: NGN ${(order.total || 0).toLocaleString()}\nPay when ready.`,
          businessId
        );
      }
      console.log(`New order notification sent to business owner: ${businessOwnerId}`, order.orderNumber);
      return true;
    } catch (error) {
      console.error('Error sending new order notification:', error);
      throw error;
    }
  },

  // Send order status update notification (WhatsApp when businessId available)
  async sendOrderStatusUpdate(customerPhone, order, options = {}) {
    try {
      const businessId = options.businessId || order.business?.toString?.() || order.business;
      if (customerPhone && businessId) {
        await whatsappService.sendTextMessage(
          customerPhone,
          `📦 Order *${order.orderNumber}* status: *${order.status}*`,
          businessId
        );
      }
      console.log(`Order status update sent to customer: ${customerPhone}`, order.status);
      return true;
    } catch (error) {
      console.error('Error sending order status update:', error);
      throw error;
    }
  },

  // Send delivery assignment notification to rider
  async sendDeliveryAssignment(riderPhone, delivery, options = {}) {
    try {
      const businessId = options.businessId || delivery.business?.toString?.() || delivery.business;
      if (riderPhone && businessId) {
        await whatsappService.sendTextMessage(
          riderPhone,
          `🚚 *New delivery* ${delivery.deliveryId}\nPickup and dropoff details in your dashboard.`,
          businessId
        );
      }
      console.log(`Delivery assignment sent to rider: ${riderPhone}`, delivery.deliveryId);
      return true;
    } catch (error) {
      console.error('Error sending delivery assignment:', error);
      throw error;
    }
  },

  // Send delivery status update to customer/business
  async sendDeliveryStatusUpdate(delivery, status, options = {}) {
    try {
      const businessId = options.businessId || delivery.business?.toString?.() || delivery.business;
      const customerPhone = delivery.dropoff?.contact?.phone || options.customerPhone;
      if (customerPhone && businessId) {
        await whatsappService.sendTextMessage(
          customerPhone,
          `🚚 Delivery *${delivery.deliveryId}* status: *${status}*`,
          businessId
        );
      }
      console.log(`Delivery status update: ${delivery.deliveryId} - ${status}`);
      return true;
    } catch (error) {
      console.error('Error sending delivery status update:', error);
      throw error;
    }
  }
};
