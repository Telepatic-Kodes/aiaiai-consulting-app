/**
 * AuthManager Class
 * 
 * Features:
 * - Centralized authentication management
 * - API integration
 * - Token management
 * - User state management
 * - Error handling
 */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
}

export class AuthManager {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.clearStorage();
        }
      }
    }
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private setUser(user: User): void {
    this.user = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  private clearStorage(): void {
    this.token = null;
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  async login(credentials: LoginData): Promise<User> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el login');
      }

      if (data.success && data.user && data.token) {
        this.setToken(data.token);
        this.setUser(data.user);
        return data.user;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      if (data.success && data.user && data.token) {
        this.setToken(data.token);
        this.setUser(data.user);
        return data.user;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // In a real app, you might want to call a logout API endpoint
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      this.clearStorage();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local storage
      this.clearStorage();
    }
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.user !== null;
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  hasPermission(permission: string): boolean {
    // Simple permission check - extend as needed
    if (!this.user) return false;
    
    switch (this.user.role) {
      case 'admin':
        return true;
      case 'user':
        return ['read', 'write'].includes(permission);
      case 'viewer':
        return permission === 'read';
      default:
        return false;
    }
  }
}


