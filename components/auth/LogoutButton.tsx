import React from 'react';
import { Button } from '@/components/ui/Button';
import { AuthManager } from '@/lib/auth-manager';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

/**
 * Logout Button Component
 * 
 * Features:
 * - Professional logout functionality
 * - Loading states
 * - Error handling
 * - Success callbacks
 * - Customizable styling
 * - Icon support
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export function LogoutButton({ 
  onLogout,
  variant = 'ghost',
  size = 'md',
  className = '',
  showIcon = true,
  children = 'Cerrar Sesión'
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const authManager = new AuthManager();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await authManager.logout();
      onLogout?.();
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to login
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {isLoading ? 'Cerrando...' : children}
    </Button>
  );
}
