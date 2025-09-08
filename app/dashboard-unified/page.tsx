"use client";

import React, { useState, useEffect } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  Plus,
  Monitor,
  UserPlus,
  BarChart3,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function UnifiedDashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const quickActions = [
    {
      title: 'Nuevo Agente',
      description: 'Crear un nuevo agente de IA',
      icon: Plus,
      href: '/agents/new',
      color: 'blue'
    },
    {
      title: 'Nuevo Cliente',
      description: 'Agregar un nuevo cliente',
      icon: UserPlus,
      href: '/clients/new',
      color: 'green'
    },
    {
      title: 'Ver Reportes',
      description: 'Generar reportes de rendimiento',
      icon: BarChart3,
      href: '/reports',
      color: 'purple'
    },
    {
      title: 'Análisis IA',
      description: 'Ejecutar análisis inteligente',
      icon: Zap,
      href: '/analytics',
      color: 'yellow'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Nuevo agente creado',
      time: 'Hace 2 horas',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Cliente agregado',
      time: 'Hace 4 horas',
      type: 'info',
      icon: Users
    },
    {
      id: 3,
      title: 'Reporte generado',
      time: 'Ayer',
      type: 'warning',
      icon: BarChart3
    },
    {
      id: 4,
      title: 'Análisis completado',
      time: 'Hace 2 días',
      type: 'success',
      icon: Zap
    }
  ];

  return (
    <StandardLayout
      title="AIAIAI Consulting Dashboard"
      subtitle={`¡Bienvenido, carlos.rodriguez@techconsulting.cl! • ${formatDate(currentTime)}`}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Agentes Activos"
          value="12"
          change="+2 este mes"
          changeType="positive"
          icon={Monitor}
          color="blue"
          description="Agentes ejecutando tareas"
        />
        <StandardMetricCard
          title="Clientes"
          value="47"
          change="+8 este mes"
          changeType="positive"
          icon={Users}
          color="green"
          description="Clientes con proyectos activos"
        />
        <StandardMetricCard
          title="Proyectos"
          value="23"
          change="+5 este mes"
          changeType="positive"
          icon={Briefcase}
          color="purple"
          description="Proyectos en ejecución"
        />
        <StandardMetricCard
          title="Ingresos"
          value="$47,500"
          change="+12% este mes"
          changeType="positive"
          icon={DollarSign}
          color="yellow"
          description="Ingresos recurrentes mensuales"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={cn(
                    "p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all group text-left",
                    action.color === 'blue' && "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600",
                    action.color === 'green' && "hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600",
                    action.color === 'purple' && "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600",
                    action.color === 'yellow' && "hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                      action.color === 'blue' && "bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800",
                      action.color === 'green' && "bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800",
                      action.color === 'purple' && "bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800",
                      action.color === 'yellow' && "bg-yellow-100 dark:bg-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800"
                    )}>
                      <action.icon className={cn(
                        "w-6 h-6",
                        action.color === 'blue' && "text-blue-600 dark:text-blue-400",
                        action.color === 'green' && "text-green-600 dark:text-green-400",
                        action.color === 'purple' && "text-purple-600 dark:text-purple-400",
                        action.color === 'yellow' && "text-yellow-600 dark:text-yellow-400"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold group-hover:transition-colors",
                        action.color === 'blue' && "text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300",
                        action.color === 'green' && "text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300",
                        action.color === 'purple' && "text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300",
                        action.color === 'yellow' && "text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-300"
                      )}>
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2",
                    activity.type === 'success' && "bg-green-500",
                    activity.type === 'info' && "bg-blue-500",
                    activity.type === 'warning' && "bg-yellow-500",
                    activity.type === 'error' && "bg-red-500"
                  )}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* System Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Rendimiento del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">85%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">CPU Usage</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Excelente rendimiento</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="72, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">72%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Memory</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Uso normal</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="95, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">95%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Uptime</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sistema estable</p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Estadísticas Rápidas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Tiempo promedio de respuesta</span>
              </div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1.2s</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Tareas completadas hoy</span>
              </div>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">156</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Alertas pendientes</span>
              </div>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">3</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Success Message */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              ¡Aplicación funcionando perfectamente!
            </h3>
            <p className="text-green-700 dark:text-green-300 mt-1">
              El dashboard unificado está funcionando con diseño consistente y todas las optimizaciones aplicadas.
            </p>
          </div>
        </div>
      </Card>
    </StandardLayout>
  );
}
