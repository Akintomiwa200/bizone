import { apiClient } from './client';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  type: 'text' | 'suggestion' | 'action';
  metadata?: {
    intent?: string;
    confidence?: number;
    actions?: string[];
    suggestions?: string[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
  actions?: string[];
}

export interface ChatContext {
  businessId: string;
  userId: string;
  sessionId: string;
  recentMessages: ChatMessage[];
  userPreferences?: {
    language: string;
    tone: 'professional' | 'friendly' | 'casual';
  };
}

export const chatAPI = {
  async sendMessage(
    sessionId: string,
    message: string,
    context?: Partial<ChatContext>
  ): Promise<ChatResponse> {
    return await apiClient.post<ChatResponse>('/chat/messages', {
      sessionId,
      message,
      context,
    });
  },

  async createSession(title?: string): Promise<ChatSession> {
    return await apiClient.post<ChatSession>('/chat/sessions', { title });
  },

  async getSessions(): Promise<ChatSession[]> {
    return await apiClient.get<ChatSession[]>('/chat/sessions');
  },

  async getSession(sessionId: string): Promise<{
    session: ChatSession;
    messages: ChatMessage[];
  }> {
    return await apiClient.get(`/chat/sessions/${sessionId}`);
  },

  async deleteSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/chat/sessions/${sessionId}`);
  },

  async clearSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/chat/sessions/${sessionId}/messages`);
  },

  async getSuggestions(sessionId: string): Promise<string[]> {
    return await apiClient.get<string[]>(`/chat/sessions/${sessionId}/suggestions`);
  },

  async analyzeIntent(message: string): Promise<{
    intent: string;
    confidence: number;
    entities: Array<{ entity: string; value: string; confidence: number }>;
  }> {
    return await apiClient.post('/chat/analyze-intent', { message });
  },

  async generateResponse(
    prompt: string,
    context: Partial<ChatContext>
  ): Promise<{ response: string }> {
    return await apiClient.post<{ response: string }>('/chat/generate', {
      prompt,
      context,
    });
  },
};