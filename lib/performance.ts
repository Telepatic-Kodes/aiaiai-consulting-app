/**
 * Performance Optimization System
 * 
 * Features:
 * - Lazy loading
 * - Image optimization
 * - Bundle analysis
 * - Caching strategies
 * - Performance monitoring
 */

import React from 'react';

// Lazy loading utilities
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  return React.lazy(importFunc);
}

// Image optimization
export function optimizeImage(
  src: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  // In a real implementation, you would use a service like Cloudinary or ImageKit
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', 'auto'); // Auto format
  
  return `${src}?${params.toString()}`;
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance monitoring
class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupObservers();
    }
  }

  private setupObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.set('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
            this.metrics.set('loadComplete', navEntry.loadEventEnd - navEntry.loadEventStart);
            this.metrics.set('firstByte', navEntry.responseStart - navEntry.requestStart);
          }
        }
      });
      
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);

      // Observe paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.metrics.set(entry.name, entry.startTime);
          }
        }
      });
      
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);
    }
  }

  mark(name: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark?: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }
    }
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  getCoreWebVitals() {
    return {
      FCP: this.metrics.get('first-contentful-paint') || 0,
      LCP: this.metrics.get('largest-contentful-paint') || 0,
      FID: this.metrics.get('first-input-delay') || 0,
      CLS: this.metrics.get('cumulative-layout-shift') || 0
    };
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Bundle analysis utilities
export function analyzeBundle() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const bundleAnalysis = {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      fontSize: 0,
      otherSize: 0,
      resources: resources.map(resource => ({
        name: resource.name,
        size: resource.transferSize,
        type: resource.name.split('.').pop() || 'unknown'
      }))
    };

    resources.forEach(resource => {
      bundleAnalysis.totalSize += resource.transferSize;
      
      const extension = resource.name.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'js':
          bundleAnalysis.jsSize += resource.transferSize;
          break;
        case 'css':
          bundleAnalysis.cssSize += resource.transferSize;
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'svg':
          bundleAnalysis.imageSize += resource.transferSize;
          break;
        case 'woff':
        case 'woff2':
        case 'ttf':
        case 'otf':
          bundleAnalysis.fontSize += resource.transferSize;
          break;
        default:
          bundleAnalysis.otherSize += resource.transferSize;
      }
    });

    return bundleAnalysis;
  }
  
  return null;
}

// Caching strategies
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

export const cacheManager = new CacheManager();

// Virtual scrolling utility
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop
  };
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };
  }
  return null;
}

// Performance recommendations
export function getPerformanceRecommendations() {
  const recommendations = [];
  const memory = getMemoryUsage();
  const metrics = performanceMonitor.getMetrics();
  
  if (memory && memory.usage > 80) {
    recommendations.push({
      type: 'warning',
      message: 'Alto uso de memoria detectado. Considera optimizar el código o limpiar cachés.',
      action: 'Limpiar caché'
    });
  }
  
  if (metrics.domContentLoaded && metrics.domContentLoaded > 3000) {
    recommendations.push({
      type: 'warning',
      message: 'Tiempo de carga lento. Considera optimizar imágenes y scripts.',
      action: 'Optimizar recursos'
    });
  }
  
  if (metrics.firstByte && metrics.firstByte > 1000) {
    recommendations.push({
      type: 'info',
      message: 'Tiempo de respuesta del servidor lento. Considera usar CDN.',
      action: 'Configurar CDN'
    });
  }
  
  return recommendations;
}
