import { storageService } from './storage-service';
import { notificationService } from './notification-service';

export interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
  retries: number;
  maxRetries: number;
}

export interface SyncResult {
  success: boolean;
  actionId: string;
  error?: string;
}

export class OfflineService {
  private static instance: OfflineService;
  private isOnline: boolean = true;
  private syncQueue: OfflineAction[] = [];
  private syncInProgress: boolean = false;
  private syncListeners: Array<(online: boolean) => void> = [];

  public static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  constructor() {
    this.initializeOnlineStatus();
    this.setupEventListeners();
    this.loadSyncQueue();
  }

  private initializeOnlineStatus(): void {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private setupEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));
    }
  }

  private async loadSyncQueue(): Promise<void> {
    try {
      const queue = await storageService.getFromIndexedDB<OfflineAction[]>('offlineData', 'syncQueue');
      this.syncQueue = queue || [];
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.syncQueue = [];
    }
  }

  private async saveSyncQueue(): Promise<void> {
    try {
      await storageService.saveToIndexedDB('offlineData', {
        id: 'syncQueue',
        data: this.syncQueue,
      });
    } catch (error) {
      console.error('Failed to save sync queue:', error);
    }
  }

  private handleOnline(): void {
    this.isOnline = true;
    this.notifyListeners(true);
    notificationService.info('Connection Restored', 'You are back online. Syncing pending actions...');
    this.processSyncQueue();
  }

  private handleOffline(): void {
    this.isOnline = false;
    this.notifyListeners(false);
    notificationService.warning('Offline Mode', 'You are currently offline. Changes will be synced when connection is restored.');
  }

  private notifyListeners(online: boolean): void {
    this.syncListeners.forEach(listener => listener(online));
  }

  onConnectionChange(listener: (online: boolean) => void): void {
    this.syncListeners.push(listener);
  }

  removeConnectionChangeListener(listener: (online: boolean) => void): void {
    const index = this.syncListeners.indexOf(listener);
    if (index > -1) {
      this.syncListeners.splice(index, 1);
    }
  }

  isOnlineMode(): boolean {
    return this.isOnline;
  }

  async queueAction(type: string, payload: any, maxRetries: number = 3): Promise<string> {
    const action: OfflineAction = {
      id: this.generateId(),
      type,
      payload,
      timestamp: new Date().toISOString(),
      retries: 0,
      maxRetries,
    };

    this.syncQueue.push(action);
    await this.saveSyncQueue();

    // If online, try to process immediately
    if (this.isOnline) {
      this.processSyncQueue();
    }

    return action.id;
  }

  private generateId(): string {
    return `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async processSyncQueue(): Promise<void> {
    if (this.syncInProgress || !this.isOnline || this.syncQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;

    try {
      const results: SyncResult[] = [];
      
      for (const action of [...this.syncQueue]) {
        try {
          const success = await this.executeAction(action);
          
          if (success) {
            // Remove successful action from queue
            this.syncQueue = this.syncQueue.filter(a => a.id !== action.id);
            results.push({ success: true, actionId: action.id });
          } else {
            action.retries++;
            
            if (action.retries >= action.maxRetries) {
              // Remove action after max retries
              this.syncQueue = this.syncQueue.filter(a => a.id !== action.id);
              results.push({
                success: false,
                actionId: action.id,
                error: 'Max retries exceeded',
              });
            }
          }
        } catch (error) {
          console.error(`Failed to execute action ${action.id}:`, error);
          action.retries++;
        }
      }

      await this.saveSyncQueue();
      this.notifySyncComplete(results);

    } finally {
      this.syncInProgress = false;
    }
  }

  private async executeAction(action: OfflineAction): Promise<boolean> {
    try {
      switch (action.type) {
        case 'CREATE_ORDER':
          return await this.syncCreateOrder(action.payload);
        case 'UPDATE_ORDER':
          return await this.syncUpdateOrder(action.payload);
        case 'CREATE_PRODUCT':
          return await this.syncCreateProduct(action.payload);
        case 'UPDATE_PRODUCT':
          return await this.syncUpdateProduct(action.payload);
        case 'SEND_MESSAGE':
          return await this.syncSendMessage(action.payload);
        default:
          console.warn(`Unknown action type: ${action.type}`);
          return true; // Remove unknown actions
      }
    } catch (error) {
      console.error(`Action execution failed for ${action.type}:`, error);
      return false;
    }
  }

  private async syncCreateOrder(payload: any): Promise<boolean> {
    // Import dynamically to avoid circular dependencies
    const { ordersAPI } = await import('@/lib/api/orders');
    
    try {
      await ordersAPI.createOrder(payload);
      return true;
    } catch (error) {
      console.error('Failed to sync order creation:', error);
      return false;
    }
  }

  private async syncUpdateOrder(payload: any): Promise<boolean> {
    const { ordersAPI } = await import('@/lib/api/orders');
    
    try {
      await ordersAPI.updateOrder(payload.id, payload.data);
      return true;
    } catch (error) {
      console.error('Failed to sync order update:', error);
      return false;
    }
  }

  private async syncCreateProduct(payload: any): Promise<boolean> {
    const { productsAPI } = await import('@/lib/api/products');
    
    try {
      await productsAPI.createProduct(payload);
      return true;
    } catch (error) {
      console.error('Failed to sync product creation:', error);
      return false;
    }
  }

  private async syncUpdateProduct(payload: any): Promise<boolean> {
    const { productsAPI } = await import('@/lib/api/products');
    
    try {
      await productsAPI.updateProduct(payload.id, payload.data);
      return true;
    } catch (error) {
      console.error('Failed to sync product update:', error);
      return false;
    }
  }

  private async syncSendMessage(payload: any): Promise<boolean> {
    const { whatsappAPI } = await import('@/lib/api/whatsapp');
    
    try {
      await whatsappAPI.sendMessage(payload);
      return true;
    } catch (error) {
      console.error('Failed to sync message sending:', error);
      return false;
    }
  }

  private notifySyncComplete(results: SyncResult[]): void {
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    if (successful > 0) {
      notificationService.success(
        'Sync Complete',
        `Successfully synced ${successful} action(s)`
      );
    }

    if (failed > 0) {
      notificationService.error(
        'Sync Issues',
        `${failed} action(s) failed to sync and will be retried`
      );
    }
  }

  getQueuedActions(): OfflineAction[] {
    return [...this.syncQueue];
  }

  getQueuedActionCount(): number {
    return this.syncQueue.length;
  }

  async clearQueue(): Promise<void> {
    this.syncQueue = [];
    await this.saveSyncQueue();
  }

  async retryFailedActions(): Promise<void> {
    const failedActions = this.syncQueue.filter(action => action.retries > 0);
    
    for (const action of failedActions) {
      action.retries = 0; // Reset retry count
    }

    await this.saveSyncQueue();
    this.processSyncQueue();
  }

  // Data caching methods
  async cacheData(key: string, data: any, ttl: number = 3600000): Promise<void> { // 1 hour default
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    await storageService.saveToIndexedDB('offlineData', {
      id: `cache_${key}`,
      ...cacheItem,
    });
  }

  async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cacheItem = await storageService.getFromIndexedDB<{
        data: T;
        timestamp: number;
        ttl: number;
      }>('offlineData', `cache_${key}`);

      if (!cacheItem) {
        return null;
      }

      const isExpired = Date.now() - cacheItem.timestamp > cacheItem.ttl;
      if (isExpired) {
        await this.removeCachedData(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Error reading cached data:', error);
      return null;
    }
  }

  async removeCachedData(key: string): Promise<void> {
    await storageService.deleteFromIndexedDB('offlineData', `cache_${key}`);
  }

  async clearExpiredCache(): Promise<void> {
    // This would typically iterate through all cache items and remove expired ones
    // For simplicity, we're not implementing the full iteration here
    console.log('Clearing expired cache...');
  }
}

export const offlineService = OfflineService.getInstance();