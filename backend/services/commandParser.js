/**
 * Command Parser Service for BizOne WhatsApp Bot
 * Parses user messages into structured intents with validation and enhanced features
 */

// Configuration constants
const COMMAND_CONFIG = {
    DEFAULT_DISTANCE_KM: 50,
    DEFAULT_DISTANCE_METERS: 50000,
    MIN_PRICE: 1,
    MAX_PRICE: 1000000000, // 1 Billion NGN
    MIN_DISTANCE: 1,
    MAX_DISTANCE_KM: 1000,
    SUPPORTED_UNITS: ['km', 'm'],
    REGEX_FLAGS: 'i'
};

// Intent types as constants
export const INTENTS = {
    HELP: 'HELP',
    CHECK_BALANCE: 'CHECK_BALANCE',
    MATCH_PRODUCT: 'MATCH_PRODUCT',
    SELL_PRODUCT: 'SELL_PRODUCT',
    VIEW_PRODUCTS: 'VIEW_PRODUCTS',
    MAKE_OFFER: 'MAKE_OFFER',
    ACCEPT_OFFER: 'ACCEPT_OFFER',
    REJECT_OFFER: 'REJECT_OFFER',
    VIEW_ORDERS: 'VIEW_ORDERS',
    TRACK_ORDER: 'TRACK_ORDER',
    UPDATE_LOCATION: 'UPDATE_LOCATION',
    GENERATE_REPORT: 'GENERATE_REPORT',
    GENERATE_RECEIPT: 'GENERATE_RECEIPT',
    CONFIRM_DELIVERY: 'CONFIRM_DELIVERY',
    CANCEL_ORDER: 'CANCEL_ORDER',
    RATE_SERVICE: 'RATE_SERVICE',
    CONTACT_SUPPORT: 'CONTACT_SUPPORT',
    VIEW_HISTORY: 'VIEW_HISTORY',
    UNKNOWN: 'UNKNOWN'
};

/**
 * Validates and sanitizes input strings
 * @private
 */
const sanitizeInput = (input) => {
    if (!input || typeof input !== 'string') return '';
    return input.trim().replace(/\s+/g, ' ');
};

/**
 * Validates numeric input within range
 * @private
 */
const validateNumber = (value, min, max, defaultValue) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < min || num > max) {
        return defaultValue;
    }
    return num;
};

/**
 * Main command parser function
 * @param {string} message - Raw user message
 * @returns {Object} Parsed intent with data
 */
