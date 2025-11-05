import { useState, useEffect, useCallback } from 'react';
import { offlineService } from '@/lib/services/offline-service';
import { notificationService } from '@/lib/services/notification-service';

export interface UseOnlineStatusReturn {
  isOnline: boolean;
  isOffline: boolean;
  queuedActions: number;
  syncQueue: Array<{ id: string; type: string; timestamp: string }>;
  retryFailedActions: () => Promise<void>;
  clearQueue: () => Promise<void>;
  queueAction: (type: string, payload: any, maxRetries?: number) => Promise<string>;
  isSyncing: boolean;
}

export const useOnlineStatus = (): UseOnlineStatusReturn => {
  const [isOnline, setIsOnline] = useState(true);
  const [queuedActions, setQueuedActions] = useState(0);
  const [syncQueue, setSyncQueue] = useState<Array<{ id: string; type: string; timestamp: string }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const updateStatus = useCallback((online: boolean) => {
    setIsOnline(online);
    
    if (online) {
      notificationService.success('Back Online', 'Connection restored. Syncing pending actions...');
    } else {
      notificationService.warning('Offline Mode', 'You are currently offline. Changes will be synced when connection is restored.');
    }
  }, []);

  const updateQueueInfo = useCallback(() => {
    const actions = offlineService.getQueuedActions();
    setQueuedActions(actions.length);
    setSyncQueue(actions.map(action => ({
      id: action.id,
      type: action.type,
      timestamp: action.timestamp,
    })));
  }, []);

  const retryFailedActions = useCallback(async () => {
    setIsSyncing(true);
    try {
      await offlineService.retryFailedActions();
      notificationService.info('Sync Retry', 'Retrying failed sync actions...');
    } catch (error) {
      notificationService.error('Sync Failed', 'Failed to retry sync actions');
    } finally {
      setIsSyncing(false);
      updateQueueInfo();
    }
  }, [updateQueueInfo]);

  const clearQueue = useCallback(async () => {
    setIsSyncing(true);
    try {
      await offlineService.clearQueue();
      notificationService.success('Queue Cleared', 'All pending actions have been cleared');
    } catch (error) {
      notificationService.error('Clear Failed', 'Failed to clear sync queue');
    } finally {
      setIsSyncing(false);
      updateQueueInfo();
    }
  }, [updateQueueInfo]);

  const queueAction = useCallback(async (type: string, payload: any, maxRetries: number = 3): Promise<string> => {
    const actionId = await offlineService.queueAction(type, payload, maxRetries);
    updateQueueInfo();
    
    if (!isOnline) {
      notificationService.info('Action Queued', 'Action has been queued and will sync when online');
    }
    
    return actionId;
  }, [isOnline, updateQueueInfo]);

  // Subscribe to connection changes
  useEffect(() => {
    offlineService.onConnectionChange(updateStatus);
    return () => {
      offlineService.removeConnectionChangeListener(updateStatus);
    };
  }, [updateStatus]);

  // Initial status and queue info
  useEffect(() => {
    setIsOnline(offlineService.isOnlineMode());
    updateQueueInfo();
  }, [updateQueueInfo]);

  // Listen to browser online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      updateStatus(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      updateStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [updateStatus]);

  return {
    isOnline,
    isOffline: !isOnline,
    queuedActions,
    syncQueue,
    retryFailedActions,
    clearQueue,
    queueAction,
    isSyncing,
  };
};

export interface UseOfflineActionReturn {
  execute: (action: () => Promise<any>, fallback?: () => any) => Promise<any>;
  isExecuting: boolean;
  lastError: string | null;
}

export const useOfflineAction = (): UseOfflineActionReturn => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const { isOnline, queueAction } = useOnlineStatus();

  const execute = useCallback(async (action: () => Promise<any>, fallback?: () => any) => {
    setIsExecuting(true);
    setLastError(null);

    try {
      if (isOnline) {
        // Execute immediately if online
        return await action();
      } else {
        // Queue for later execution if offline
        if (fallback) {
          // Execute fallback and queue the main action
          const fallbackResult = fallback();
          await queueAction('SYNC_ACTION', { action: action.toString() });
          return fallbackResult;
        } else {
          // Just queue the action
          await queueAction('SYNC_ACTION', { action: action.toString() });
          throw new Error('Action queued for offline execution');
        }
      }
    } catch (error: any) {
      setLastError(error.message);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  }, [isOnline, queueAction]);

  return {
    execute,
    isExecuting,
    lastError,
  };
};