// AI Chat intents and conversation patterns

export interface ChatIntent {
  id: string;
  name: string;
  description: string;
  patterns: string[];
  responses: {
    professional: string;
    friendly: string;
    casual: string;
  };
  actions: string[];
  entities: string[];
  confidenceThreshold: number;
  followUpQuestions: string[];
  requiresContext: boolean;
  category: 'greeting' | 'inquiry' | 'support' | 'transaction' | 'feedback' | 'general';
  priority: 'low' | 'medium' | 'high';
}

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: 'greeting',
    name: 'Greeting',
    description: 'User is greeting or starting a conversation',
    patterns: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'how are you', 'what\'s up', 'hey there', 'greetings'
    ],
    responses: {
      professional: 'Hello! Welcome to {{businessName}}. How may I assist you today?',
      friendly: 'Hi there! 👋 Welcome to {{businessName}}! How can I help you today?',
      casual: 'Hey! Welcome to {{businessName}}. What\'s up?'
    },
    actions: ['welcome_message', 'set_context'],
    entities: [],
    confidenceThreshold: 0.7,
    followUpQuestions: [
      'How can I help you today?',
      'What would you like to know about our products?',
      'Are you looking for something specific?'
    ],
    requiresContext: false,
    category: 'greeting',
    priority: 'low'
  },
  {
    id: 'product_inquiry',
    name: 'Product Inquiry',
    description: 'User is asking about products or services',
    patterns: [
      'what products do you have', 'show me your products', 'what do you sell',
      'do you have', 'available products', 'product catalog', 'items for sale',
      'what kind of products', 'new products', 'latest products'
    ],
    responses: {
      professional: 'We offer a wide range of {{productCategory}} products. Could you let me know what specific type of product you\'re interested in?',
      friendly: 'Awesome! I\'d love to tell you about our products! 🛍️ We have {{productCategory}} available. What type of product are you looking for?',
      casual: 'Cool! We\'ve got {{productCategory}}. What are you looking for?'
    },
    actions: ['show_products', 'product_search', 'category_suggestions'],
    entities: ['product_category', 'product_type', 'brand'],
    confidenceThreshold: 0.6,
    followUpQuestions: [
      'What type of product are you looking for?',
      'Do you have a specific category in mind?',
      'What\'s your budget range?'
    ],
    requiresContext: false,
    category: 'inquiry',
    priority: 'medium'
  },
  {
    id: 'price_inquiry',
    name: 'Price Inquiry',
    description: 'User is asking about pricing',
    patterns: [
      'how much is', 'what is the price of', 'price for', 'cost of',
      'how much does it cost', 'what\'s the price', 'pricing for',
      'how much for', 'price list', 'cost'
    ],
    responses: {
      professional: 'The price for {{productName}} is {{price}}. Would you like to know about any discounts or bulk pricing?',
      friendly: 'Great choice! {{productName}} is {{price}} 💰. We also have some great deals if you\'re interested!',
      casual: '{{productName}} goes for {{price}}. Want to see similar products?'
    },
    actions: ['show_price', 'check_discounts', 'suggest_alternatives'],
    entities: ['product_name', 'product_id', 'quantity'],
    confidenceThreshold: 0.7,
    followUpQuestions: [
      'Would you like to know about our current discounts?',
      'Are you interested in bulk pricing?',
      'Shall I show you similar products in different price ranges?'
    ],
    requiresContext: true,
    category: 'inquiry',
    priority: 'medium'
  },
  {
    id: 'order_status',
    name: 'Order Status',
    description: 'User wants to check their order status',
    patterns: [
      'where is my order', 'order status', 'track my order', 'when will it arrive',
      'order tracking', 'delivery status', 'when will my order come',
      'check order status', 'order number', 'tracking number'
    ],
    responses: {
      professional: 'I can help you check your order status. Please provide your order number, and I\'ll look up the current status for you.',
      friendly: 'I can check your order status for you! 📦 Just need your order number and I\'ll get you the latest updates.',
      casual: 'Sure, I can check your order! What\'s your order number?'
    },
    actions: ['check_order_status', 'track_delivery', 'show_order_details'],
    entities: ['order_number', 'tracking_number', 'customer_email'],
    confidenceThreshold: 0.8,
    followUpQuestions: [
      'Do you have your order number handy?',
      'Would you like tracking updates via email?',
      'Is there anything else I can help you with regarding your order?'
    ],
    requiresContext: false,
    category: 'support',
    priority: 'high'
  },
  {
    id: 'delivery_info',
    name: 'Delivery Information',
    description: 'User is asking about delivery options and timelines',
    patterns: [
      'delivery options', 'shipping methods', 'how long for delivery',
      'delivery time', 'when will it be delivered', 'shipping cost',
      'do you deliver to', 'delivery areas', 'free delivery',
      'express delivery', 'same day delivery'
    ],
    responses: {
      professional: 'We offer various delivery options including standard (3-5 days), express (1-2 days), and same-day delivery in select areas. The cost depends on your location and chosen method.',
      friendly: 'We deliver! 🚚 Most areas get their orders in 2-5 days with standard delivery. We also have express options! Where are you located?',
      casual: 'We deliver pretty much everywhere! Usually 2-5 days for standard, faster options available. Where you at?'
    },
    actions: ['show_delivery_options', 'calculate_delivery_fee', 'check_delivery_area'],
    entities: ['location', 'delivery_type', 'delivery_speed'],
    confidenceThreshold: 0.6,
    followUpQuestions: [
      'What\'s your delivery address?',
      'Would you like to see delivery options for your area?',
      'Are you interested in express delivery?'
    ],
    requiresContext: false,
    category: 'inquiry',
    priority: 'medium'
  },
  {
    id: 'return_policy',
    name: 'Return Policy',
    description: 'User is asking about returns and refunds',
    patterns: [
      'return policy', 'can I return', 'refund policy', 'how to return',
      'return item', 'get refund', 'exchange item', 'wrong item',
      'defective product', 'not satisfied', 'return process'
    ],
    responses: {
      professional: 'We have a 7-day return policy for unused items in original packaging. Please contact us with your order details to initiate a return.',
      friendly: 'No worries! We have a 7-day return policy for unused items. 📦 Just contact us with your order info and we\'ll help you out!',
      casual: 'You can return items within 7 days if they\'re unused. Just hit us up with your order details!'
    },
    actions: ['show_return_policy', 'initiate_return', 'process_refund'],
    entities: ['order_number', 'return_reason', 'product_condition'],
    confidenceThreshold: 0.7,
    followUpQuestions: [
      'Do you have your order number?',
      'What\'s the reason for the return?',
      'Is the item in its original condition?'
    ],
    requiresContext: true,
    category: 'support',
    priority: 'high'
  },
  {
    id: 'payment_issues',
    name: 'Payment Issues',
    description: 'User is experiencing payment problems',
    patterns: [
      'payment failed', 'can\'t pay', 'payment error', 'transaction declined',
      'card not working', 'payment problem', 'failed transaction',
      'payment gateway error', 'can\'t complete payment'
    ],
    responses: {
      professional: 'I apologize for the inconvenience. Let me help you with the payment issue. Could you tell me what error message you\'re seeing?',
      friendly: 'Oh no, sorry about the payment trouble! 😔 Let me help you sort this out. What seems to be happening?',
      casual: 'Payment issues are the worst! Let me help. What\'s going wrong?'
    },
    actions: ['troubleshoot_payment', 'suggest_alternative_payment', 'escalate_issue'],
    entities: ['payment_method', 'error_message', 'transaction_id'],
    confidenceThreshold: 0.8,
    followUpQuestions: [
      'What payment method are you using?',
      'Are you seeing any specific error message?',
      'Would you like to try a different payment method?'
    ],
    requiresContext: false,
    category: 'support',
    priority: 'high'
  },
  {
    id: 'business_hours',
    name: 'Business Hours',
    description: 'User is asking about operating hours',
    patterns: [
      'what are your hours', 'when are you open', 'business hours',
      'opening times', 'closing time', 'are you open now',
      'weekend hours', 'sunday hours', 'holiday hours'
    ],
    responses: {
      professional: 'Our business hours are Monday to Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM. We are closed on Sundays.',
      friendly: 'We\'re open Monday-Friday 9am-6pm and Saturday 10am-4pm! 🕘 We\'re closed Sundays to spend time with family.',
      casual: 'Mon-Fri 9-6, Sat 10-4. Closed Sundays!'
    },
    actions: ['show_business_hours', 'check_current_status'],
    entities: ['day_of_week', 'time_period'],
    confidenceThreshold: 0.8,
    followUpQuestions: [
      'Is there a specific day you were wondering about?',
      'Would you like to schedule an appointment?',
      'Can I help you with anything else?'
    ],
    requiresContext: false,
    category: 'inquiry',
    priority: 'low'
  },
  {
    id: 'contact_info',
    name: 'Contact Information',
    description: 'User wants contact details',
    patterns: [
      'contact number', 'phone number', 'email address', 'how to contact',
      'customer service', 'support phone', 'call you', 'whatsapp number',
      'office address', 'location', 'where are you located'
    ],
    responses: {
      professional: 'You can reach us at {{phoneNumber}} or email {{emailAddress}}. Our address is {{businessAddress}}. We\'re available during business hours.',
      friendly: 'You can call us at 📞 {{phoneNumber}} or email 📧 {{emailAddress}}. We\'re at {{businessAddress}} and love hearing from customers!',
      casual: 'Hit us up at {{phoneNumber}} or {{emailAddress}}. We\'re at {{businessAddress}}.'
    },
    actions: ['show_contact_info', 'initiate_call', 'share_location'],
    entities: ['contact_method', 'preferred_channel'],
    confidenceThreshold: 0.7,
    followUpQuestions: [
      'What\'s the best way to reach you?',
      'Would you like me to connect you with our support team?',
      'Is there anything specific you\'d like to discuss?'
    ],
    requiresContext: false,
    category: 'inquiry',
    priority: 'medium'
  },
  {
    id: 'complaint',
    name: 'Complaint',
    description: 'User is making a complaint',
    patterns: [
      'complaint', 'not happy', 'very disappointed', 'poor service',
      'bad experience', 'terrible service', 'unacceptable', 'angry',
      'frustrated', 'dissatisfied', 'worst experience'
    ],
    responses: {
      professional: 'I sincerely apologize for the inconvenience. Please provide details about the issue, and I\'ll ensure it\'s escalated to our support team immediately.',
      friendly: 'Oh no, I\'m so sorry to hear you\'re having a bad experience! 😔 Please tell me what happened, and I\'ll make sure our team helps you right away.',
      casual: 'Sorry about that! What\'s going on? I\'ll get help for you.'
    },
    actions: ['handle_complaint', 'escalate_issue', 'offer_compensation'],
    entities: ['complaint_type', 'order_number', 'severity'],
    confidenceThreshold: 0.8,
    followUpQuestions: [
      'Can you tell me more about what happened?',
      'Do you have an order number I can reference?',
      'How can we make this right for you?'
    ],
    requiresContext: false,
    category: 'support',
    priority: 'high'
  },
  {
    id: 'thanks',
    name: 'Thanks',
    description: 'User is expressing gratitude',
    patterns: [
      'thank you', 'thanks', 'appreciate it', 'grateful',
      'thank you so much', 'thanks a lot', 'helpful', 'good job'
    ],
    responses: {
      professional: 'You\'re most welcome. Is there anything else I can assist you with?',
      friendly: 'You\'re very welcome! 😊 Happy to help! Let me know if you need anything else!',
      casual: 'No problem! Anything else?'
    },
    actions: ['end_conversation', 'request_feedback', 'suggest_products'],
    entities: [],
    confidenceThreshold: 0.9,
    followUpQuestions: [
      'Is there anything else I can help with?',
      'Would you like to browse our latest products?',
      'Have a great day!'
    ],
    requiresContext: true,
    category: 'general',
    priority: 'low'
  },
  {
    id: 'goodbye',
    name: 'Goodbye',
    description: 'User is ending the conversation',
    patterns: [
      'bye', 'goodbye', 'see you', 'later', 'take care',
      'farewell', 'that\'s all', 'no more questions', 'I\'m done'
    ],
    responses: {
      professional: 'Thank you for contacting {{businessName}}. Have a wonderful day!',
      friendly: 'Thanks for chatting! Have an amazing day! 🌟 Don\'t hesitate to reach out if you need anything!',
      casual: 'Later! Take care and come back soon!'
    },
    actions: ['end_conversation', 'save_chat_history', 'request_feedback'],
    entities: [],
    confidenceThreshold: 0.8,
    followUpQuestions: [],
    requiresContext: true,
    category: 'general',
    priority: 'low'
  },
  {
    id: 'out_of_scope',
    name: 'Out of Scope',
    description: 'User query is outside bot\'s capabilities',
    patterns: [],
    responses: {
      professional: 'I apologize, but I\'m not equipped to handle that specific request. Would you like me to connect you with a human agent who can assist you further?',
      friendly: 'Hmm, I\'m not sure how to help with that yet! 😅 But I can connect you with our team who\'ll be happy to assist!',
      casual: 'Sorry, I can\'t help with that. Want me to get a human?'
    },
    actions: ['escalate_to_human', 'suggest_alternative', 'apologize'],
    entities: [],
    confidenceThreshold: 0.0,
    followUpQuestions: [
      'Would you like to speak with a customer service representative?',
      'Can I help you with anything else?',
      'Is there another way I can assist you?'
    ],
    requiresContext: false,
    category: 'general',
    priority: 'medium'
  }
];