export const parseCommand = (message) => {
    try {
        const text = sanitizeInput(message);
        if (!text) return { intent: INTENTS.UNKNOWN, error: 'Empty message' };

        // 1. Help Commands
        if (/^(help|what can i do|commands|menu|start|how to use)$/i.test(text)) {
            return { 
                intent: INTENTS.HELP,
                confidence: 1.0
            };
        }

        // 2. Balance Check
        if (/(check|show|view)?\s*(account)?\s*balance|my wallet|how much (do i have|money)/i.test(text)) {
            return { 
                intent: INTENTS.CHECK_BALANCE,
                confidence: 1.0
            };
        }

        // 3. Buy Product with Distance
        const buyWithDistanceMatch = text.match(/(?:i want to )?buy\s+(.+?)\s+(?:within|in|within a|in a)\s+(\d+)\s*(km|m)(?:\s+radius)?/i);
        if (buyWithDistanceMatch) {
            const item = buyWithDistanceMatch[1].trim();
            const distanceValue = validateNumber(
                buyWithDistanceMatch[2], 
                COMMAND_CONFIG.MIN_DISTANCE, 
                COMMAND_CONFIG.MAX_DISTANCE_KM,
                COMMAND_CONFIG.DEFAULT_DISTANCE_KM
            );
            const unit = buyWithDistanceMatch[3].toLowerCase();
            
            // Convert to meters for MongoDB $geoNear
            let radiusInMeters = distanceValue;
            if (unit === 'km') {
                radiusInMeters *= 1000;
            }

            return {
                intent: INTENTS.MATCH_PRODUCT,
                confidence: 1.0,
                data: {
                    item: item.substring(0, 100), // Limit item length
                    distanceInMeters: radiusInMeters,
                    originalDistance: `${distanceValue}${unit}`,
                    unit,
                    searchType: 'geospatial'
                }
            };
        }

        // 4. Sell Product with variations
        const sellMatch = text.match(/(?:i want to )?sell\s+(.+?)\s+(?:for|at|at price|for price)\s+(\d+)(?:\s*(?:ngn|naira))?/i);
        if (sellMatch) {
            const price = validateNumber(
                sellMatch[2], 
                COMMAND_CONFIG.MIN_PRICE, 
                COMMAND_CONFIG.MAX_PRICE,
                COMMAND_CONFIG.MIN_PRICE
            );

            return {
                intent: INTENTS.SELL_PRODUCT,
                confidence: 1.0,
                data: {
                    item: sellMatch[1].trim().substring(0, 100),
                    price,
                    currency: 'NGN',
                    action: 'list'
                }
            };
        }

        // 5. View Products (Farmer specific)
        if (/(?:show|view|list)\s+(?:my )?products|what (?:do )?i (?:have|sell)/i.test(text)) {
            return { 
                intent: INTENTS.VIEW_PRODUCTS,
                confidence: 1.0
            };
        }

        // 6. Negotiate / Make Offer with validation
        const offerMatch = text.match(/^(?:i )?offer\s+(\d+)(?:\s*(?:ngn|naira))?|(?:bid|propose)\s+(\d+)/i);
        if (offerMatch) {
            const amount = validateNumber(
                offerMatch[1] || offerMatch[2], 
                COMMAND_CONFIG.MIN_PRICE, 
                COMMAND_CONFIG.MAX_PRICE,
                COMMAND_CONFIG.MIN_PRICE
            );

            return {
                intent: INTENTS.MAKE_OFFER,
                confidence: 1.0,
                data: { 
                    amount,
                    currency: 'NGN',
                    timestamp: new Date().toISOString()
                }
            };
        }

        // 7. Accept/Reject Offer with validation
        const acceptOfferMatch = text.match(/accept\s+offer\s+(?:for\s+)?(\w+)/i);
        if (acceptOfferMatch) {
            return {
                intent: INTENTS.ACCEPT_OFFER,
                confidence: 1.0,
                data: { 
                    offerId: acceptOfferMatch[1].substring(0, 50),
                    action: 'accept'
                }
            };
        }

        const rejectOfferMatch = text.match(/reject\s+offer\s+(?:for\s+)?(\w+)/i);
        if (rejectOfferMatch) {
            return {
                intent: INTENTS.REJECT_OFFER,
                confidence: 1.0,
                data: { 
                    offerId: rejectOfferMatch[1].substring(0, 50),
                    action: 'reject'
                }
            };
        }

        // 8. Orders Management
        if (/(?:show|view|list)\s+(?:my )?orders|order (?:history|status)/i.test(text)) {
            return { 
                intent: INTENTS.VIEW_ORDERS,
                confidence: 1.0
            };
        }

        // 9. Track Order
        const trackOrderMatch = text.match(/(?:track|find|check)\s+order\s+(?:id\s+)?(\w+)/i);
        if (trackOrderMatch) {
            return {
                intent: INTENTS.TRACK_ORDER,
                confidence: 1.0,
                data: { 
                    orderId: trackOrderMatch[1].substring(0, 50)
                }
            };
        }

        // 10. Update Location
        if (/(?:update|set|change)\s+(?:my )?location|current location|share location/i.test(text)) {
            return { 
                intent: INTENTS.UPDATE_LOCATION,
                confidence: 1.0,
                requiresLocation: true
            };
        }

        // 11. Generate Report / Analytics
        if (/(?:generate|show|view)\s+(?:report|analytics|statistics|stats)|my (?:performance|sales)/i.test(text)) {
            return { 
                intent: INTENTS.GENERATE_REPORT,
                confidence: 1.0
            };
        }

        // 12. Generate Receipt
        const receiptMatch = text.match(/(?:get|generate|view)\s+receipt\s+(?:for|of)\s+order\s+(\w+)/i);
        if (receiptMatch) {
            return {
                intent: INTENTS.GENERATE_RECEIPT,
                confidence: 1.0,
                data: { 
                    orderId: receiptMatch[1].substring(0, 50),
                    format: 'text' // Can be extended to 'pdf', 'html'
                }
            };
        }

        // 13. Confirm Delivery
        const confirmDeliveryMatch = text.match(/(?:confirm|complete|mark as)\s+delivery\s+(?:of\s+)?(\w+)/i);
        if (confirmDeliveryMatch) {
            return {
                intent: INTENTS.CONFIRM_DELIVERY,
                confidence: 1.0,
                data: { 
                    orderId: confirmDeliveryMatch[1].substring(0, 50),
                    status: 'delivered'
                }
            };
        }

        // 14. Cancel Order
        const cancelOrderMatch = text.match(/(?:cancel|stop|void)\s+order\s+(?:id\s+)?(\w+)/i);
        if (cancelOrderMatch) {
            return {
                intent: INTENTS.CANCEL_ORDER,
                confidence: 1.0,
                data: { 
                    orderId: cancelOrderMatch[1].substring(0, 50),
                    reason: 'user_requested'
                }
            };
        }

        // 15. Rate Service
        const rateMatch = text.match(/rate\s+(?:service|order|delivery)\s+(\w+)\s+(\d+)(?:\s*\/\s*5)?/i);
        if (rateMatch) {
            const rating = validateNumber(rateMatch[2], 1, 5, 5);
            return {
                intent: INTENTS.RATE_SERVICE,
                confidence: 1.0,
                data: {
                    orderId: rateMatch[1].substring(0, 50),
                    rating,
                    maxRating: 5
                }
            };
        }

        // 16. Contact Support
        if (/(?:contact|call|message)\s+support|help (?:desk|line)|i need (?:help|assistance)/i.test(text)) {
            return {
                intent: INTENTS.CONTACT_SUPPORT,
                confidence: 1.0
            };
        }

        // 17. View History
        if (/(?:view|show|check)\s+(?:my )?history|past (?:transactions|orders)/i.test(text)) {
            return {
                intent: INTENTS.VIEW_HISTORY,
                confidence: 1.0,
                data: {
                    limit: 10,
                    sortBy: 'recent'
                }
            };
        }

        // 18. Simple Buy query without distance
        const simpleBuyMatch = text.match(/^buy\s+(.+?)(?:\s+(?:please|now|today))?$/i);
        if (simpleBuyMatch && !text.includes('within') && !text.includes('in ')) {
            return {
                intent: INTENTS.MATCH_PRODUCT,
                confidence: 0.8,
                data: {
                    item: simpleBuyMatch[1].trim().substring(0, 100),
                    distanceInMeters: COMMAND_CONFIG.DEFAULT_DISTANCE_METERS,
                    originalDistance: `${COMMAND_CONFIG.DEFAULT_DISTANCE_KM}km`,
                    searchType: 'default_radius'
                }
            };
        }

        // Fallback
        return { 
            intent: INTENTS.UNKNOWN, 
            text: text.substring(0, 500),
            confidence: 0.1
        };

    } catch (error) {
        console.error('Error parsing command:', error);
        return { 
            intent: INTENTS.UNKNOWN, 
            error: 'Parsing failed',
            originalMessage: message?.substring(0, 100)
        };
    }
};

