export const parseCommand = (message) => {
    const text = message.trim().toLowerCase();

    // 1. Help Commands
    if (/^help$/i.test(text) || /what can i do/i.test(text) || /commands/i.test(text)) {
        return { intent: 'HELP' };
    }

    // 2. Balance Check
    if (/check account balance/i.test(text) || /^balance$/i.test(text) || /my wallet/i.test(text)) {
        return { intent: 'CHECK_BALANCE' };
    }

    // 3. Buy Product with Distance (e.g. "I want to buy yam within 10km radius" or "buy yam within 10km")
    const buyMatch = text.match(/buy\s+(.+?)\s+within\s+(\d+)\s*(km|m)/i);
    if (buyMatch) {
        const item = buyMatch[1].trim();
        const distanceStr = buyMatch[2];
        const unit = buyMatch[3].toLowerCase();

        // Convert to meters for MongoDB $geoNear
        let radiusInMeters = parseInt(distanceStr, 10);
        if (unit === 'km') {
            radiusInMeters *= 1000;
        }

        return {
            intent: 'MATCH_PRODUCT',
            data: {
                item,
                distanceInMeters: radiusInMeters,
                originalDistance: `\${distanceStr}\${unit}\`
      }
    };
  }

  // 4. Sell Product (e.g., "sell yam for 5000") - Farmer specific
  const sellMatch = text.match(/sell\s+(.+?)\s+for\s+(\d+)/i);
  if (sellMatch) {
    return {
      intent: 'SELL_PRODUCT',
      data: {
        item: sellMatch[1].trim(),
        price: parseInt(sellMatch[2], 10)
      }
    };
  }

  // 5. View Products (Farmer specific)
  if (/my products/i.test(text) || /view products/i.test(text)) {
    return { intent: 'VIEW_PRODUCTS' };
  }

  // 6. Negotiate / Offer (e.g., "offer 5000")
  const negotiateMatch = text.match(/^offer\s+(\d+)/i);
  if (negotiateMatch) {
    return {
      intent: 'MAKE_OFFER',
      data: { amount: parseInt(negotiateMatch[1], 10) }
    };
  }

  // 7. Accept/Reject Offer
  const acceptOfferMatch = text.match(/^accept offer\s+(\w+)/i);
  if (acceptOfferMatch) {
    return { intent: 'ACCEPT_OFFER', data: { offerId: acceptOfferMatch[1] } };
  }
  const rejectOfferMatch = text.match(/^reject offer\s+(\w+)/i);
  if (rejectOfferMatch) {
    return { intent: 'REJECT_OFFER', data: { offerId: rejectOfferMatch[1] } };
  }

  // 8. Orders Management
  if (/my orders/i.test(text) || /view orders/i.test(text)) {
    return { intent: 'VIEW_ORDERS' };
  }

  // 9. Track Order
  const trackOrderMatch = text.match(/track order\s+(\w+)/i);
  if (trackOrderMatch) {
    return { intent: 'TRACK_ORDER', data: { orderId: trackOrderMatch[1] } };
  }

  // 10. Update Location
  if (/update location/i.test(text) || /^location$/i.test(text)) {
    return { intent: 'UPDATE_LOCATION' };
  }

  // 11. Generate Report
  if (/generate report/i.test(text) || /my analytics/i.test(text)) {
    return { intent: 'GENERATE_REPORT' };
  }

  // 12. Generate Receipt
  const receiptMatch = text.match(/receipt\s+for\s+order\s+(\w+)/i);
  if (receiptMatch) {
    return {
      intent: 'GENERATE_RECEIPT',
      data: { orderId: receiptMatch[1] }
    };
  }

  // 13. Confirm Delivery (Delivery specific or Buyer specific)
  const confirmDeliveryMatch = text.match(/confirm delivery\s+(\w+)/i) || text.match(/complete delivery\s+(\w+)/i);
  if (confirmDeliveryMatch) {
    return {
      intent: 'CONFIRM_DELIVERY',
      data: { orderId: confirmDeliveryMatch[1] }
    };
  }

  // 14. Cancel Order
  const cancelOrderMatch = text.match(/cancel order\s+(\w+)/i);
  if (cancelOrderMatch) {
    return {
      intent: 'CANCEL_ORDER',
      data: { orderId: cancelOrderMatch[1] }
    };
  }

  // 15. Simple Buy query without distance (e.g. "buy yam")
  const simpleBuyMatch = text.match(/^buy\s+(.+)$/i);
  if (simpleBuyMatch && !text.includes('within')) {
    return {
      intent: 'MATCH_PRODUCT',
      data: {
        item: simpleBuyMatch[1].trim(),
        distanceInMeters: 50000, // Default 50km
        originalDistance: '50km'
      }
    };
  }

  // Fallback
  return { intent: 'UNKNOWN', text: message.trim() };
};

export default { parseCommand };
