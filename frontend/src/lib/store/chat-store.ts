import { StateCreator } from 'zustand';
import { chatAPI, ChatMessage, ChatSession, ChatResponse } from '@/lib/api/chat';

export interface ChatState {
  chatSessions: ChatSession[];
  currentSession: ChatSession | null;
  currentMessages: ChatMessage[];
  chatLoading: boolean;
  chatError: string | null;
  isTyping: boolean;
  fetchSessions: () => Promise<void>;
  createSession: (title?: string) => Promise<ChatSession>;
  selectSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearSession: (sessionId: string) => Promise<void>;
  clearCurrentSession: () => void;
}

export const chatStore: StateCreator<ChatState> = (set, get) => ({
  chatSessions: [],
  currentSession: null,
  currentMessages: [],
  chatLoading: false,
  chatError: null,
  isTyping: false,

  fetchSessions: async () => {
    set({ chatLoading: true, chatError: null });
    try {
      const sessions = await chatAPI.getSessions();
      set({ chatSessions: sessions, chatLoading: false });
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to fetch chat sessions',
        chatLoading: false,
      });
    }
  },

  createSession: async (title?: string): Promise<ChatSession> => {
    set({ chatLoading: true, chatError: null });
    try {
      const session = await chatAPI.createSession(title);
      set((state) => ({
        chatSessions: [session, ...state.chatSessions],
        currentSession: session,
        currentMessages: [],
        chatLoading: false,
      }));
      return session;
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to create chat session',
        chatLoading: false,
      });
      throw error;
    }
  },

  selectSession: async (sessionId: string) => {
    set({ chatLoading: true, chatError: null });
    try {
      const { session, messages } = await chatAPI.getSession(sessionId);
      set({
        currentSession: session,
        currentMessages: messages,
        chatLoading: false,
      });
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to fetch chat session',
        chatLoading: false,
      });
    }
  },

  sendMessage: async (message: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    set((state) => ({
      currentMessages: [...state.currentMessages, userMessage],
      isTyping: true,
    }));

    try {
      const response = await chatAPI.sendMessage(currentSession.id, message);
      set((state) => ({
        currentMessages: [...state.currentMessages, response.message],
        isTyping: false,
      }));

      // Update session list with latest message
      set((state) => ({
        chatSessions: state.chatSessions.map((session) =>
          session.id === currentSession.id
            ? {
                ...session,
                lastMessage: response.message.content,
                updatedAt: new Date().toISOString(),
                messageCount: session.messageCount + 1,
              }
            : session
        ),
      }));
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to send message',
        isTyping: false,
      });
    }
  },

  deleteSession: async (sessionId: string) => {
    set({ chatLoading: true, chatError: null });
    try {
      await chatAPI.deleteSession(sessionId);
      set((state) => ({
        chatSessions: state.chatSessions.filter((session) => session.id !== sessionId),
        currentSession: state.currentSession?.id === sessionId ? null : state.currentSession,
        currentMessages: state.currentSession?.id === sessionId ? [] : state.currentMessages,
        chatLoading: false,
      }));
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to delete chat session',
        chatLoading: false,
      });
    }
  },

  clearSession: async (sessionId: string) => {
    set({ chatLoading: true, chatError: null });
    try {
      await chatAPI.clearSession(sessionId);
      set((state) => ({
        currentMessages: state.currentSession?.id === sessionId ? [] : state.currentMessages,
        chatLoading: false,
      }));
    } catch (error: any) {
      set({
        chatError: error.response?.data?.message || 'Failed to clear chat session',
        chatLoading: false,
      });
    }
  },

  clearCurrentSession: () => {
    set({ currentSession: null, currentMessages: [] });
  },
});