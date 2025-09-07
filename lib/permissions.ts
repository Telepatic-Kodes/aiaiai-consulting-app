/**
 * Permissions and Roles System
 * 
 * Features:
 * - Role-based access control
 * - Permission management
 * - Resource-level permissions
 * - Professional security model
 */

export type Role = 'admin' | 'manager' | 'user' | 'viewer';

export type Permission = 
  // Agent permissions
  | 'agents:read'
  | 'agents:create'
  | 'agents:update'
  | 'agents:delete'
  | 'agents:execute'
  
  // Client permissions
  | 'clients:read'
  | 'clients:create'
  | 'clients:update'
  | 'clients:delete'
  
  // Project permissions
  | 'projects:read'
  | 'projects:create'
  | 'projects:update'
  | 'projects:delete'
  | 'projects:assign'
  
  // Report permissions
  | 'reports:read'
  | 'reports:create'
  | 'reports:export'
  
  // User permissions
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  
  // System permissions
  | 'system:settings'
  | 'system:analytics'
  | 'system:export';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
}

export interface RolePermissions {
  [key: string]: Permission[];
}

// Define role permissions
export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    // All permissions
    'agents:read', 'agents:create', 'agents:update', 'agents:delete', 'agents:execute',
    'clients:read', 'clients:create', 'clients:update', 'clients:delete',
    'projects:read', 'projects:create', 'projects:update', 'projects:delete', 'projects:assign',
    'reports:read', 'reports:create', 'reports:export',
    'users:read', 'users:create', 'users:update', 'users:delete',
    'system:settings', 'system:analytics', 'system:export'
  ],
  
  manager: [
    // Most permissions except user management and system settings
    'agents:read', 'agents:create', 'agents:update', 'agents:execute',
    'clients:read', 'clients:create', 'clients:update', 'clients:delete',
    'projects:read', 'projects:create', 'projects:update', 'projects:delete', 'projects:assign',
    'reports:read', 'reports:create', 'reports:export',
    'users:read',
    'system:analytics'
  ],
  
  user: [
    // Basic operational permissions
    'agents:read', 'agents:execute',
    'clients:read', 'clients:create', 'clients:update',
    'projects:read', 'projects:create', 'projects:update',
    'reports:read', 'reports:create'
  ],
  
  viewer: [
    // Read-only permissions
    'agents:read',
    'clients:read',
    'projects:read',
    'reports:read'
  ]
};

class PermissionManager {
  private currentUser: User | null = null;

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  hasPermission(permission: Permission): boolean {
    if (!this.currentUser) return false;
    
    // Check if user has explicit permission
    if (this.currentUser.permissions.includes(permission)) {
      return true;
    }
    
    // Check role-based permissions
    const rolePermissions = ROLE_PERMISSIONS[this.currentUser.role] || [];
    return rolePermissions.includes(permission);
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  canAccess(resource: string, action: string): boolean {
    const permission = `${resource}:${action}` as Permission;
    return this.hasPermission(permission);
  }

  getRole(): Role | null {
    return this.currentUser?.role || null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isManager(): boolean {
    return this.currentUser?.role === 'manager';
  }

  isUser(): boolean {
    return this.currentUser?.role === 'user';
  }

  isViewer(): boolean {
    return this.currentUser?.role === 'viewer';
  }

  // Get user's effective permissions
  getEffectivePermissions(): Permission[] {
    if (!this.currentUser) return [];
    
    const rolePermissions = ROLE_PERMISSIONS[this.currentUser.role] || [];
    const userPermissions = this.currentUser.permissions || [];
    
    // Combine role and user permissions, removing duplicates
    return [...new Set([...rolePermissions, ...userPermissions])];
  }

  // Check if user can perform action on specific resource
  canPerformAction(resource: string, action: string, resourceOwner?: string): boolean {
    // Basic permission check
    if (!this.canAccess(resource, action)) {
      return false;
    }

    // If resource has an owner, check ownership or admin privileges
    if (resourceOwner && this.currentUser) {
      // Admins can perform any action
      if (this.isAdmin()) {
        return true;
      }
      
      // Users can only perform actions on their own resources
      return this.currentUser.id === resourceOwner;
    }

    return true;
  }
}

export const permissionManager = new PermissionManager();

// Permission checking hooks and utilities
export function usePermissions() {
  const [user, setUser] = React.useState<User | null>(permissionManager.getUser());

  React.useEffect(() => {
    // In a real app, you would get user data from your auth system
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email: 'admin@aiaiai.cl',
      role: 'admin',
      permissions: [],
      createdAt: new Date().toISOString()
    };
    
    permissionManager.setUser(mockUser);
    setUser(mockUser);
  }, []);

  return {
    user,
    hasPermission: (permission: Permission) => permissionManager.hasPermission(permission),
    hasAnyPermission: (permissions: Permission[]) => permissionManager.hasAnyPermission(permissions),
    hasAllPermissions: (permissions: Permission[]) => permissionManager.hasAllPermissions(permissions),
    canAccess: (resource: string, action: string) => permissionManager.canAccess(resource, action),
    getRole: () => permissionManager.getRole(),
    isAdmin: () => permissionManager.isAdmin(),
    isManager: () => permissionManager.isManager(),
    isUser: () => permissionManager.isUser(),
    isViewer: () => permissionManager.isViewer(),
    getEffectivePermissions: () => permissionManager.getEffectivePermissions()
  };
}

// Permission-based component wrapper
interface PermissionGateProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGate({ 
  permission, 
  permissions, 
  requireAll = false, 
  fallback = null, 
  children 
}: PermissionGateProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
  } else {
    hasAccess = true;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
