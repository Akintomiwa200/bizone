import { ChatMessage, ChatSession } from '@/lib/api/chat';

interface SessionRecord {
  session: ChatSession;
  messages: ChatMessage[];
}

const sessionStore = new Map<string, SessionRecord>();

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const createSessionRecord = (title?: string): SessionRecord => {
  const now = new Date().toISOString();
  const id = makeId();
  const session: ChatSession = {
    id,
    title: title || 'New Chat',
    lastMessage: '',
    messageCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  const record: SessionRecord = { session, messages: [] };
  sessionStore.set(id, record);
  return record;
};

export const listSessions = (): ChatSession[] =>
  Array.from(sessionStore.values())
    .map((record) => record.session)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

export const getSessionRecord = (sessionId: string): SessionRecord | null =>
  sessionStore.get(sessionId) || null;

export const upsertMessage = (
  sessionId: string,
  message: ChatMessage
): SessionRecord | null => {
  const record = sessionStore.get(sessionId);
  if (!record) {
    return null;
  }

  record.messages.push(message);
  record.session = {
    ...record.session,
    lastMessage: message.content,
    messageCount: record.messages.length,
    updatedAt: new Date().toISOString(),
  };

  sessionStore.set(sessionId, record);
  return record;
};

export const clearSessionMessages = (sessionId: string): boolean => {
  const record = sessionStore.get(sessionId);
  if (!record) return false;
  record.messages = [];
  record.session = {
    ...record.session,
    lastMessage: '',
    messageCount: 0,
    updatedAt: new Date().toISOString(),
  };
  sessionStore.set(sessionId, record);
  return true;
};

export const deleteSessionRecord = (sessionId: string): boolean => sessionStore.delete(sessionId);
