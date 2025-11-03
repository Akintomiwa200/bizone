import { IntentResult } from './intent-recognition';
import { ChatContext } from '@/lib/api/chat';
import { AITemplates } from './templates';

export interface ResponseConfig {
  language: string;
  tone: 'professional' | 'friendly' | 'casual';
  includeEmojis: boolean;
}

export class ResponseGenerator {
  async generate(
    message: string,
    intentResult: IntentResult,
    context: ChatContext,
    config: ResponseConfig
  ): Promise<string> {
    const template = AITemplates.getResponseTemplate(intentResult.intent, config.tone);
    
    if (template) {
      return this.fillTemplate(template, {
        message,
        ...intentResult,
        businessName: context.businessId, // In practice, you'd fetch business name
        customerName: this.getCustomerName(context),
      });
    }

    // Fallback response
    return this.generateFallbackResponse(intentResult, config);
  }

  private fillTemplate(template: string, data: any): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  private getCustomerName(context: ChatContext): string {
    // In practice, you'd fetch customer name from user data
    return 'there';
  }

  private generateFallbackResponse(intentResult: IntentResult, config: ResponseConfig): string {
    const { tone } = config;
    
    const responses = {
      professional: {
        unknown: "I apologize, but I'm not sure how to help with that. Could you please rephrase your question?",
        low_confidence: "I think you're asking about {{intent}}. Is that correct? If not, could you provide more details?",
      },
      friendly: {
        unknown: "Hmm, I'm not quite sure I understand. Could you try asking in a different way? 😊",
        low_confidence: "I believe you're asking about {{intent}} - is that right? Let me know if I'm on the wrong track!",
      },
      casual: {
        unknown: "Sorry, I didn't get that. Can you say it differently?",
        low_confidence: "Sounds like you're asking about {{intent}}. Am I right?",
      },
    };

    const toneResponses = responses[tone];
    
    if (intentResult.confidence < 0.3) {
      return toneResponses.unknown;
    } else if (intentResult.confidence < 0.6) {
      return this.fillTemplate(toneResponses.low_confidence, intentResult);
    }

    return toneResponses.unknown;
  }

  async generateQuickReplies(intent: string, context: ChatContext): Promise<string[]> {
    // Generate context-aware quick replies
    switch (intent) {
      case 'product_inquiry':
        return [
          'Show me all products',
          'What are your bestsellers?',
          'Do you have any discounts?',
        ];
      case 'order_status':
        return [
          'Check order status',
          'Track delivery',
          'Contact support',
        ];
      case 'delivery_info':
        return [
          'Delivery areas',
          'Delivery fees',
          'Delivery times',
        ];
      default:
        return [
          'Product catalog',
          'Order help',
          'Contact information',
        ];
    }
  }
}