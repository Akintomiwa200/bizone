// WhatsApp message templates for automated notifications

export const messageTemplates = {
  // Order notifications
  orderReceived: (orderNumber, businessName) => {
    return `Hello! Your order *${orderNumber}* has been received by *${businessName}*. We're preparing it for you. Thank you for your order! 🛍️`;
  },

  orderConfirmed: (orderNumber, estimatedTime) => {
    return `Your order *${orderNumber}* has been confirmed! 📦\n\nExpected ready time: ${estimatedTime}\n\nWe'll notify you when your order is ready for pickup or delivery.`;
  },

  orderReady: (orderNumber) => {
    return `Great news! Your order *${orderNumber}* is ready! 🎉\n\nYou can now pick it up or it will be delivered to you shortly.`;
  },

  orderOutForDelivery: (orderNumber, riderName, riderPhone) => {
    return `Your order *${orderNumber}* is out for delivery! 🚚\n\nRider: ${riderName}\nPhone: ${riderPhone}\n\nYou can track your delivery in real-time.`;
  },

  orderDelivered: (orderNumber) => {
    return `Your order *${orderNumber}* has been delivered! ✅\n\nThank you for shopping with us. We hope you enjoy your purchase!\n\nPlease rate your experience to help us improve.`;
  },

  orderCancelled: (orderNumber, reason) => {
    return `We're sorry, but your order *${orderNumber}* has been cancelled. ❌\n\nReason: ${reason}\n\nIf you have any questions, please contact us.`;
  },

  // Payment notifications
  paymentReceived: (orderNumber, amount) => {
    return `Payment received! ✅\n\nOrder: *${orderNumber}*\nAmount: ₦${amount.toLocaleString()}\n\nThank you for your payment.`;
  },

  paymentFailed: (orderNumber, amount) => {
    return `Payment failed for order *${orderNumber}*. ❌\n\nAmount: ₦${amount.toLocaleString()}\n\nPlease try again or contact us for assistance.`;
  },

  paymentRefunded: (orderNumber, amount) => {
    return `Refund processed! 💰\n\nOrder: *${orderNumber}*\nAmount: ₦${amount.toLocaleString()}\n\nYour refund will be processed within 3-5 business days.`;
  },

  // Delivery notifications
  deliveryAssigned: (deliveryId, riderName, riderPhone) => {
    return `Delivery *${deliveryId}* has been assigned! 🚴\n\nRider: ${riderName}\nPhone: ${riderPhone}\n\nYour delivery is on the way!`;
  },

  deliveryPickedUp: (deliveryId, estimatedTime) => {
    return `Your delivery *${deliveryId}* has been picked up! 📦\n\nEstimated delivery time: ${estimatedTime}\n\nWe're on our way to you!`;
  },

  deliveryDelivered: (deliveryId) => {
    return `Delivery *${deliveryId}* completed! ✅\n\nThank you for using our delivery service. We hope everything arrived safely!`;
  },

  deliveryFailed: (deliveryId, reason) => {
    return `Delivery *${deliveryId}* was unsuccessful. ❌\n\nReason: ${reason}\n\nWe'll contact you shortly to reschedule.`;
  },

  // Customer service
  welcomeMessage: (customerName, businessName) => {
    return `Welcome to *${businessName}*! 👋\n\nHello ${customerName || 'there'}, we're excited to serve you. How can we help you today?`;
  },

  greeting: (customerName) => {
    return `Hello ${customerName || 'there'}! 👋\n\nHow can we assist you today?`;
  },

  helpMessage: () => {
    return `How can we help you? 💬\n\n• Place an order\n• Track your order\n• Check products\n• Contact support\n\nJust send us a message!`;
  },

  // Product notifications
  productAvailable: (productName, price) => {
    return `Good news! *${productName}* is now available! 🎉\n\nPrice: ₦${price.toLocaleString()}\n\nOrder now before it runs out!`;
  },

  lowStockAlert: (productName) => {
    return `*${productName}* is running low! ⚠️\n\nHurry and order now while stocks last!`;
  },

  // Promotional messages
  promotion: (title, description, discount) => {
    return `🎉 *Special Promotion!*\n\n${title}\n\n${description}\n\nDiscount: ${discount}%\n\nDon't miss out on this amazing offer!`;
  },

  newProduct: (productName, price, discount) => {
    return `🆕 *New Product Alert!*\n\n${productName}\n\nPrice: ₦${price.toLocaleString()}\n${discount ? `Special Price: ₦${(price * (1 - discount / 100)).toLocaleString()}` : ''}\n\nCheck it out now!`;
  }
};

// Format phone number for WhatsApp (remove + and spaces)
export const formatPhoneNumber = (phone) => {
  return phone.replace(/\D/g, '');
};

// Validate phone number
export const validatePhoneNumber = (phone) => {
  const cleaned = formatPhoneNumber(phone);
  // WhatsApp requires phone numbers in international format without +
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export default messageTemplates;

