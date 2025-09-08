import { useEffect, useRef, useCallback } from 'react';

/**
 * 🚀 PERFORMANCE OPTIMIZATION HOOKS
 * 
 * Features:
 * - Intersection Observer for lazy loading
 * - Performance monitoring
 * - Memory leak prevention
 * - Optimized event listeners
 */

/**
 * Hook for intersection observer (lazy loading)
 */
export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return targetRef;
}

/**
 * Hook for performance monitoring
 */
export function usePerformanceMonitor(componentName: string) {
  const renderStartRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
    renderCountRef.current += 1;

    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${componentName} render #${renderCountRef.current}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  return {
    renderCount: renderCountRef.current,
    measureRender: useCallback((fn: () => void) => {
      const start = performance.now();
      fn();
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${componentName} operation: ${(end - start).toFixed(2)}ms`);
      }
    }, [componentName])
  };
}

/**
 * Hook for optimized event listeners
 */
export function useOptimizedEventListener<T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  element: Window | Element | null = window,
  options: AddEventListenerOptions = {}
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return;

    const eventListener = (event: Event) => {
      handlerRef.current(event as WindowEventMap[T]);
    };

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

/**
 * Hook for memory leak prevention
 */
export function useCleanup() {
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
    };
  }, []);

  return addCleanup;
}
