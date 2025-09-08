"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  plan: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🚀 OPTIMIZED STORAGE UTILITIES
const STORAGE_KEYS = {
  USER: 'aiaiai-user',
  TOKEN: 'aiaiai-token',
  TIMESTAMP: 'aiaiai-timestamp'
} as const;

const STORAGE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const storageUtils = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      // Check TTL for timestamped items
      if (key === STORAGE_KEYS.USER) {
        const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
        if (timestamp && Date.now() - parseInt(timestamp) > STORAGE_TTL) {
          storageUtils.clear();
          return null;
        }
      }
      
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing ${key}:`, error);
      localStorage.removeItem(key);
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (key === STORAGE_KEYS.USER) {
        localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
      }
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  },
  
  clear: () => {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🚀 OPTIMIZED INITIALIZATION
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = storageUtils.get(STORAGE_KEYS.USER);
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        storageUtils.clear();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 🚀 MEMOIZED LOGIN FUNCTION
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call with optimized timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any email/password combination
      const userData: User = {
        id: 'demo-user-001',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        email: email,
        phone: '+56 9 8765 4321',
        company: 'TechConsulting LATAM',
        position: 'CEO & Fundador',
        plan: 'Premium',
        status: 'active'
      };
      
      setUser(userData);
      storageUtils.set(STORAGE_KEYS.USER, userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 MEMOIZED REGISTER FUNCTION
  const register = useCallback(async (userData: any): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call with optimized timeout
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        company: userData.company,
        position: userData.position,
        plan: 'Premium',
        status: 'active'
      };
      
      setUser(newUser);
      storageUtils.set(STORAGE_KEYS.USER, newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 MEMOIZED LOGOUT FUNCTION
  const logout = useCallback(() => {
    setUser(null);
    storageUtils.clear();
  }, []);

  // 🚀 MEMOIZED CONTEXT VALUE
  const value: AuthContextType = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  }), [user, login, register, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
