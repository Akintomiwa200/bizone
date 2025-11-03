import { useState, useCallback, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { chatAPI, ChatMessage, ChatSession, ChatResponse } from '@/lib/api/chat';
import { chatEngine } from '@/lib/ai/chat-engine';
import { notificationService } from '@/lib/services/notification-service';
import { useAuth } from './useAuth';

export interface UseChatReturn {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  createSession: (title?: string) => Promise<void>;
  selectSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearSession: (sessionId: string) => Promise<void>;
  fetchSessions: () => Promise<void>;
  getSuggestions: () => Promise<string[]>;
  clearError: () => void;
}

export const useChat = (): UseChatReturn => {
  const {
    chatSessions,
    currentSession,
    currentMessages,
    chatLoading,
    chatError,
    isTyping,
    fetchSessions: storeFetchSessions,
    createSession: storeCreateSession,
    selectSession: storeSelectSession,
    sendMessage: storeSendMessage,
    deleteSession: storeDeleteSession,
    clearSession: storeClearSession,
    clearCurrentSession: storeClearCurrentSession,
  } = useStore();

  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !currentSession) return;

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      await storeSendMessage(content);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        notificationService.error('Message Failed', 'Failed to send message. Please try again.');
        throw error;
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, [currentSession, storeSendMessage]);

  const createSession = useCallback(async (title?: string) => {
    try {
      await storeCreateSession(title);
      notificationService.success('Chat Started', 'New chat session created');
    } catch (error: any) {
      notificationService.error('Session Failed', 'Failed to create chat session');
      throw error;
    }
  }, [storeCreateSession]);

  const selectSession = useCallback(async (sessionId: string) => {
    try {
      await storeSelectSession(sessionId);
    } catch (error: any) {
      notificationService.error('Load Failed', 'Failed to load chat session');
      throw error;
    }
  }, [storeSelectSession]);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      await storeDeleteSession(sessionId);
      notificationService.success('Session Deleted', 'Chat session has been deleted');
    } catch (error: any) {
      notificationService.error('Deletion Failed', 'Failed to delete chat session');
      throw error;
    }
  }, [storeDeleteSession]);

  const clearSession = useCallback(async (sessionId: string) => {
    try {
      await storeClearSession(sessionId);
      notificationService.info('Chat Cleared', 'Chat history has been cleared');
    } catch (error: any) {
      notificationService.error('Clear Failed', 'Failed to clear chat history');
      throw error;
    }
  }, [storeClearSession]);

  const fetchSessions = useCallback(async () => {
    try {
      await storeFetchSessions();
    } catch (error) {
      throw error;
    }
  }, [storeFetchSessions]);

  const getSuggestions = useCallback(async (): Promise<string[]> => {
    if (!currentSession) return [];

    try {
      return await chatAPI.getSuggestions(currentSession.id);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      return [];
    }
  }, [currentSession]);

  const analyzeIntent = useCallback(async (message: string) => {
    try {
      return await chatAPI.analyzeIntent(message);
    } catch (error) {
      console.error('Failed to analyze intent:', error);
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    useStore.getState().chatError = null;
  }, []);

  // Auto-create first session if none exists
  useEffect(() => {
    if (chatSessions.length === 0 && user) {
      createSession('Welcome Chat');
    }
  }, [chatSessions.length, user, createSession]);

  // Auto-select first session if none selected
  useEffect(() => {
    if (chatSessions.length > 0 && !currentSession) {
      selectSession(chatSessions[0].id);
    }
  }, [chatSessions, currentSession, selectSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Enhanced chat context for AI
  const chatContext = useCallback(() => {
    if (!user || !currentSession) return null;

    return {
      businessId: user.businessName, // Using businessName as businessId for demo
      userId: user.id,
      sessionId: currentSession.id,
      recentMessages: currentMessages.slice(-10), // Last 10 messages for context
      userPreferences: {
        language: 'en',
        tone: 'friendly' as const,
      },
    };
  }, [user, currentSession, currentMessages]);

  return {
    sessions: chatSessions,
    currentSession,
    messages: currentMessages,
    isLoading: chatLoading || isProcessing,
    isTyping,
    error: chatError,
    sendMessage,
    createSession,
    selectSession,
    deleteSession,
    clearSession,
    fetchSessions,
    getSuggestions,
    analyzeIntent,
    clearError,
  };
};