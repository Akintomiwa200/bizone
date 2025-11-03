import { chatEngine } from './chat-engine';
import { AITemplates } from './templates';
import { whatsappAPI } from '@/lib/api/whatsapp';

export interface WhatsAppMessageContext {
  businessId: string;
  customerPhone: string;
  customerName?: string;
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export class WhatsAppAIIntegration {
  private sessionContexts: Map<string, WhatsAppMessageContext> = new Map();

  async processIncomingMessage(
    phone: string,
    message: string,
    businessId: string
  ): Promise<{
    response: string;
    shouldUseTemplate: boolean;
    templateName?: string;
    quickReplies?: string[];
  }> {
    // Get or create session context
    const sessionKey = `${businessId}_${phone}`;
    let context = this.sessionContexts.get(sessionKey);

    if (!context) {
      context = {
        businessId,
        customerPhone: phone,
        previousMessages: [],
      };
      this.sessionContexts.set(sessionKey, context);
    }

    // Add user message to context
    context.previousMessages.push({ role: 'user', content: message });

    // Process with chat engine
    const chatContext = this.mapToChatContext(context);
    const result = await chatEngine.processMessage(message, chatContext);

    // Add assistant response to context
    context.previousMessages.push({ role: 'assistant', content: result.response });

    // Limit context history
    if (context.previousMessages.length > 10) {
      context.previousMessages = context.previousMessages.slice(-10);
    }

    // Determine if we should use a WhatsApp template
    const shouldUseTemplate = this.shouldUseTemplate(result.intent);
    const templateName = shouldUseTemplate ? this.getTemplateName(result.intent) : undefined;

    return {
      response: result.response,
      shouldUseTemplate,
      templateName,
      quickReplies: result.suggestions,
    };
  }

  private mapToChatContext(context: WhatsAppMessageContext): any {
    return {
      businessId: context.businessId,
      userId: context.customerPhone,
      sessionId: `${context.businessId}_${context.customerPhone}`,
      recentMessages: context.previousMessages.slice(-5), // Last 5 messages
      userPreferences: {
        language: 'en',
        tone: 'friendly',
      },
    };
  }

  private shouldUseTemplate(intent: string): boolean {
    // Use templates for specific intents that require structured messages
    const templateIntents = ['order_confirmation', 'delivery_update', 'payment_reminder'];
    return templateIntents.includes(intent);
  }

  private getTemplateName(intent: string): string {
    const templateMap: { [key: string]: string } = {
      order_confirmation: 'order_confirmation',
      delivery_update: 'delivery_update',
      payment_reminder: 'payment_reminder',
      welcome_message: 'welcome_message',
    };
    return templateMap[intent] || 'generic_message';
  }

  async sendAutomatedMessage(
    phone: string,
    businessId: string,
    template: string,
    parameters: string[] = []
  ): Promise<void> {
    try {
      await whatsappAPI.sendMessage({
        to: phone,
        type: 'template',
        templateName: template,
        templateParameters: parameters,
      });
    } catch (error) {
      console.error('Failed to send automated WhatsApp message:', error);
      throw error;
    }
  }

  async handleOutOfOffice(
    phone: string,
    businessId: string,
    message: string
  ): Promise<string> {
    // Generate out-of-office response
    const template = AITemplates.getResponseTemplate('out_of_office', 'professional');
    return template || "Thank you for your message. Our business is currently closed. We'll get back to you during our business hours.";
  }

  async analyzeConversationQuality(
    phone: string,
    businessId: string
  ): Promise<{
    satisfaction: number;
    responseTime: number;
    resolution: boolean;
    keyMetrics: any;
  }> {
    const sessionKey = `${businessId}_${phone}`;
    const context = this.sessionContexts.get(sessionKey);

    if (!context) {
      return {
        satisfaction: 0,
        responseTime: 0,
        resolution: false,
        keyMetrics: {},
      };
    }

    // Simple conversation quality analysis
    const messages = context.previousMessages;
    const userMessages = messages.filter(m => m.role === 'user');
    const assistantMessages = messages.filter(m => m.role === 'assistant');

    // Calculate response time (simplified)
    let totalResponseTime = 0;
    let responseCount = 0;

    for (let i = 1; i < messages.length; i++) {
      if (messages[i].role === 'assistant' && messages[i-1].role === 'user') {
        // In practice, you'd calculate actual time differences
        totalResponseTime += 1; // Placeholder
        responseCount++;
      }
    }

    const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    // Simple satisfaction score based on conversation patterns
    let satisfaction = 0.5; // Base score

    // Positive indicators
    if (messages.some(m => m.content.toLowerCase().includes('thank'))) satisfaction += 0.2;
    if (userMessages.length <= assistantMessages.length) satisfaction += 0.1;

    // Negative indicators
    if (messages.some(m => m.content.toLowerCase().includes('angry') || m.content.includes('😠'))) satisfaction -= 0.3;
    if (userMessages.length > 5) satisfaction -= 0.1;

    satisfaction = Math.max(0, Math.min(1, satisfaction));

    return {
      satisfaction,
      responseTime: averageResponseTime,
      resolution: this.isConversationResolved(messages),
      keyMetrics: {
        totalMessages: messages.length,
        userMessageCount: userMessages.length,
        assistantMessageCount: assistantMessages.length,
      },
    };
  }

  private isConversationResolved(messages: Array<{ role: 'user' | 'assistant'; content: string }>): boolean {
    if (messages.length < 2) return false;

    const lastMessage = messages[messages.length - 1];
    const secondLast = messages[messages.length - 2];

    // Conversation is considered resolved if:
    // 1. Last message is from assistant and contains closing phrases
    // 2. User doesn't respond after a solution is provided
    if (lastMessage.role === 'assistant') {
      const closingPhrases = [
        'happy to help',
        'let me know if you need anything else',
        'problem solved',
        'glad I could help',
        'anything else?'
      ];
      
      if (closingPhrases.some(phrase => lastMessage.content.toLowerCase().includes(phrase))) {
        return true;
      }
    }

    return false;
  }

  clearSession(phone: string, businessId: string): void {
    const sessionKey = `${businessId}_${phone}`;
    this.sessionContexts.delete(sessionKey);
  }
}

export const whatsappAI = new WhatsAppAIIntegration();