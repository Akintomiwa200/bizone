export class AITemplates {
  static getResponseTemplate(intent: string, tone: 'professional' | 'friendly' | 'casual' = 'friendly'): string | null {
    const templates = {
      greeting: {
        professional: "Hello! Welcome to {{businessName}}. How may I assist you today?",
        friendly: "Hi there! 👋 Welcome to {{businessName}}! How can I help you today?",
        casual: "Hey! Welcome to {{businessName}}. What's up?",
      },
      product_inquiry: {
        professional: "I'd be happy to help you with our products. We offer a wide range of items. Could you let me know what specific product you're interested in?",
        friendly: "Awesome! I'd love to tell you about our products! 🛍️ We have some great items available. What type of product are you looking for?",
        casual: "Cool! We've got lots of products. What are you looking for?",
      },
      order_status: {
        professional: "I can help you check your order status. Please provide your order number, and I'll look up the current status for you.",
        friendly: "I can check your order status for you! 📦 Just need your order number and I'll get you the latest updates.",
        casual: "Sure, I can check your order! What's your order number?",
      },
      delivery_info: {
        professional: "We offer delivery services across major cities in Nigeria. Delivery typically takes 2-5 business days depending on your location. The fee is calculated based on distance.",
        friendly: "We deliver! 🚚 Most areas get their orders in 2-5 days. The cost depends on how far you are - I can check exact fees if you'd like!",
        casual: "We deliver pretty much everywhere! Usually 2-5 days. Cost depends on where you are.",
      },
      payment_info: {
        professional: "We accept various payment methods including bank transfer, credit/debit cards via Paystack, and cash on delivery for eligible areas.",
        friendly: "You can pay however you prefer! 💳 We take bank transfer, cards (through Paystack), and cash on delivery in some areas!",
        casual: "Pay with transfer, card, or cash on delivery!",
      },
      return_policy: {
        professional: "We have a 7-day return policy for unused items in original packaging. Please contact us with your order details to initiate a return.",
        friendly: "No worries! We have a 7-day return policy for unused items. 📦 Just contact us with your order info and we'll help you out!",
        casual: "You can return items within 7 days if they're unused. Just hit us up with your order details!",
      },
      contact_info: {
        professional: "You can reach us at [Phone Number] or email [Email Address]. Our address is [Business Address]. Business hours are [Hours].",
        friendly: "You can call us at 📞 [Phone Number] or email 📧 [Email Address]. We're at [Business Address] and open [Hours]!",
        casual: "Call us at [Phone Number] or email [Email Address]. We're at [Business Address], open [Hours].",
      },
      complaint: {
        professional: "I apologize for the inconvenience. Please provide details about the issue, and I'll ensure it's escalated to our support team immediately.",
        friendly: "Oh no, I'm sorry to hear that! 😔 Please tell me what happened, and I'll make sure our team helps you right away.",
        casual: "Sorry about that! What's going on? I'll get help for you.",
      },
      thanks: {
        professional: "You're most welcome. Is there anything else I can assist you with?",
        friendly: "You're very welcome! 😊 Happy to help! Let me know if you need anything else!",
        casual: "No problem! Anything else?",
      },
      goodbye: {
        professional: "Thank you for contacting {{businessName}}. Have a wonderful day!",
        friendly: "Thanks for chatting! Have an amazing day! 🌟",
        casual: "Later! Take care!",
      },
      unknown: {
        professional: "I apologize, but I'm not sure how to help with that. Could you please rephrase your question or contact our support team?",
        friendly: "Hmm, I'm not quite sure I understand. Could you try asking in a different way? 😊",
        casual: "Sorry, didn't get that. Can you say it differently?",
      },
    };

    const intentTemplates = templates[intent as keyof typeof templates];
    return intentTemplates ? intentTemplates[tone] : templates.unknown[tone];
  }

  static getSuggestionTemplate(intent: string): string | null {
    const suggestions = {
      product_inquiry: "Would you like to see our {{category}} products or check out our latest arrivals?",
      order_status: "I can help you track your delivery or check another order if you'd like!",
      delivery_info: "Want to check delivery fees for your area or see estimated delivery times?",
      payment_info: "Need details about a specific payment method or having trouble with payment?",
    };

    return suggestions[intent as keyof typeof suggestions] || null;
  }

  static getWhatsAppTemplate(templateName: string): any {
    const templates = {
      order_confirmation: {
        name: "order_confirmation",
        category: "UTILITY",
        language: "en",
        components: [
          {
            type: "BODY",
            text: "Hello {{1}}, your order {{2}} has been confirmed! Total: {{3}}. Expected delivery: {{4}}.",
          },
          {
            type: "BUTTONS",
            buttons: [
              {
                type: "QUICK_REPLY",
                text: "Track Order",
              },
              {
                type: "QUICK_REPLY",
                text: "View Details",
              },
            ],
          },
        ],
      },
      delivery_update: {
        name: "delivery_update",
        category: "UTILITY",
        language: "en",
        components: [
          {
            type: "BODY",
            text: "Your order {{1}} is out for delivery! 🚚 Estimated arrival: {{2}}. Driver: {{3}} ({{4}}).",
          },
          {
            type: "BUTTONS",
            buttons: [
              {
                type: "QUICK_REPLY",
                text: "Track Live",
              },
              {
                type: "QUICK_REPLY",
                text: "Call Driver",
              },
            ],
          },
        ],
      },
      payment_reminder: {
        name: "payment_reminder",
        category: "UTILITY",
        language: "en",
        components: [
          {
            type: "BODY",
            text: "Friendly reminder 📝: Payment pending for order {{1}}. Amount: {{2}}. Please complete payment to process your order.",
          },
          {
            type: "BUTTONS",
            buttons: [
              {
                type: "QUICK_REPLY",
                text: "Pay Now",
              },
              {
                type: "QUICK_REPLY",
                text: "Need Help?",
              },
            ],
          },
        ],
      },
    };

    return templates[templateName as keyof typeof templates];
  }
}