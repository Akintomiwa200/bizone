import { ChatContext } from '@/lib/api/chat';

export interface IntentResult {
  intent: string;
  confidence: number;
  entities: Array<{ entity: string; value: string; confidence: number }>;
  actions?: string[];
}

export class IntentRecognizer {
  private intents: Map<string, { patterns: RegExp[]; actions?: string[] }> = new Map();

  constructor() {
    this.initializeIntents();
  }

  private initializeIntents(): void {
    this.intents.set('greeting', {
      patterns: [
        /hello|hi|hey|greetings|good morning|good afternoon|good evening/i,
      ],
      actions: ['welcome_message'],
    });

    this.intents.set('product_inquiry', {
      patterns: [
        /product|item|what do you sell|what products|show me|browse|catalog/i,
        /do you have|available|in stock|price of|how much is/i,
      ],
      actions: ['show_products', 'product_search'],
    });

    this.intents.set('order_status', {
      patterns: [
        /order status|track order|where is my order|when will it arrive/i,
        /order number|tracking|delivery status|shipment/i,
      ],
      actions: ['check_order_status', 'track_delivery'],
    });

    this.intents.set('business_hours', {
      patterns: [
        /hours|open|close|when are you open|business hours|operating hours/i,
        /weekend|sunday|saturday|holiday|christmas|new year/i,
      ],
      actions: ['show_business_hours'],
    });

    this.intents.set('delivery_info', {
      patterns: [
        /delivery|shipping|how long|delivery time|shipping cost/i,
        /do you deliver to|delivery area|free delivery|delivery fee/i,
      ],
      actions: ['show_delivery_info', 'calculate_delivery'],
    });

    this.intents.set('payment_info', {
      patterns: [
        /payment|pay|how to pay|payment methods|credit card|debit card/i,
        /transfer|bank|paystack|flutterwave|cash on delivery/i,
      ],
      actions: ['show_payment_methods'],
    });

    this.intents.set('return_policy', {
      patterns: [
        /return|refund|exchange|warranty|guarantee|broken|defective/i,
        /not working|wrong item|size issue|color wrong/i,
      ],
      actions: ['show_return_policy'],
    });

    this.intents.set('contact_info', {
      patterns: [
        /contact|phone number|email|address|location|where are you/i,
        /speak to someone|customer service|support|help desk/i,
      ],
      actions: ['show_contact_info'],
    });

    this.intents.set('complaint', {
      patterns: [
        /complaint|problem|issue|not happy|dissatisfied|angry|upset/i,
        /bad service|late delivery|wrong order|missing item/i,
      ],
      actions: ['handle_complaint', 'escalate_issue'],
    });

    this.intents.set('thanks', {
      patterns: [
        /thank|thanks|appreciate|grateful|helpful|nice|good job/i,
      ],
      actions: ['thank_you'],
    });

    this.intents.set('goodbye', {
      patterns: [
        /bye|goodbye|see you|later|take care|farewell/i,
      ],
      actions: ['farewell'],
    });
  }

  async recognize(message: string, context: ChatContext): Promise<IntentResult> {
    const processedMessage = message.toLowerCase();
    let bestMatch: { intent: string; confidence: number; actions?: string[] } = {
      intent: 'unknown',
      confidence: 0,
    };

    for (const [intent, { patterns, actions }] of this.intents) {
      for (const pattern of patterns) {
        if (pattern.test(processedMessage)) {
          const confidence = this.calculateConfidence(processedMessage, pattern);
          if (confidence > bestMatch.confidence) {
            bestMatch = { intent, confidence, actions };
          }
        }
      }
    }

    // If no high-confidence match, use context from recent messages
    if (bestMatch.confidence < 0.3) {
      const contextualIntent = this.getContextualIntent(context);
      if (contextualIntent) {
        bestMatch = { ...contextualIntent, confidence: 0.4 };
      }
    }

    // Extract entities from the message
    const entities = await this.extractEntities(processedMessage);

    return {
      intent: bestMatch.intent,
      confidence: bestMatch.confidence,
      entities,
      actions: bestMatch.actions,
    };
  }

  private calculateConfidence(message: string, pattern: RegExp): number {
    const matches = message.match(pattern);
    if (!matches) return 0;

    const matchLength = matches[0].length;
    const messageLength = message.length;
    
    // Higher confidence for longer matches relative to message length
    let confidence = matchLength / messageLength;

    // Boost confidence for exact matches with key phrases
    const keyPhrases = ['order status', 'delivery', 'return', 'complaint'];
    if (keyPhrases.some(phrase => message.includes(phrase))) {
      confidence += 0.2;
    }

    return Math.min(confidence, 1.0);
  }

  private getContextualIntent(context: ChatContext): { intent: string; actions?: string[] } | null {
    const recentMessages = context.recentMessages.slice(-3); // Last 3 messages
    
    for (const message of recentMessages) {
      if (message.role === 'assistant') {
        // If assistant recently asked about something, likely the user is responding
        const content = message.content.toLowerCase();
        
        if (content.includes('order number') || content.includes('tracking')) {
          return { intent: 'order_status', actions: ['check_order_status'] };
        }
        if (content.includes('product') || content.includes('item')) {
          return { intent: 'product_inquiry', actions: ['show_products'] };
        }
        if (content.includes('delivery address') || content.includes('location')) {
          return { intent: 'delivery_info', actions: ['calculate_delivery'] };
        }
      }
    }

    return null;
  }

  private async extractEntities(message: string): Promise<Array<{ entity: string; value: string; confidence: number }>> {
    const entities: Array<{ entity: string; value: string; confidence: number }> = [];

    // Extract order numbers (simple pattern)
    const orderNumberMatch = message.match(/(?:order|ord|#)?\s*([A-Z0-9]{6,10})/i);
    if (orderNumberMatch) {
      entities.push({
        entity: 'order_number',
        value: orderNumberMatch[1],
        confidence: 0.8,
      });
    }

    // Extract product names (simplified)
    const productMatch = message.match(/(?:product|item)\s+([a-zA-Z0-9\s]+)/i);
    if (productMatch) {
      entities.push({
        entity: 'product',
        value: productMatch[1].trim(),
        confidence: 0.6,
      });
    }

    // Extract locations
    const locationMatch = message.match(/(?:in|at|to)\s+([a-zA-Z\s]+)/i);
    if (locationMatch && this.isLikelyLocation(locationMatch[1])) {
      entities.push({
        entity: 'location',
        value: locationMatch[1].trim(),
        confidence: 0.7,
      });
    }

    return entities;
  }

  private isLikelyLocation(text: string): boolean {
    const locations = ['lagos', 'abuja', 'port harcourt', 'ibadan', 'kano', 'benin', 'ilorin'];
    return locations.some(location => text.toLowerCase().includes(location));
  }

  addCustomIntent(intent: string, patterns: RegExp[], actions?: string[]): void {
    this.intents.set(intent, { patterns, actions });
  }
}