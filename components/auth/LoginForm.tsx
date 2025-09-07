import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { AuthManager } from '@/lib/auth-manager';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

export interface LoginFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
  redirectTo?: string;
}

/**
 * Professional Login Form Component
 * 
 * Features:
 * - Email and password validation
 * - Remember me functionality
 * - Loading states
 * - Error handling
 * - Password visibility toggle
 * - Consistent with AIAIAI Consulting design system
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  className,
  redirectTo = '/dashboard'
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError('El email es requerido');
      return false;
    }
    
    if (!formData.password) {
      setError('La contraseña es requerida');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const authManager = new AuthManager();
      const user = await authManager.login({
        email: formData.email,
        password: formData.password
      });
      
      // Call success callback
      onSuccess?.(user);
      
      // Redirect to dashboard or specified route
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: 'admin@aiaiai.cl',
      password: 'demo123',
      rememberMe: false
    });
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await login({
        email: 'admin@aiaiai.cl',
        password: 'demo123',
        rememberMe: false
      });
      
      onSuccess?.(result.user);
      
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta de AIAIAI Consulting"
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="tu@empresa.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              leftIcon={<Mail className="h-4 w-4" />}
              disabled={loading}
              required
            />
            
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange('password')}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              disabled={loading}
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-600">
                Recordarme
              </span>
            </label>
            
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              disabled={loading}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          
          <div className="space-y-3">
            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Iniciar Sesión
            </Button>
            
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Demo - Admin
            </Button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Credenciales de Demo
          </h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@aiaiai.cl / demo123</p>
            <p><strong>Usuario:</strong> maria@techcorp.cl / demo123</p>
            <p><strong>Viewer:</strong> carlos@innovate.cl / demo123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
