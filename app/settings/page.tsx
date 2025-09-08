"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Database,
  Key,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

/**
 * Settings Page Component
 * 
 * Features:
 * - Professional settings interface
 * - User profile management
 * - Notification preferences
 * - Security settings
 * - Billing information
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function SettingsPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showApiKey, setShowApiKey] = React.useState(false);

  const settingsSections = [
    {
      id: 'profile',
      title: 'Perfil de Usuario',
      icon: User,
      description: 'Gestiona tu información personal y preferencias'
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: Bell,
      description: 'Configura cómo y cuándo recibir notificaciones'
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Shield,
      description: 'Gestiona tu contraseña y configuraciones de seguridad'
    },
    {
      id: 'billing',
      title: 'Facturación',
      icon: CreditCard,
      description: 'Administra tu plan y métodos de pago'
    },
    {
      id: 'integrations',
      title: 'Integraciones',
      icon: Globe,
      description: 'Conecta con servicios externos y APIs'
    },
    {
      id: 'data',
      title: 'Datos',
      icon: Database,
      description: 'Gestiona tus datos y exportaciones'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Configuración
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Gestiona tu cuenta y preferencias
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Perfil de Usuario
              </h2>
              <p className="text-sm text-gray-600">
                Gestiona tu información personal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <Input
                type="text"
                defaultValue="María González"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <Input
                type="text"
                defaultValue="Rodríguez"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                defaultValue="maria@empresa.com"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa
              </label>
              <Input
                type="text"
                defaultValue="TechCorp Solutions"
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Seguridad
              </h2>
              <p className="text-sm text-gray-600">
                Gestiona tu contraseña y configuraciones de seguridad
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña Actual
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <Input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <Input
                type="password"
                placeholder="Confirma tu nueva contraseña"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  defaultValue="sk-1234567890abcdef"
                  className="w-full pr-10"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Usa esta clave para integrar con la API de AIAIAI Consulting
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary">
              <Save className="h-4 w-4 mr-2" />
              Actualizar Seguridad
            </Button>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="h-6 w-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Notificaciones
              </h2>
              <p className="text-sm text-gray-600">
                Configura cómo y cuándo recibir notificaciones
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Notificaciones por Email
                </h3>
                <p className="text-sm text-gray-600">
                  Recibe actualizaciones importantes por email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Notificaciones Push
                </h3>
                <p className="text-sm text-gray-600">
                  Recibe notificaciones en tiempo real
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Reportes Semanales
                </h3>
                <p className="text-sm text-gray-600">
                  Recibe un resumen semanal de tu actividad
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary">
              <Save className="h-4 w-4 mr-2" />
              Guardar Preferencias
            </Button>
          </div>
        </Card>

        {/* Billing Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <CreditCard className="h-6 w-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Facturación
              </h2>
              <p className="text-sm text-gray-600">
                Administra tu plan y métodos de pago
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary-900">
                    Plan Profesional
                  </h3>
                  <p className="text-sm text-primary-700">
                    $99/mes • 10 agentes • Soporte prioritario
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Cambiar Plan
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Método de Pago
              </h3>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    **** **** **** 4242
                  </p>
                  <p className="text-xs text-gray-600">
                    Expira 12/25
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


