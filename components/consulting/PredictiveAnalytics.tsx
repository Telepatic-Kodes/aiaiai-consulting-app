"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface Prediction {
  id: string;
  type: 'revenue' | 'conversion' | 'timeline' | 'risk' | 'opportunity';
  title: string;
  description: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  category: 'pipeline' | 'client' | 'market' | 'performance';
  factors: string[];
  recommendations: string[];
  lastUpdated: Date;
}

// Mock predictions data
const mockPredictions: Prediction[] = [
  {
    id: '1',
    type: 'revenue',
    title: 'Predicción de Ingresos Q1 2025',
    description: 'Modelo predictivo basado en pipeline actual y tendencias históricas',
    currentValue: 45000000,
    predictedValue: 62000000,
    confidence: 87,
    timeframe: 'Q1 2025',
    trend: 'up',
    impact: 'high',
    category: 'pipeline',
    factors: ['Pipeline activo', 'Tasa de conversión histórica', 'Estacionalidad del mercado'],
    recommendations: ['Acelerar cierre de negociaciones activas', 'Optimizar proceso de seguimiento'],
    lastUpdated: new Date('2025-01-20T10:00:00')
  },
  {
    id: '2',
    type: 'conversion',
    title: 'Tasa de Conversión por Etapa',
    description: 'Predicción de conversión entre etapas del pipeline',
    currentValue: 23,
    predictedValue: 31,
    confidence: 82,
    timeframe: '30 días',
    trend: 'up',
    impact: 'high',
    category: 'performance',
    factors: ['Mejora en seguimiento', 'Optimización de propuestas', 'Mejor calificación de leads'],
    recommendations: ['Implementar seguimiento automatizado', 'Mejorar calidad de propuestas'],
    lastUpdated: new Date('2025-01-20T09:30:00')
  },
  {
    id: '3',
    type: 'timeline',
    title: 'Tiempo Promedio de Cierre',
    description: 'Predicción del tiempo promedio para cerrar negocios',
    currentValue: 45,
    predictedValue: 38,
    confidence: 75,
    timeframe: 'Próximos 60 días',
    trend: 'down',
    impact: 'medium',
    category: 'performance',
    factors: ['Procesos optimizados', 'Mejor calificación inicial', 'Seguimiento más eficiente'],
    recommendations: ['Automatizar tareas repetitivas', 'Mejorar proceso de calificación'],
    lastUpdated: new Date('2025-01-20T09:00:00')
  },
  {
    id: '4',
    type: 'risk',
    title: 'Riesgo de Pérdida de Clientes',
    description: 'Predicción de clientes en riesgo de pérdida',
    currentValue: 2,
    predictedValue: 1,
    confidence: 90,
    timeframe: '15 días',
    trend: 'down',
    impact: 'high',
    category: 'client',
    factors: ['Mejora en seguimiento', 'Respuesta más rápida', 'Mejor comunicación'],
    recommendations: ['Implementar alertas tempranas', 'Mejorar proceso de seguimiento'],
    lastUpdated: new Date('2025-01-20T08:45:00')
  },
  {
    id: '5',
    type: 'opportunity',
    title: 'Oportunidades de Upselling',
    description: 'Predicción de oportunidades de venta adicional',
    currentValue: 3,
    predictedValue: 5,
    confidence: 78,
    timeframe: '45 días',
    trend: 'up',
    impact: 'medium',
    category: 'client',
    factors: ['Satisfacción del cliente', 'Necesidades identificadas', 'Relación fortalecida'],
    recommendations: ['Desarrollar propuestas de valor', 'Identificar necesidades adicionales'],
    lastUpdated: new Date('2025-01-19T16:30:00')
  }
];

