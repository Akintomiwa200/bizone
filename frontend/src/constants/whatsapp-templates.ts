// WhatsApp Business API templates

export interface WhatsAppTemplate {
  name: string;
  category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';
  language: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'PAUSED';
  components: TemplateComponent[];
  description: string;
  allowedParameters: number;
  example?: string;
  usage: string[];
  restrictions?: string[];
}

export interface TemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  buttons?: TemplateButton[];
  examples?: string[][];
}

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'URL';
  text: string;
  url?: string;
  example?: string[];
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    name: 'order_confirmation',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Notify customers about their order confirmation',
    allowedParameters: 4,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Order Confirmation',
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

Your order {{2}} has been confirmed! 

📦 Order Details:
• Total Amount: {{3}}
• Payment Method: {{4}}
• Estimated Delivery: 2-3 business days

We'll notify you when your order ships. Thank you for shopping with us!`,
        examples: [
          ['John', 'ORD-12345', '₦25,000', 'Card Payment']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'QUICK_REPLY',
            text: 'Track Order'
          },
          {
            type: 'QUICK_REPLY',
            text: 'View Details'
          },
          {
            type: 'URL',
            text: 'View Order',
            url: 'https://yourapp.com/orders/{{2}}'
          }
        ]
      }
    ],
    usage: [
      'After successful order placement',
      'When payment is confirmed'
    ],
    example: 'Sent immediately after customer completes an order'
  },
  {
    name: 'order_shipped',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Notify customers that their order has been shipped',
    allowedParameters: 5,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Order Shipped 🚚'
      },
      {
        type: 'BODY',
        text: `Great news {{1}}!

Your order {{2}} has been shipped.

📦 Shipping Details:
• Tracking Number: {{3}}
• Carrier: {{4}}
• Estimated Delivery: {{5}}

You can track your package using the link below.`,
        examples: [
          ['Sarah', 'ORD-12346', 'TRK-789012', 'DHL Express', 'Tomorrow by EOD']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Track Package',
            url: 'https://tracking.com/{{3}}'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Contact Support'
          }
        ]
      }
    ],
    usage: [
      'When order is dispatched from warehouse',
      'When tracking information is available'
    ]
  },
  {
    name: 'delivery_update',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Provide delivery status updates to customers',
    allowedParameters: 4,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Delivery Update'
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

Your order {{2}} is out for delivery! 

🚚 Delivery Information:
• Status: {{3}}
• Driver: {{4}}
• Contact: Click below to call driver

Please ensure someone is available to receive the package.`,
        examples: [
          ['Michael', 'ORD-12347', 'Out for Delivery', 'John (0803XXX)']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Call Driver',
            url: 'tel:{{4}}'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Track Live'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Reschedule'
          }
        ]
      }
    ],
    usage: [
      'When driver is en route',
      '30 minutes before estimated delivery'
    ]
  },
  {
    name: 'payment_reminder',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Remind customers about pending payments',
    allowedParameters: 3,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Payment Reminder'
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

This is a friendly reminder about your pending payment for order {{2}}.

💰 Amount Due: {{3}}

Please complete your payment to avoid order cancellation. You can pay using the link below.`,
        examples: [
          ['David', 'ORD-12348', '₦15,500']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Pay Now',
            url: 'https://yourapp.com/pay/{{2}}'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Need Help?'
          }
        ]
      }
    ],
    usage: [
      '24 hours after order with pending payment',
      'Before order cancellation deadline'
    ],
    restrictions: [
      'Send maximum 2 reminders per order',
      'Include clear cancellation timeline'
    ]
  },
  {
    name: 'welcome_message',
    category: 'AUTHENTICATION',
    language: 'en',
    status: 'APPROVED',
    description: 'Welcome new customers to your business',
    allowedParameters: 2,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Welcome! 👋'
      },
      {
        type: 'BODY',
        text: `Welcome to {{1}}, {{2}}! 

We're thrilled to have you join our community. Here's what you can do:
• Browse our latest products
• Get personalized recommendations
• Enjoy fast delivery

Reply to this message if you need any help!`,
        examples: [
          ['Fashion Store', 'Sarah']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Shop Now',
            url: 'https://yourapp.com/products'
          },
          {
            type: 'QUICK_REPLY',
            text: 'See Deals'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Get Help'
          }
        ]
      }
    ],
    usage: [
      'After customer signs up',
      'When customer first messages your business'
    ]
  },
  {
    name: 'abandoned_cart',
    category: 'MARKETING',
    language: 'en',
    status: 'APPROVED',
    description: 'Remind customers about items left in cart',
    allowedParameters: 3,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Cart Waiting 🛒'
      },
      {
        type: 'BODY',
        text: `Hi {{1}},

We noticed you left some items in your cart! 

{{2}}

💰 Total: {{3}}

These items are popular and may sell out soon. Complete your purchase now!`,
        examples: [
          ['Jessica', '2 items: Nike Shoes, Adidas Shirt', '₦45,000']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Complete Purchase',
            url: 'https://yourapp.com/cart'
          },
          {
            type: 'QUICK_REPLY',
            text: 'See Similar Items'
          }
        ]
      }
    ],
    usage: [
      '2 hours after cart abandonment',
      'When items are low in stock'
    ],
    restrictions: [
      'Include clear product information',
      'Send maximum 1 reminder per cart'
    ]
  },
  {
    name: 'customer_support',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Provide customer support follow-up',
    allowedParameters: 3,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Support Update'
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

Thank you for contacting our support team regarding: {{2}}

Our agent {{3}} is reviewing your request and will get back to you shortly.

In the meantime, you can browse our help center for quick answers.`,
        examples: [
          ['Daniel', 'Order delivery issue', 'Sarah from Support']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Help Center',
            url: 'https://yourapp.com/help'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Urgent Issue'
          }
        ]
      }
    ],
    usage: [
      'After customer submits support ticket',
      'When assigning ticket to agent'
    ]
  },
  {
    name: 'feedback_request',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Request feedback after order delivery',
    allowedParameters: 2,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'How Was Your Experience?'
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

We hope you're enjoying your order {{2}}! 

Could you take a moment to share your experience? Your feedback helps us improve our service.`,
        examples: [
          ['Grace', 'ORD-12349']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Leave Review',
            url: 'https://yourapp.com/review/{{2}}'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Great Experience 👍'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Needs Improvement'
          }
        ]
      }
    ],
    usage: [
      '3 days after order delivery',
      'After customer support resolution'
    ],
    restrictions: [
      'Send only to delivered orders',
      'Respect customer preferences'
    ]
  },
  {
    name: 'promotional_offer',
    category: 'MARKETING',
    language: 'en',
    status: 'APPROVED',
    description: 'Send promotional offers to customers',
    allowedParameters: 3,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Special Offer! 🎁'
      },
      {
        type: 'BODY',
        text: `Hi {{1}},

As a valued customer, we have a special offer for you!

{{2}}

Use code: {{3}}

This offer is exclusive to you and expires soon!`,
        examples: [
          ['Alex', 'Get 20% off your next purchase', 'WELCOME20']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'Shop Now',
            url: 'https://yourapp.com/sale'
          },
          {
            type: 'QUICK_REPLY',
            text: 'See Terms'
          }
        ]
      }
    ],
    usage: [
      'Seasonal promotions',
      'Customer loyalty rewards'
    ],
    restrictions: [
      'Include clear expiration date',
      'Provide opt-out instructions'
    ]
  },
  {
    name: 'appointment_reminder',
    category: 'UTILITY',
    language: 'en',
    status: 'APPROVED',
    description: 'Remind customers about upcoming appointments',
    allowedParameters: 4,
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Appointment Reminder'
      },
      {
        type: 'BODY',
        text: `Hello {{1}},

This is a reminder for your upcoming appointment:

📅 Date: {{2}}
⏰ Time: {{3}}
📍 Location: {{4}}

Please arrive 10 minutes early. We look forward to seeing you!`,
        examples: [
          ['Maria', '15th December 2024', '2:00 PM', '123 Main Street, Lagos']
        ]
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'URL',
            text: 'View Details',
            url: 'https://yourapp.com/appointments'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Reschedule'
          },
          {
            type: 'QUICK_REPLY',
            text: 'Confirm'
          }
        ]
      }
    ],
    usage: [
      '24 hours before appointment',
      '2 hours before appointment'
    ]
  }
];