/**
 * Extracts entities from message for UNKNOWN intents
 * @param {string} message - Raw message
 * @returns {Object} Extracted entities
 */
export const extractEntities = (message) => {
    const text = sanitizeInput(message);
    const entities = {
        numbers: [],
        possibleItems: [],
        locations: [],
        amounts: []
    };

    // Extract numbers
    const numbers = text.match(/\d+/g);
    if (numbers) {
        entities.numbers = numbers.map(Number);
    }

    // Extract currency amounts
    const amounts = text.match(/(?:₦|NGN|naira|#)\s*(\d+)/gi);
    if (amounts) {
        entities.amounts = amounts;
    }

    // Extract possible item names (words after certain keywords)
    const itemKeywords = ['buy', 'sell', 'order', 'for', 'get'];
    itemKeywords.forEach(keyword => {
        const regex = new RegExp(`${keyword}\\s+(\\w+)`, 'i');
        const match = text.match(regex);
        if (match) {
            entities.possibleItems.push(match[1]);
        }
    });

    return entities;
};

/**
 * Gets suggestions for UNKNOWN intents
 * @param {string} message - Raw message
 * @returns {Array} Suggested commands
 */
export const getSuggestions = (message) => {
    const text = message?.toLowerCase() || '';
    const suggestions = [];

    if (text.includes('buy')) {
        suggestions.push('Try: "buy yam within 10km"');
        suggestions.push('Try: "buy rice"');
    } else if (text.includes('sell')) {
        suggestions.push('Try: "sell yam for 5000"');
    } else if (text.includes('order')) {
        suggestions.push('Try: "track order ORD123"');
        suggestions.push('Try: "cancel order ORD123"');
    } else {
        suggestions.push('Try: "help" to see all commands');
        suggestions.push('Try: "balance" to check wallet');
        suggestions.push('Try: "buy yam" to find products');
    }

    return suggestions;
};

export default { 
    parseCommand, 
    extractEntities, 
    getSuggestions, 
    INTENTS 
};