import { ChatMessage } from '@/lib/api/chat';

export class NLPProcessor {
  async process(text: string): Promise<string> {
    // Basic text preprocessing
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ');
  }

  async tokenize(text: string): Promise<string[]> {
    return text.split(/\s+/).filter(token => token.length > 0);
  }

  async extractEntities(text: string): Promise<Array<{ entity: string; value: string; confidence: number }>> {
    const entities: Array<{ entity: string; value: string; confidence: number }> = [];
    
    // Simple entity extraction patterns
    const patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone: /\b(\+?234|0)[789][01]\d{8}\b/g,
      price: /₦\s?(\d+(?:\.\d{2})?)|(\d+(?:\.\d{2})?)\s?(naira|ngn)/gi,
      product: /\b(product|item)\s+([a-zA-Z0-9\s]+)/gi,
    };

    // Extract emails
    const emails = text.match(patterns.email);
    if (emails) {
      entities.push(...emails.map(email => ({
        entity: 'email',
        value: email,
        confidence: 0.9,
      })));
    }

    // Extract phone numbers
    const phones = text.match(patterns.phone);
    if (phones) {
      entities.push(...phones.map(phone => ({
        entity: 'phone',
        value: phone,
        confidence: 0.9,
      })));
    }

    // Extract prices
    const prices = text.match(patterns.price);
    if (prices) {
      entities.push(...prices.map(price => ({
        entity: 'price',
        value: price,
        confidence: 0.8,
      })));
    }

    return entities;
  }

  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }> {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'like',
      'happy', 'satisfied', 'pleased', 'awesome', 'fantastic', 'brilliant', 'outstanding'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry', 'upset',
      'disappointed', 'frustrated', 'poor', 'worst', 'useless', 'broken', 'wrong'
    ];

    const tokens = await this.tokenize(text);
    let positiveCount = 0;
    let negativeCount = 0;

    tokens.forEach(token => {
      if (positiveWords.includes(token)) positiveCount++;
      if (negativeWords.includes(token)) negativeCount++;
    });

    const total = tokens.length;
    const positiveScore = positiveCount / total;
    const negativeScore = negativeCount / total;

    if (positiveScore > negativeScore && positiveScore > 0.1) {
      return { sentiment: 'positive', score: positiveScore };
    } else if (negativeScore > positiveScore && negativeScore > 0.1) {
      return { sentiment: 'negative', score: negativeScore };
    } else {
      return { sentiment: 'neutral', score: 0 };
    }
  }

  async analyzeConversation(messages: ChatMessage[]): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    keyTopics: string[];
    customerNeeds: string[];
  }> {
    const allText = messages.map(m => m.content).join(' ');
    const sentiment = await this.analyzeSentiment(allText);
    const entities = await this.extractEntities(allText);
    
    // Extract key topics from entities and frequent words
    const keyTopics = entities
      .filter(e => e.confidence > 0.7)
      .map(e => e.entity)
      .slice(0, 5);

    // Simple customer needs detection
    const customerNeeds: string[] = [];
    const text = allText.toLowerCase();

    if (text.includes('price') || text.includes('cost') || text.includes('how much')) {
      customerNeeds.push('pricing_information');
    }
    if (text.includes('delivery') || text.includes('shipping') || text.includes('when will')) {
      customerNeeds.push('delivery_information');
    }
    if (text.includes('order') || text.includes('track') || text.includes('status')) {
      customerNeeds.push('order_status');
    }
    if (text.includes('product') || text.includes('item') || text.includes('buy')) {
      customerNeeds.push('product_inquiry');
    }
    if (text.includes('return') || text.includes('refund') || text.includes('exchange')) {
      customerNeeds.push('return_policy');
    }

    return {
      sentiment: sentiment.sentiment,
      keyTopics,
      customerNeeds,
    };
  }
}