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

const CHAT_BASE = '/api/chat';

const chatRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${CHAT_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Chat request failed');
  }

  return data as T;
};

export const chatAPI = {
  async sendMessage(
    sessionId: string,
    message: string,
    context?: Partial<ChatContext>
  ): Promise<ChatResponse> {
    return await chatRequest<ChatResponse>('', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        message,
        context,
      }),
    });
  },

  async createSession(title?: string): Promise<ChatSession> {
    return await chatRequest<ChatSession>('/sessions', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  },

  async getSessions(): Promise<ChatSession[]> {
    return await chatRequest<ChatSession[]>('/sessions');
  },

  async getSession(sessionId: string): Promise<{
    session: ChatSession;
    messages: ChatMessage[];
  }> {
    return await chatRequest(`/sessions/${sessionId}`);
  },

  async deleteSession(sessionId: string): Promise<void> {
    await chatRequest(`/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  },

  async clearSession(sessionId: string): Promise<void> {
    await chatRequest(`/sessions/${sessionId}/messages`, {
      method: 'DELETE',
    });
  },

  async getSuggestions(sessionId: string): Promise<string[]> {
    return await chatRequest<string[]>(`/sessions/${sessionId}/suggestions`);
  },

  async analyzeIntent(message: string): Promise<{
    intent: string;
    confidence: number;
    entities: Array<{ entity: string; value: string; confidence: number }>;
  }> {
    return await chatRequest('/webhook', {
      method: 'POST',
      body: JSON.stringify({ type: 'analyze-intent', message }),
    });
  },

  async generateResponse(
    prompt: string,
    context: Partial<ChatContext>
  ): Promise<{ response: string }> {
    return await chatRequest('/webhook', {
      method: 'POST',
      body: JSON.stringify({
        type: 'generate-response',
        prompt,
        context,
      }),
    });
  },
};