export function PredictiveAnalytics() {
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [filter, setFilter] = useState<'all' | 'revenue' | 'conversion' | 'timeline' | 'risk' | 'opportunity'>('all');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPredictionIcon = (type: Prediction['type']) => {
    switch (type) {
      case 'revenue': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'conversion': return <Target className="w-5 h-5 text-blue-600" />;
      case 'timeline': return <Clock className="w-5 h-5 text-purple-600" />;
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-orange-600" />;
    }
  };

  const getTrendIcon = (trend: Prediction['trend']) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: Prediction['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatValue = (value: number, type: Prediction['type']) => {
    switch (type) {
      case 'revenue':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP',
          minimumFractionDigits: 0
        }).format(value);
      case 'conversion':
      case 'timeline':
        return `${value}%`;
      case 'risk':
      case 'opportunity':
        return `${value} clientes`;
      default:
        return value.toString();
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const filteredPredictions = predictions.filter(prediction => {
    return filter === 'all' || prediction.type === filter;
  });

  const refreshPredictions = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getPredictionStats = () => {
    const total = predictions.length;
    const highConfidence = predictions.filter(p => p.confidence >= 85).length;
    const positiveTrends = predictions.filter(p => p.trend === 'up').length;
    const highImpact = predictions.filter(p => p.impact === 'high').length;
    
    return { total, highConfidence, positiveTrends, highImpact };
  };

  const stats = getPredictionStats();

  return (
    <ContentLayout 
      title="Analytics Predictivos" 
      subtitle="Predicciones inteligentes y forecasting del pipeline de consultoría"
    >
      {/* Métricas de Predicciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Predicciones
                </div>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.highConfidence}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Alta Confianza
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.positiveTrends}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Tendencias Positivas
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.highImpact}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Alto Impacto
                </div>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de Control */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Motor de Predicciones
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Análisis predictivo basado en datos históricos y tendencias del mercado
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={refreshPredictions}
              disabled={isRefreshing}
              variant="outline"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualizar
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modelos Activos</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-xs text-gray-500">algoritmos ML</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Precisión Promedio</span>
            </div>
            <div className="text-2xl font-bold text-green-600">89.3%</div>
            <div className="text-xs text-gray-500">tasa de acierto</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Última Actualización</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">5m</div>
            <div className="text-xs text-gray-500">hace</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'revenue', 'conversion', 'timeline', 'risk', 'opportunity'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todas' :
                 filterType === 'revenue' ? 'Ingresos' :
                 filterType === 'conversion' ? 'Conversión' :
                 filterType === 'timeline' ? 'Timeline' :
                 filterType === 'risk' ? 'Riesgos' : 'Oportunidades'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="7d">7 días</option>
              <option value="30d">30 días</option>
              <option value="90d">90 días</option>
              <option value="1y">1 año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Predicciones */}
      <div className="space-y-4">
        {filteredPredictions.map((prediction) => (
          <Card 
            key={prediction.id} 
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getPredictionIcon(prediction.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {prediction.title}
                      </h3>
                      {getTrendIcon(prediction.trend)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}% confianza
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {prediction.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Valor Actual</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatValue(prediction.currentValue, prediction.type)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Valor Predicho</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatValue(prediction.predictedValue, prediction.type)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Timeframe</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {prediction.timeframe}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tendencia</div>
                        <div className={`text-sm font-medium ${getTrendColor(prediction.trend)} px-2 py-1 rounded-full inline-block`}>
                          {prediction.trend === 'up' ? 'Alcista' : prediction.trend === 'down' ? 'Bajista' : 'Estable'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Factores Clave</div>
                      <div className="flex flex-wrap gap-1">
                        {prediction.factors.map((factor, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Recomendaciones</div>
                      <div className="space-y-1">
                        {prediction.recommendations.map((recommendation, index) => (
                          <div key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            {recommendation}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTimeAgo(prediction.lastUpdated)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{prediction.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{prediction.impact} impact</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPredictions.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay predicciones disponibles
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all'
              ? 'No hay predicciones que coincidan con el filtro seleccionado'
              : 'Ejecuta un análisis predictivo para generar predicciones inteligentes'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}



