import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Chart } from '@/components/dashboard/Chart';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Bot,
  Clock,
  Target,
  Zap,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

/**
 * Analytics Page Component
 * 
 * Features:
 * - Professional analytics dashboard
 * - Key performance metrics
 * - Interactive charts
 * - Data export functionality
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function AnalyticsPage() {
  // Mock data for demonstration
  const metrics = [
    {
      title: 'Agentes Activos',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Bot,
      description: 'Agentes ejecutando tareas actualmente'
    },
    {
      title: 'Tareas Completadas',
      value: '1,247',
      change: '+15%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'Tareas completadas este mes'
    },
    {
      title: 'Tiempo Promedio',
      value: '2.3h',
      change: '-12%',
      changeType: 'positive' as const,
      icon: Clock,
      description: 'Tiempo promedio por tarea'
    },
    {
      title: 'ROI',
      value: '340%',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Retorno de inversión'
    }
  ];

  const performanceData = [
    { name: 'Ene', value: 85 },
    { name: 'Feb', value: 92 },
    { name: 'Mar', value: 78 },
    { name: 'Abr', value: 96 },
    { name: 'May', value: 88 },
    { name: 'Jun', value: 94 }
  ];

  const topAgents = [
    { name: 'Lead Scorer', tasks: 247, successRate: 94, efficiency: 98 },
    { name: 'Meeting Summarizer', tasks: 189, successRate: 98, efficiency: 96 },
    { name: 'Proposal Builder', tasks: 156, successRate: 89, efficiency: 92 },
    { name: 'Data Analyzer', tasks: 134, successRate: 96, efficiency: 94 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Análisis detallado del rendimiento de tus agentes
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="ghost" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button variant="primary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Tendencia de Rendimiento
            </h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                7 días
              </Button>
              <Button variant="ghost" size="sm">
                30 días
              </Button>
              <Button variant="ghost" size="sm">
                90 días
              </Button>
            </div>
          </div>
          <Chart />
        </Card>

        {/* Task Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Distribución de Tareas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Marketing</span>
              </div>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-accent-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Ventas</span>
              </div>
              <span className="text-sm font-medium text-gray-900">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-success-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Productividad</span>
              </div>
              <span className="text-sm font-medium text-gray-900">25%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Agents */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Top Agentes por Rendimiento
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tareas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa de Éxito
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Eficiencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topAgents.map((agent, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <Bot className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {agent.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agent.tasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-success-600 font-medium">
                      {agent.successRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-primary-600 font-medium">
                      {agent.efficiency}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Insights Clave
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-success-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">
                  Los agentes de marketing están mostrando un rendimiento excepcional
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  +15% de mejora en la tasa de conversión
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-warning-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">
                  El tiempo de respuesta promedio ha aumentado ligeramente
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Considera optimizar la configuración de los agentes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">
                  Nuevas oportunidades de automatización identificadas
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Procesos de ventas y atención al cliente
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recomendaciones
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <h3 className="text-sm font-medium text-primary-900 mb-2">
                Optimizar Lead Scorer
              </h3>
              <p className="text-xs text-primary-700">
                Ajustar los parámetros de puntuación para mejorar la precisión
              </p>
            </div>
            <div className="p-4 bg-accent-50 border border-accent-200 rounded-lg">
              <h3 className="text-sm font-medium text-accent-900 mb-2">
                Escalar Meeting Summarizer
              </h3>
              <p className="text-xs text-accent-700">
                Implementar en más equipos para maximizar el ROI
              </p>
            </div>
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
              <h3 className="text-sm font-medium text-success-900 mb-2">
                Crear Nuevo Agente
              </h3>
              <p className="text-xs text-success-700">
                Desarrollar agente para análisis de sentimientos
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


