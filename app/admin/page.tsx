import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RealTimeMetrics } from '@/components/analytics/RealTimeMetrics';
import { RealTimeCollaboration } from '@/components/collaboration/RealTimeCollaboration';
import { 
  Settings, 
  Users, 
  Shield, 
  Database,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';

/**
 * Admin Dashboard Page
 * 
 * Features:
 * - System overview
 * - User management
 * - Security monitoring
 * - Performance metrics
 * - Real-time collaboration
 * - Professional admin interface
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const systemStats = [
    {
      title: 'Usuarios Activos',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Usuarios conectados en las últimas 24h'
    },
    {
      title: 'Agentes Ejecutando',
      value: '89',
      change: '+5',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Agentes procesando tareas'
    },
    {
      title: 'Tareas/Minuto',
      value: '2,847',
      change: '+23%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Tareas procesadas por minuto'
    },
    {
      title: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      description: 'Disponibilidad del sistema'
    }
  ];

  const securityAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Intento de acceso no autorizado',
      description: 'Múltiples intentos de login fallidos desde IP 192.168.1.100',
      time: '5 minutos',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'info',
      title: 'Nuevo usuario registrado',
      description: 'Usuario admin@nuevacliente.cl se registró exitosamente',
      time: '15 minutos',
      severity: 'low'
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup completado',
      description: 'Backup automático de la base de datos completado exitosamente',
      time: '1 hora',
      severity: 'low'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: BarChart3 },
    { id: 'users', name: 'Usuarios', icon: Users },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'performance', name: 'Rendimiento', icon: Activity },
    { id: 'collaboration', name: 'Colaboración', icon: Users },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {stat.change}
                        </div>
                        <div className="text-xs text-gray-500">vs anterior</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Real-time Metrics */}
            <RealTimeMetrics />

            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Alertas de Seguridad</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                        alert.type === 'info' ? 'border-blue-400 bg-blue-50' :
                        'border-green-400 bg-green-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            {alert.time}
                          </div>
                          <div className={`text-xs font-medium ${
                            alert.severity === 'high' ? 'text-red-600' :
                            alert.severity === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {alert.severity === 'high' ? 'Alto' :
                             alert.severity === 'medium' ? 'Medio' : 'Bajo'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Panel de gestión de usuarios en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoreo de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Panel de seguridad en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Métricas de rendimiento en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'collaboration':
        return <RealTimeCollaboration />;

      case 'settings':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Configuraciones del sistema en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600 mt-2">Gestiona y monitorea el sistema AIAIAI Consulting</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
