/**
 * AIAIAI Consulting - Authentication Utilities
 * Basic authentication system for development and demo purposes
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  company?: string;
  lastLogin?: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
  role?: 'user' | 'viewer';
}

// Mock users for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@aiaiai.cl',
    role: 'admin',
    avatar: 'A',
    company: 'AIAIAI Consulting',
    lastLogin: new Date().toISOString(),
    permissions: ['read', 'write', 'delete', 'admin']
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria@techcorp.cl',
    role: 'user',
    avatar: 'M',
    company: 'TechCorp Chile',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    permissions: ['read', 'write']
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@innovate.cl',
    role: 'viewer',
    avatar: 'C',
    company: 'Innovate Solutions',
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    permissions: ['read']
  }
];

// Storage keys
const STORAGE_KEYS = {
  TOKEN: 'aiaiai_auth_token',
  USER: 'aiaiai_user_data',
  REMEMBER_ME: 'aiaiai_remember_me'
};

/**
 * Generate a mock JWT token
 */
function generateMockToken(user: User): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  // Simple base64 encoding for demo purposes
  return btoa(JSON.stringify(payload));
}

/**
 * Decode a mock JWT token
 */
function decodeMockToken(token: string): any {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

/**
 * Check if token is valid
 */
function isTokenValid(token: string): boolean {
  const payload = decodeMockToken(token);
  if (!payload) return false;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

/**
 * Get user from token
 */
function getUserFromToken(token: string): User | null {
  const payload = decodeMockToken(token);
  if (!payload) return null;
  
  return MOCK_USERS.find(user => user.id === payload.sub) || null;
}

/**
 * Simulate API delay
 */
function delay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Login user with credentials
 */
export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  await delay(500); // Simulate API call
  
  const user = MOCK_USERS.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  // Mock password validation (in real app, this would be server-side)
  const validPassword = credentials.password === 'demo123' || 
                       credentials.password === 'password' ||
                       credentials.password === 'admin123';
  
  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }
  
  const token = generateMockToken(user);
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  
  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  
  if (credentials.rememberMe) {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
  }
  
  return { user, token };
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<{ user: User; token: string }> {
  await delay(800); // Simulate API call
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(u => u.email === data.email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  
  // Create new user
  const newUser: User = {
    id: (MOCK_USERS.length + 1).toString(),
    name: data.name,
    email: data.email,
    role: data.role || 'user',
    avatar: data.name.charAt(0).toUpperCase(),
    company: data.company,
    lastLogin: new Date().toISOString(),
    permissions: data.role === 'admin' ? ['read', 'write', 'delete', 'admin'] : 
                 data.role === 'user' ? ['read', 'write'] : ['read']
  };
  
  // Add to mock users (in real app, this would be server-side)
  MOCK_USERS.push(newUser);
  
  const token = generateMockToken(newUser);
  
  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  
  return { user: newUser, token };
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await delay(300); // Simulate API call
  
  // Clear localStorage
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
}

/**
 * Get current user from storage
 */
export function getCurrentUser(): User | null {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  
  if (!token || !userData) {
    return null;
  }
  
  // Check if token is valid
  if (!isTokenValid(token)) {
    // Token expired, clear storage
    logout();
    return null;
  }
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return token ? isTokenValid(token) : false;
}

/**
 * Get authentication token
 */
export function getToken(): string | null {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return token && isTokenValid(token) ? token : null;
}

/**
 * Check if user has permission
 */
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;
  return user.permissions.includes(permission) || user.role === 'admin';
}

/**
 * Check if user has role
 */
export function hasRole(user: User | null, role: string | string[]): boolean {
  if (!user) return false;
  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(user.role);
}

/**
 * Refresh user data
 */
export async function refreshUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;
  
  await delay(300); // Simulate API call
  
  const user = getUserFromToken(token);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
  
  return user;
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<User>): Promise<User> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }
  
  await delay(500); // Simulate API call
  
  const updatedUser = { ...currentUser, ...updates };
  
  // Update in mock users
  const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    MOCK_USERS[userIndex] = updatedUser;
  }
  
  // Update in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  
  return updatedUser;
}

/**
 * Change password
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }
  
  await delay(500); // Simulate API call
  
  // Mock password validation
  const validCurrentPassword = currentPassword === 'demo123' || 
                              currentPassword === 'password' ||
                              currentPassword === 'admin123';
  
  if (!validCurrentPassword) {
    throw new Error('Contraseña actual incorrecta');
  }
  
  if (newPassword.length < 6) {
    throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
  }
  
  // In a real app, this would update the password on the server
  console.log('Password changed successfully');
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<void> {
  await delay(800); // Simulate API call
  
  const user = MOCK_USERS.find(u => u.email === email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  // In a real app, this would send a reset email
  console.log(`Password reset email sent to ${email}`);
}

/**
 * Verify email
 */
export async function verifyEmail(token: string): Promise<void> {
  await delay(500); // Simulate API call
  
  // In a real app, this would verify the email token
  console.log('Email verified successfully');
}

// Export mock users for testing
export { MOCK_USERS };