// Template management utilities
export const getTemplateByName = (name: string): WhatsAppTemplate | undefined => {
  return WHATSAPP_TEMPLATES.find(template => template.name === name);
};

export const getTemplatesByCategory = (category: WhatsAppTemplate['category']): WhatsAppTemplate[] => {
  return WHATSAPP_TEMPLATES.filter(template => template.category === category);
};

export const getApprovedTemplates = (): WhatsAppTemplate[] => {
  return WHATSAPP_TEMPLATES.filter(template => template.status === 'APPROVED');
};

export const validateTemplateParameters = (templateName: string, parameters: string[]): boolean => {
  const template = getTemplateByName(templateName);
  if (!template) return false;

  return parameters.length <= template.allowedParameters;
};

export const generateTemplateMessage = (templateName: string, parameters: string[]): string => {
  const template = getTemplateByName(templateName);
  if (!template) throw new Error(`Template ${templateName} not found`);

  if (!validateTemplateParameters(templateName, parameters)) {
    throw new Error(`Invalid number of parameters for template ${templateName}`);
  }

  // In a real implementation, this would format the template with parameters
  // according to WhatsApp Business API specifications
  return `Template: ${templateName} with ${parameters.length} parameters`;
};

// Template categories and usage guidelines
export const TEMPLATE_CATEGORIES = {
  UTILITY: {
    name: 'Utility Templates',
    description: 'Transactional messages for order updates, appointments, and support',
    usage: 'Customer-triggered events',
    examples: ['Order confirmations', 'Shipping updates', 'Appointment reminders']
  },
  MARKETING: {
    name: 'Marketing Templates',
    description: 'Promotional messages and offers',
    usage: 'Business-initiated promotions',
    examples: ['Special offers', 'New product announcements', 'Abandoned cart reminders']
  },
  AUTHENTICATION: {
    name: 'Authentication Templates',
    description: 'Account-related messages and verification',
    usage: 'Security and account management',
    examples: ['Welcome messages', 'OTP verification', 'Account updates']
  }
};

// Template approval guidelines
export const TEMPLATE_APPROVAL_GUIDELINES = {
  required: [
    'Clear and accurate description',
    'Appropriate category selection',
    'Proper parameter definitions',
    'Compliance with WhatsApp policies'
  ],
  prohibited: [
    'Spammy or misleading content',
    'Excessive use of emojis',
    'False urgency claims',
    'Violation of local laws'
  ],
  bestPractices: [
    'Use customer name personalization',
    'Include clear call-to-action',
    'Provide value to the customer',
    'Respect frequency limits'
  ]
};

export type WhatsAppTemplateType = WhatsAppTemplate;
export type TemplateCategory = WhatsAppTemplate['category'];
export type TemplateComponentType = TemplateComponent['type'];