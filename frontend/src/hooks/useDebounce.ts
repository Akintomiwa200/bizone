import { useState, useEffect, useRef } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export interface UseDebouncedCallbackOptions {
  delay: number;
  leading?: boolean;
  trailing?: boolean;
}

export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  options: UseDebouncedCallbackOptions
): ((...args: Parameters<T>) => void) => {
  const { delay, leading = false, trailing = true } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef<T>(callback);
  const lastExecutedRef = useRef<number>(0);

  // Update callback ref if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    const now = Date.now();

    // Leading edge execution
    if (leading && now - lastExecutedRef.current >= delay) {
      lastExecutedRef.current = now;
      callbackRef.current(...args);
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Trailing edge execution
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        lastExecutedRef.current = Date.now();
        callbackRef.current(...args);
      }, delay);
    }
  };
};

export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

export interface UseDebouncedStateReturn<T> {
  value: T;
  debouncedValue: T;
  setValue: (value: T) => void;
  isDebouncing: boolean;
}

export const useDebouncedState = <T>(
  initialValue: T,
  delay: number
): UseDebouncedStateReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsDebouncing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return {
    value,
    debouncedValue,
    setValue,
    isDebouncing,
  };
};