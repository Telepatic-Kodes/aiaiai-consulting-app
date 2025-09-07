import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Zap,
  Clock,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';

interface RealTimeMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  description: string;
  trend: number[];
}

/**
 * Real-Time Metrics Component
 * 
 * Features:
 * - Live metrics updates
 * - Trend visualization
 * - Professional charts
 * - Real-time data simulation
 * - Responsive design
 */
export function RealTimeMetrics() {
  const [metrics, setMetrics] = React.useState<RealTimeMetric[]>([
    {
      id: '1',
      title: 'Agentes Activos',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Activity,
      description: 'Agentes ejecutando tareas',
      trend: [8, 9, 10, 11, 12, 12, 12]
    },
    {
      id: '2',
      title: 'Tareas/Minuto',
      value: '47',
      change: '+8',
      changeType: 'positive',
      icon: Zap,
      description: 'Tareas procesadas por minuto',
      trend: [35, 38, 42, 45, 47, 47, 47]
    },
    {
      id: '3',
      title: 'Tiempo Promedio',
      value: '2.3s',
      change: '-0.5s',
      changeType: 'positive',
      icon: Clock,
      description: 'Tiempo promedio de respuesta',
      trend: [3.2, 2.9, 2.7, 2.5, 2.3, 2.3, 2.3]
    },
    {
      id: '4',
      title: 'Precisión',
      value: '98.5%',
      change: '+1.2%',
      changeType: 'positive',
      icon: Target,
      description: 'Precisión de los agentes',
      trend: [96.8, 97.2, 97.8, 98.1, 98.5, 98.5, 98.5]
    }
  ]);

  const [isLive, setIsLive] = React.useState(true);

  // Simulate real-time updates
  React.useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = Math.random() * 0.1 - 0.05; // ±5% variation
        const currentValue = parseFloat(metric.value.replace(/[^\d.]/g, ''));
        const newValue = Math.max(0, currentValue + (currentValue * variation));
        
        let formattedValue = metric.value;
        if (metric.title.includes('Tiempo')) {
          formattedValue = `${newValue.toFixed(1)}s`;
        } else if (metric.title.includes('Precisión')) {
          formattedValue = `${newValue.toFixed(1)}%`;
        } else {
          formattedValue = Math.round(newValue).toString();
        }

        return {
          ...metric,
          value: formattedValue,
          trend: [...metric.trend.slice(1), newValue]
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getTrendColor = (trend: number[]) => {
    const latest = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    return latest > previous ? 'text-green-500' : latest < previous ? 'text-red-500' : 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Métricas en Tiempo Real</h2>
          <p className="text-gray-600">Monitoreo en vivo del rendimiento del sistema</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700">
              {isLive ? 'En Vivo' : 'Pausado'}
            </span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isLive ? 'Pausar' : 'Reanudar'}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={metric.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-50" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-primary-100`}>
                  <metric.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change}
                  </div>
                  <div className="text-xs text-gray-500">vs anterior</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </div>

              {/* Mini Trend Chart */}
              <div className="mt-4 h-8 flex items-end space-x-1">
                {metric.trend.map((value, i) => {
                  const maxValue = Math.max(...metric.trend);
                  const height = (value / maxValue) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-primary-200 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <span>Rendimiento por Hora</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {Array.from({ length: 24 }, (_, i) => {
                const value = Math.random() * 100;
                const height = `${value}%`;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t"
                      style={{ height }}
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      {i.toString().padStart(2, '0')}:00
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary-600" />
              <span>Distribución de Tareas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Meeting Summarizer', value: 35, color: 'bg-blue-500' },
                { name: 'Proposal Builder', value: 25, color: 'bg-green-500' },
                { name: 'Lead Scorer', value: 20, color: 'bg-yellow-500' },
                { name: 'CRM Updater', value: 15, color: 'bg-purple-500' },
                { name: 'Follow-up Scheduler', value: 5, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
