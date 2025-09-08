"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Calendar, 
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  RefreshCw,
  Eye,
  Download,
  Settings,
  Bell,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  format: 'number' | 'currency' | 'percentage' | 'time';
  description: string;
  lastUpdated: Date;
}

interface Activity {
  id: string;
  type: 'client' | 'proposal' | 'meeting' | 'task' | 'notification';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'info' | 'error';
  clientName?: string;
}

// Mock data
const mockMetrics: Metric[] = [
  {
    id: '1',
    title: 'Clientes Activos',
    value: 12,
    previousValue: 9,
    change: 33.3,
    changeType: 'increase',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    color: 'blue',
    format: 'number',
    description: 'Clientes en pipeline activo',
    lastUpdated: new Date()
  },
  {
    id: '2',
    title: 'Valor Pipeline',
    value: 45000000,
    previousValue: 38000000,
    change: 18.4,
    changeType: 'increase',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'green',
    format: 'currency',
    description: 'Valor total del pipeline',
    lastUpdated: new Date()
  },
  {
    id: '3',
    title: 'Tasa de Conversión',
    value: 75,
    previousValue: 68,
    change: 10.3,
    changeType: 'increase',
    trend: 'up',
    icon: <Target className="w-6 h-6" />,
    color: 'purple',
    format: 'percentage',
    description: 'Porcentaje de cierre exitoso',
    lastUpdated: new Date()
  },
  {
    id: '4',
    title: 'Tiempo Promedio de Cierre',
    value: 42,
    previousValue: 48,
    change: -12.5,
    changeType: 'decrease',
    trend: 'up',
    icon: <Clock className="w-6 h-6" />,
    color: 'orange',
    format: 'time',
    description: 'Días promedio para cerrar',
    lastUpdated: new Date()
  },
  {
    id: '5',
    title: 'Reuniones Programadas',
    value: 8,
    previousValue: 6,
    change: 33.3,
    changeType: 'increase',
    trend: 'up',
    icon: <Calendar className="w-6 h-6" />,
    color: 'indigo',
    format: 'number',
    description: 'Próximas reuniones',
    lastUpdated: new Date()
  },
  {
    id: '6',
    title: 'Propuestas Enviadas',
    value: 5,
    previousValue: 7,
    change: -28.6,
    changeType: 'decrease',
    trend: 'down',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'yellow',
    format: 'number',
    description: 'Propuestas en revisión',
    lastUpdated: new Date()
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'client',
    title: 'Nuevo cliente agregado',
    description: 'Sueño Andino agregado al pipeline',
    timestamp: new Date('2025-01-20T10:30:00'),
    status: 'success',
    clientName: 'Sueño Andino'
  },
  {
    id: '2',
    type: 'proposal',
    title: 'Propuesta enviada',
    description: 'Propuesta técnica enviada a TechStart Chile',
    timestamp: new Date('2025-01-20T09:15:00'),
    status: 'info',
    clientName: 'TechStart Chile'
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Reunión completada',
    description: 'Reunión con EcoFashion completada exitosamente',
    timestamp: new Date('2025-01-20T08:45:00'),
    status: 'success',
    clientName: 'EcoFashion'
  },
  {
    id: '4',
    type: 'task',
    title: 'Tarea completada',
    description: 'Research de mercado para AgroTech completado',
    timestamp: new Date('2025-01-20T08:00:00'),
    status: 'success',
    clientName: 'AgroTech Solutions'
  },
  {
    id: '5',
    type: 'notification',
    title: 'Alerta de seguimiento',
    description: 'HealthTech Pro requiere seguimiento urgente',
    timestamp: new Date('2025-01-20T07:30:00'),
    status: 'warning',
    clientName: 'HealthTech Pro'
  }
];

export function RealTimeDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>(mockMetrics);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simular actualización de datos
    setTimeout(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        lastUpdated: new Date()
      })));
      setIsRefreshing(false);
    }, 1000);
  };

  const getTrendIcon = (trend: Metric['trend']) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = (changeType: Metric['changeType']) => {
    switch (changeType) {
      case 'increase': return 'text-green-600 bg-green-100';
      case 'decrease': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-gray-600 bg-gray-100';
    }
  };

  const formatValue = (value: number, format: Metric['format']) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP',
          minimumFractionDigits: 0
        }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value} días`;
      default:
        return value.toString();
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'client': return <Users className="w-4 h-4" />;
      case 'proposal': return <BarChart3 className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'task': return <CheckCircle className="w-4 h-4" />;
      case 'notification': return <Bell className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: Activity['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('es-CL');
  };

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard en Tiempo Real
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Métricas actualizadas automáticamente cada 30 segundos
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 text-green-700 border-green-300' : ''}
          >
            <Activity className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-pulse' : ''}`} />
            Auto-refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Actualizar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  metric.color === 'green' ? 'bg-green-100 text-green-600' :
                  metric.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  metric.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  metric.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {metric.icon}
                </div>
                
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatValue(metric.value, metric.format)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.description}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>vs período anterior</span>
                <span>{formatTimeAgo(metric.lastUpdated)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Actividad Reciente
            </h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Ver todo
            </Button>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h4>
                    {activity.clientName && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        • {activity.clientName}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {activity.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tendencias del Pipeline
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Gráfico de tendencias</p>
                <p className="text-sm text-gray-400">(Integración con Chart.js pendiente)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Distribución por Etapas
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Gráfico de distribución</p>
                <p className="text-sm text-gray-400">(Integración con Chart.js pendiente)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
