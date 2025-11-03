import { ChatMessage, ChatContext } from '@/lib/api/chat';
import { NLPProcessor } from './nlp-processor';
import { IntentRecognizer } from './intent-recognition';
import { ResponseGenerator } from './response-generator';
import { AITemplates } from './templates';

export interface ChatEngineConfig {
  language: string;
  tone: 'professional' | 'friendly' | 'casual';
  maxHistory: number;
  enableSuggestions: boolean;
}

export class ChatEngine {
  private nlpProcessor: NLPProcessor;
  private intentRecognizer: IntentRecognizer;
  private responseGenerator: ResponseGenerator;
  private config: ChatEngineConfig;

  constructor(config: Partial<ChatEngineConfig> = {}) {
    this.config = {
      language: 'en',
      tone: 'friendly',
      maxHistory: 10,
      enableSuggestions: true,
      ...config,
    };

    this.nlpProcessor = new NLPProcessor();
    this.intentRecognizer = new IntentRecognizer();
    this.responseGenerator = new ResponseGenerator();
  }

  async processMessage(
    message: string,
    context: ChatContext
  ): Promise<{
    response: string;
    intent: string;
    confidence: number;
    suggestions: string[];
    actions: string[];
  }> {
    // Preprocess the message
    const processedMessage = await this.nlpProcessor.process(message);
    
    // Recognize intent
    const intentResult = await this.intentRecognizer.recognize(processedMessage, context);
    
    // Generate response
    const response = await this.responseGenerator.generate(
      processedMessage,
      intentResult,
      context,
      this.config
    );

    // Generate suggestions
    const suggestions = this.config.enableSuggestions
      ? await this.generateSuggestions(intentResult.intent, context)
      : [];

    return {
      response,
      intent: intentResult.intent,
      confidence: intentResult.confidence,
      suggestions,
      actions: intentResult.actions || [],
    };
  }

  private async generateSuggestions(intent: string, context: ChatContext): Promise<string[]> {
    const template = AITemplates.getSuggestionTemplate(intent);
    if (!template) return [];

    // Implement suggestion generation logic based on intent and context
    switch (intent) {
      case 'product_inquiry':
        return [
          'Show me your best-selling products',
          'What new products do you have?',
          'Do you have any discounts?',
        ];
      case 'order_status':
        return [
          'Check my recent orders',
          'Update my order',
          'Contact delivery driver',
        ];
      case 'business_hours':
        return [
          'Where are you located?',
          'Do you deliver to my area?',
          'What payment methods do you accept?',
        ];
      default:
        return [
          'Tell me about your business',
          'How can I track my order?',
          'What are your delivery options?',
        ];
    }
  }

  async analyzeConversation(messages: ChatMessage[]): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    keyTopics: string[];
    customerNeeds: string[];
  }> {
    return await this.nlpProcessor.analyzeConversation(messages);
  }

  updateConfig(config: Partial<ChatEngineConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export const chatEngine = new ChatEngine();