// Intent recognition and matching
export const findMatchingIntent = (message: string, context: any = {}): { intent: ChatIntent; confidence: number; entities: any } => {
  const cleanedMessage = message.toLowerCase().trim();
  let bestMatch: { intent: ChatIntent; confidence: number } = {
    intent: CHAT_INTENTS.find(i => i.id === 'out_of_scope')!,
    confidence: 0
  };

  for (const intent of CHAT_INTENTS) {
    if (intent.id === 'out_of_scope') continue;

    for (const pattern of intent.patterns) {
      if (cleanedMessage.includes(pattern.toLowerCase())) {
        const confidence = calculateConfidence(cleanedMessage, pattern, intent.confidenceThreshold);
        if (confidence > bestMatch.confidence) {
          bestMatch = { intent, confidence };
        }
      }
    }
  }

  // Extract entities from the message
  const entities = extractEntities(cleanedMessage, bestMatch.intent.entities);

  return {
    intent: bestMatch.intent,
    confidence: bestMatch.confidence,
    entities
  };
};

const calculateConfidence = (message: string, pattern: string, baseThreshold: number): number => {
  const patternLength = pattern.length;
  const messageLength = message.length;
  const matchStrength = patternLength / messageLength;
  
  return Math.min(baseThreshold + (matchStrength * 0.3), 1.0);
};

