'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

// ====== TYPES ======
export interface SocketUser {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

export interface SocketTweet {
  id: string;
  content: string;
  author: SocketUser;
  media?: Array<{ type: 'image' | 'video'; url: string }>;
  likes: number;
  retweets: number;
  replies: number;
  isLiked: boolean;
  isRetweeted: boolean;
  createdAt: string;
}

export interface SocketNotification {
  id: string;
  type: 'like' | 'retweet' | 'reply' | 'follow' | 'mention';
  fromUser: SocketUser;
  tweet?: SocketTweet;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SocketTypingEvent {
  userId: string;
  username: string;
  chatId?: string;
}

// ====== EVENT INTERFACES ======
export interface ServerToClientEvents {
  new_tweet: (tweet: SocketTweet) => void;
  tweet_created: (tweet: SocketTweet) => void;
  tweet_liked: (data: { tweetId: string; likedBy: string; type: 'like' | 'unlike' }) => void;
  tweet_retweeted: (data: { tweetId: string; retweetedBy: string }) => void;
  tweet_deleted: (tweetId: string) => void;

  receive_notification: (notification: SocketNotification) => void;
  notification_read: (notificationId: string) => void;

  user_typing: (data: SocketTypingEvent) => void;
  user_stopped_typing: (data: { userId: string }) => void;
  new_message: (message: any) => void;

  user_online: (userId: string) => void;
  user_offline: (userId: string) => void;
  user_updated: (user: SocketUser) => void;

  reconnect: (attempt: number) => void;
  reconnect_error: (error: Error) => void;
  reconnect_failed: () => void;
}

export interface ClientToServerEvents {
  new_tweet: (tweet: SocketTweet) => void;
  tweet_like: (data: { tweetId: string; tweetAuthorId: string }) => void;
  tweet_retweet: (data: { tweetId: string; tweetAuthorId: string }) => void;
  delete_tweet: (tweetId: string) => void;

  send_notification: (notification: Omit<SocketNotification, 'id' | 'createdAt' | 'read'>) => void;
  mark_notification_read: (notificationId: string) => void;

  typing_start: (data: { chatId: string }) => void;
  typing_stop: (data: { chatId: string }) => void;
  send_message: (message: any) => void;

  user_activity: (data: { isTyping?: boolean; isOnline?: boolean }) => void;

  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
}

// ====== RETURN TYPE ======
interface UseSocketReturn {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  connect: (token: string) => void;
  disconnect: () => void;
  emitEvent: <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ) => boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
}

// ====== CONFIG ======
const SOCKET_CONFIG = {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: false,
  transports: ['websocket', 'polling'] as const,
};

// ====== MAIN HOOK ======
export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  const connect = useCallback((token: string) => {
    if (typeof window === 'undefined') return; // Prevent SSR

    if (socketRef.current?.connected) {
      console.log('Socket already connected');
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      // Use current browser origin or fallback
      const socketUrl =
        process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin || 'http://localhost:3000';

      const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl, {
        ...SOCKET_CONFIG,
        auth: { token },
      });

      newSocket.on('connect', () => {
        console.log('[SOCKET] Connected');
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('[SOCKET] Disconnected:', reason);
        setIsConnected(false);
        setIsConnecting(false);
      });

      newSocket.on('connect_error', (err) => {
        console.error('[SOCKET] Connection Error:', err.message);
        setIsConnecting(false);
        setConnectionError(err.message);
      });

      socketRef.current = newSocket;
      setSocket(newSocket);
      newSocket.connect();
    } catch (error) {
      console.error('[SOCKET] Initialization failed:', error);
      setIsConnecting(false);
      setConnectionError('Socket init failed');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('[SOCKET] Disconnecting...');
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    }
  }, []);

  const emitEvent = useCallback(
    <K extends keyof ClientToServerEvents>(
      event: K,
      data: Parameters<ClientToServerEvents[K]>[0]
    ) => {
      if (!socketRef.current?.connected) {
        console.warn(`[SOCKET] Cannot emit ${event}: not connected`);
        setConnectionError('Socket not connected');
        return false;
      }
      try {
        socketRef.current.emit(event, data);
        return true;
      } catch (err) {
        console.error(`[SOCKET] Emit error (${event}):`, err);
        return false;
      }
    },
    []
  );

  const joinRoom = useCallback((roomId: string) => emitEvent('join_room', roomId), [emitEvent]);
  const leaveRoom = useCallback((roomId: string) => emitEvent('leave_room', roomId), [emitEvent]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && !socketRef.current) connect(token);
    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
      }
    };
  }, [connect]);

  return {
    socket,
    isConnected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    emitEvent,
    joinRoom,
    leaveRoom,
  };
};

// ====== GENERIC EVENT LISTENER HOOK ======
export const useSocketEvent = <K extends keyof ServerToClientEvents>(
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  event: K,
  callback: ServerToClientEvents[K],
  deps: any[] = []
) => {
  useEffect(() => {
    if (!socket) return;
    socket.on(event, callback);
    return () => socket.off(event, callback);
  }, [socket, event, ...deps]);
};

export default useSocket;
