/**
 * Theme Management System
 * 
 * Features:
 * - Dark/Light mode toggle
 * - System preference detection
 * - Persistent theme storage
 * - Smooth transitions
 * - Professional color schemes
 */

export type Theme = 'light' | 'dark' | 'system';

class ThemeManager {
  private currentTheme: Theme = 'system';
  private listeners: ((theme: Theme) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.currentTheme = this.getStoredTheme();
      this.applyTheme(this.currentTheme);
    }
  }

  subscribe(listener: (theme: Theme) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }

  private getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    
    const stored = localStorage.getItem('aiaiai-theme') as Theme;
    return stored || 'system';
  }

  private storeTheme(theme: Theme) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('aiaiai-theme', theme);
  }

  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme) {
    if (typeof window === 'undefined') return;

    const actualTheme = theme === 'system' ? this.getSystemTheme() : theme;
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(actualTheme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', actualTheme === 'dark' ? '#1f2937' : '#ffffff');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.applyTheme(theme);
    this.notify();
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  getActualTheme(): 'light' | 'dark' {
    return this.currentTheme === 'system' ? this.getSystemTheme() : this.currentTheme;
  }

  toggle() {
    const actualTheme = this.getActualTheme();
    this.setTheme(actualTheme === 'light' ? 'dark' : 'light');
  }
}

export const themeManager = new ThemeManager();

// Theme-aware color utilities
export const getThemeColors = (theme: 'light' | 'dark') => ({
  background: theme === 'dark' ? '#111827' : '#ffffff',
  surface: theme === 'dark' ? '#1f2937' : '#f9fafb',
  primary: theme === 'dark' ? '#60a5fa' : '#3b82f6',
  text: theme === 'dark' ? '#f9fafb' : '#111827',
  textSecondary: theme === 'dark' ? '#d1d5db' : '#6b7280',
  border: theme === 'dark' ? '#374151' : '#e5e7eb',
  success: theme === 'dark' ? '#34d399' : '#10b981',
  warning: theme === 'dark' ? '#fbbf24' : '#f59e0b',
  error: theme === 'dark' ? '#f87171' : '#ef4444',
  info: theme === 'dark' ? '#60a5fa' : '#3b82f6'
});