const extractEntities = (message: string, entityTypes: string[]): any => {
  const entities: any = {};

  // Simple entity extraction (in a real system, use NLP libraries)
  if (entityTypes.includes('order_number')) {
    const orderMatch = message.match(/(?:order|ord|#)?\s*([A-Z0-9]{6,10})/i);
    if (orderMatch) entities.order_number = orderMatch[1];
  }

  if (entityTypes.includes('product_name')) {
    // Simple product name extraction
    const productKeywords = ['product', 'item', 'model'];
    for (const keyword of productKeywords) {
      if (message.includes(keyword)) {
        const parts = message.split(keyword);
        if (parts[1]) {
          entities.product_name = parts[1].trim().split(' ').slice(0, 3).join(' ');
          break;
        }
      }
    }
  }

  if (entityTypes.includes('location')) {
    const locationKeywords = ['in', 'at', 'to', 'near'];
    for (const keyword of locationKeywords) {
      if (message.includes(keyword)) {
        const parts = message.split(keyword);
        if (parts[1]) {
          entities.location = parts[1].trim().split(' ').slice(0, 2).join(' ');
          break;
        }
      }
    }
  }

  return entities;
};

// Response generation
export const generateResponse = (intent: ChatIntent, tone: 'professional' | 'friendly' | 'casual' = 'friendly', context: any = {}): string => {
  const template = intent.responses[tone];
  
  // Replace placeholders with context values
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return context[key] || match;
  });
};

// Intent categories for analytics
export const INTENT_CATEGORIES = {
  greeting: 'Greeting and Welcome',
  inquiry: 'Product and Service Inquiries',
  support: 'Customer Support',
  transaction: 'Orders and Payments',
  feedback: 'Feedback and Reviews',
  general: 'General Conversation'
};

export type ChatIntentType = typeof CHAT_INTENTS[0];
export type IntentCategory = keyof typeof INTENT_CATEGORIES;