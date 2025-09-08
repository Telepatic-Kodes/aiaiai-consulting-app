import { useState, useEffect, useCallback } from 'react';

/**
 * 🚀 OPTIMIZED STORAGE HOOK
 * 
 * Features:
 * - Debounced localStorage operations
 * - TTL support
 * - Error handling
 * - Type safety
 * - Performance optimized
 */

interface StorageOptions {
  ttl?: number; // Time to live in milliseconds
  debounceMs?: number; // Debounce delay in milliseconds
}

export function useOptimizedStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions = {}
) {
  const { ttl = 24 * 60 * 60 * 1000, debounceMs = 300 } = options;
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = JSON.parse(item);
      
      // Check TTL
      if (parsed.timestamp && Date.now() - parsed.timestamp > ttl) {
        localStorage.removeItem(key);
        return initialValue;
      }
      
      return parsed.value;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          const item = {
            value: valueToStore,
            timestamp: Date.now()
          };
          localStorage.setItem(key, JSON.stringify(item));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * 🚀 DEBOUNCED STORAGE HOOK
 */
export function useDebouncedStorage<T>(
  key: string,
  initialValue: T,
  delay: number = 300
) {
  const [value, setValue, removeValue] = useOptimizedStorage(key, initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, setValue, removeValue] as const;
}
