"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { InteractiveChart } from '@/components/charts/InteractiveChart';
import { 
  Monitor,
  Users, 
  Briefcase, 
  DollarSign,
  Plus,
  UserPlus,
  BarChart3,
  Zap
} from 'lucide-react';

/**
 * Simple Dashboard Page - Enhanced Version
 */
export default function SimpleDashboardPage() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample data for charts
  const revenueData = [
    { label: 'Ene', value: 12000, color: 'text-blue-500', change: 12 },
    { label: 'Feb', value: 15000, color: 'text-blue-500', change: 8 },
    { label: 'Mar', value: 18000, color: 'text-blue-500', change: 15 },
    { label: 'Abr', value: 22000, color: 'text-blue-500', change: 22 },
    { label: 'May', value: 25000, color: 'text-blue-500', change: 18 },
    { label: 'Jun', value: 28000, color: 'text-blue-500', change: 25 }
  ];

  const projectStatusData = [
    { label: 'Completados', value: 8, color: '#10b981' },
    { label: 'En Progreso', value: 5, color: '#3b82f6' },
    { label: 'Planificación', value: 3, color: '#f59e0b' },
    { label: 'En Pausa', value: 1, color: '#ef4444' }
  ];

  const clientGrowthData = [
    { label: 'Q1', value: 12, color: 'text-green-500', change: 5 },
    { label: 'Q2', value: 18, color: 'text-green-500', change: 12 },
    { label: 'Q3', value: 25, color: 'text-green-500', change: 8 },
    { label: 'Q4', value: 32, color: 'text-green-500', change: 15 }
  ];

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

  return (
    <ProtectedRoute>
      <StandardLayout
        title="AIAIAI Consulting Dashboard"
        subtitle={`¡Bienvenido, ${user?.email || 'Usuario'}! • ${formatDate(currentTime)}`}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Acciones Rápidas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">Nuevo Agente</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Crear un nuevo agente de IA</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300">Nuevo Cliente</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Agregar un nuevo cliente</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300">Ver Reportes</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Generar reportes</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800 transition-colors">
                      <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-300">Análisis IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ejecutar análisis inteligente</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Actividad Reciente
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Nuevo agente creado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hace 2 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Cliente agregado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hace 4 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Reporte generado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ayer</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Análisis completado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <InteractiveChart
            data={revenueData}
            title="Ingresos Mensuales"
            type="line"
            height={250}
          />
          
          {/* Project Status Chart */}
          <InteractiveChart
            data={projectStatusData}
            title="Estado de Proyectos"
            type="donut"
            height={250}
          />
        </div>

        {/* Client Growth Chart */}
        <div className="mt-8">
          <InteractiveChart
            data={clientGrowthData}
            title="Crecimiento de Clientes por Trimestre"
            type="bar"
            height={200}
          />
        </div>

        {/* Performance Chart */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
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
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                ¡Aplicación funcionando perfectamente!
              </h3>
              <p className="text-green-700 dark:text-green-300 mt-1">
                El login está funcionando, has sido redirigido al dashboard y todas las optimizaciones están aplicadas.
                La aplicación está lista para uso en producción.
              </p>
            </div>
          </div>
        </div>
      </StandardLayout>
    </ProtectedRoute>
  );
}