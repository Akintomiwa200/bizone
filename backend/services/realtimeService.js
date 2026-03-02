export const realtimeService = {
  emitOrderCreated(io, order) {
    if (!io || !order) return;
    const businessId = order.business?._id || order.business;
    const payload = {
      type: 'order.created',
      timestamp: new Date().toISOString(),
      data: order
    };

    if (businessId) {
      io.to(`business-${businessId}`).emit('realtime:event', payload);
      io.to(`business-${businessId}`).emit('new-order', order); // legacy
    }
    io.emit('new_order', order); // legacy bot consumers
  },

  emitOrderUpdated(io, order) {
    if (!io || !order) return;
    const businessId = order.business?._id || order.business;
    const orderId = order._id || order.id;
    const payload = {
      type: 'order.updated',
      timestamp: new Date().toISOString(),
      data: order
    };

    if (businessId) {
      io.to(`business-${businessId}`).emit('realtime:event', payload);
      io.to(`business-${businessId}`).emit('order-updated', order); // legacy
    }
    if (orderId) {
      io.to(`order-${orderId}`).emit('realtime:event', payload);
      io.to(`order-${orderId}`).emit('status-changed', order); // legacy
    }
    io.emit('order_updated', order); // legacy bot consumers
  },

  emitDeliveryUpdated(io, delivery) {
    if (!io || !delivery) return;
    const businessId = delivery.business?._id || delivery.business;
    const deliveryId = delivery._id || delivery.id;
    const riderId = delivery.rider?._id || delivery.rider;
    const payload = {
      type: 'delivery.updated',
      timestamp: new Date().toISOString(),
      data: delivery
    };

    if (businessId) {
      io.to(`business-${businessId}`).emit('realtime:event', payload);
    }
    if (deliveryId) {
      io.to(`delivery-${deliveryId}`).emit('realtime:event', payload);
    }
    if (riderId) {
      io.to(`rider-${riderId}`).emit('realtime:event', payload);
    }
  },

  emitPaymentUpdated(io, order, paymentData = null) {
    if (!io || !order) return;
    const businessId = order.business?._id || order.business;
    const orderId = order._id || order.id;
    const payload = {
      type: 'payment.updated',
      timestamp: new Date().toISOString(),
      data: {
        order,
        payment: paymentData
      }
    };

    if (businessId) {
      io.to(`business-${businessId}`).emit('realtime:event', payload);
    }
    if (orderId) {
      io.to(`order-${orderId}`).emit('realtime:event', payload);
    }
  },

  emitWhatsAppMessage(io, businessId, message) {
    if (!io || !businessId || !message) return;
    const phoneRoom = message.from || message.to;
    const payload = {
      type: 'whatsapp.message',
      timestamp: new Date().toISOString(),
      data: message
    };

    io.to(`business-${businessId}`).emit('realtime:event', payload);
    io.to(`business-${businessId}`).emit('new_message', message); // legacy
    if (phoneRoom) {
      io.to(`chat-${businessId}-${phoneRoom}`).emit('realtime:event', payload);
    }
  },

  emitWhatsAppStatus(io, businessId, status) {
    if (!io || !businessId || !status) return;
    const payload = {
      type: 'whatsapp.status',
      timestamp: new Date().toISOString(),
      data: status
    };

    io.to(`business-${businessId}`).emit('realtime:event', payload);
  }
};

export default realtimeService;
