"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock } from 'lucide-react';

/**
 * Simple Login Page for Testing
 */
export default function SimpleLoginPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (formData.email && formData.password) {
        setSuccess('Login exitoso! Redirigiendo...');
        
        // Store user data in localStorage
        const userData = {
          id: 'demo-user-001',
          firstName: 'Carlos',
          lastName: 'Rodríguez',
          email: formData.email,
          phone: '+56 9 8765 4321',
          company: 'TechConsulting LATAM',
          position: 'CEO & Fundador',
          plan: 'Premium',
          status: 'active'
        };
        
        localStorage.setItem('aiaiai-user', JSON.stringify(userData));
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setError('Por favor, completa todos los campos');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoData = () => {
    setFormData({
      email: 'carlos.rodriguez@techconsulting.cl',
      password: 'DemoPassword123!'
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AIAIAI Consulting
              </h1>
              <p className="text-sm text-gray-600">
                Login Simple - Prueba
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-gray-600">
            Prueba de login simplificado
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardContent className="p-8">
            {/* Demo Data Button */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Datos Demo</h3>
                  <p className="text-xs text-blue-700">Usa los datos demo para probar</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoData}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Usar Datos Demo
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <span className="text-sm text-green-600">{success}</span>
                </div>
              )}

              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@empresa.com"
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />

              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                required
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Volver al login original
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
