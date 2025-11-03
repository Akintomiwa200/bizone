import { useState, useEffect, useCallback } from 'react';
import { storageService } from '@/lib/services/storage-service';

export interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  isPersisting: boolean;
}

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T | null = null
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(defaultValue);
  const [isPersisting, setIsPersisting] = useState(false);

  // Load value from localStorage on mount
  useEffect(() => {
    try {
      const storedValue = storageService.getItem<T>(key);
      if (storedValue !== null) {
        setValue(storedValue);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = useCallback((newValue: T) => {
    setIsPersisting(true);
    try {
      storageService.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    } finally {
      setIsPersisting(false);
    }
  }, [key]);

  const removeStoredValue = useCallback(() => {
    setIsPersisting(true);
    try {
      storageService.removeItem(key);
      setValue(defaultValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    } finally {
      setIsPersisting(false);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue: removeStoredValue,
    isPersisting,
  };
};

export interface UseSessionStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  isPersisting: boolean;
}

export const useSessionStorage = <T>(
  key: string,
  defaultValue: T | null = null
): UseSessionStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(defaultValue);
  const [isPersisting, setIsPersisting] = useState(false);

  // Load value from sessionStorage on mount
  useEffect(() => {
    try {
      const storedValue = storageService.getSessionItem<T>(key);
      if (storedValue !== null) {
        setValue(storedValue);
      }
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = useCallback((newValue: T) => {
    setIsPersisting(true);
    try {
      storageService.setSessionItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    } finally {
      setIsPersisting(false);
    }
  }, [key]);

  const removeStoredValue = useCallback(() => {
    setIsPersisting(true);
    try {
      storageService.removeSessionItem(key);
      setValue(defaultValue);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    } finally {
      setIsPersisting(false);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue: removeStoredValue,
    isPersisting,
  };
};

export interface UseIndexedDBReturn<T> {
  value: T | null;
  setValue: (value: T) => Promise<void>;
  removeValue: () => Promise<void>;
  isPersisting: boolean;
}

export const useIndexedDB = <T>(
  storeName: string,
  key: string,
  defaultValue: T | null = null
): UseIndexedDBReturn<T> => {
  const [value, setValue] = useState<T | null>(defaultValue);
  const [isPersisting, setIsPersisting] = useState(false);

  // Load value from IndexedDB on mount
  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await storageService.getFromIndexedDB<T>(storeName, key);
        if (storedValue !== null) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error(`Error reading IndexedDB key "${key}":`, error);
      }
    };

    loadValue();
  }, [storeName, key]);

  const setStoredValue = useCallback(async (newValue: T) => {
    setIsPersisting(true);
    try {
      await storageService.saveToIndexedDB(storeName, {
        id: key,
        data: newValue,
      });
      setValue(newValue);
    } catch (error) {
      console.error(`Error setting IndexedDB key "${key}":`, error);
      throw error;
    } finally {
      setIsPersisting(false);
    }
  }, [storeName, key]);

  const removeStoredValue = useCallback(async () => {
    setIsPersisting(true);
    try {
      await storageService.deleteFromIndexedDB(storeName, key);
      setValue(defaultValue);
    } catch (error) {
      console.error(`Error removing IndexedDB key "${key}":`, error);
      throw error;
    } finally {
      setIsPersisting(false);
    }
  }, [storeName, key, defaultValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue: removeStoredValue,
    isPersisting,
  };
};