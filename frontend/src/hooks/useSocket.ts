import { useEffect, useCallback, useState } from 'react';
import { socketService } from '@/lib/socket/socket';

export const useSocketEvent = (event: string, callback: (...args: any[]) => void) => {
  useEffect(() => {
    socketService.on(event, callback);
    return () => {
      socketService.off(event, callback);
    };
  }, [event, callback]);
};

export const useSocket = (token?: string) => {
  const [isConnected, setIsConnected] = useState(socketService.connected);

  useEffect(() => {
    // Attempt connection if token is provided and we aren't connected
    if (token && !socketService.connected) {
      socketService.connect(token).then(() => {
        setIsConnected(true);
      }).catch(console.error);
    }
    
    // Listen for global connect/disconnect to update state
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    
    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);
    
    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
    };
  }, [token]);

  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketService.on(event, callback);
    return () => socketService.off(event, callback);
  }, []);

  const emit = useCallback((event: string, data: any) => {
    socketService.emit(event, data);
  }, []);

  return { 
    on, 
    emit, 
    isConnected,
    joinRoom: useCallback((roomEvent: string, id: string) => {
      emit(roomEvent, id);
    }, [emit])
  };
};