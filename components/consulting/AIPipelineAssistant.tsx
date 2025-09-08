"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  Users, 
  DollarSign,
  MessageSquare,
  Send,
  Lightbulb,
  BarChart3,
  Eye,
  ArrowRight,
  Star,
  Award,
  Activity,
  Cpu,
  Database,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'prediction' | 'optimization';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'high' | 'medium' | 'low';
  category: 'pipeline' | 'client' | 'timing' | 'pricing' | 'strategy';
  actionable: boolean;
  action?: {
    label: string;
    description: string;
    priority: 'urgent' | 'high' | 'medium' | 'low';
  };
  data: {
    affectedClients: string[];
    potentialValue: number;
    timeframe: string;
    successProbability: number;
  };
  createdAt: Date;
}

// Mock AI insights data
const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Oportunidad de Upselling Detectada',
    description: 'Sueño Andino muestra interés en expandir su proyecto inicial. Análisis de comportamiento sugiere 85% de probabilidad de aceptar propuesta ampliada.',
    confidence: 87,
    impact: 'high',
    category: 'pipeline',
    actionable: true,
    action: {
      label: 'Crear Propuesta Ampliada',
      description: 'Desarrollar propuesta para proyecto completo de $8,000,000 CLP',
      priority: 'high'
    },
    data: {
      affectedClients: ['Sueño Andino'],
      potentialValue: 3000000,
      timeframe: '2 semanas',
      successProbability: 85
    },
    createdAt: new Date('2025-01-20T10:30:00')
  },
  {
    id: '2',
    type: 'risk',
    title: 'Riesgo de Pérdida - TechStart Chile',
    description: 'Cliente en etapa de negociación por más de 10 días sin respuesta. Patrón histórico sugiere 70% de probabilidad de pérdida si no se actúa inmediatamente.',
    confidence: 78,
    impact: 'high',
    category: 'client',
    actionable: true,
    action: {
      label: 'Acción de Rescate Urgente',
      description: 'Contactar inmediatamente con oferta de descuento o propuesta alternativa',
      priority: 'urgent'
    },
    data: {
      affectedClients: ['TechStart Chile'],
      potentialValue: -10000000,
      timeframe: '24 horas',
      successProbability: 70
    },
    createdAt: new Date('2025-01-20T09:15:00')
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'Optimización de Timing de Seguimiento',
    description: 'Análisis de patrones de respuesta muestra que EcoFashion responde mejor los martes y jueves entre 10:00-12:00. Ajustar estrategia de seguimiento.',
    confidence: 92,
    impact: 'medium',
    category: 'timing',
    actionable: true,
    action: {
      label: 'Programar Seguimiento Optimizado',
      description: 'Reagendar próximos contactos para horarios óptimos',
      priority: 'medium'
    },
    data: {
      affectedClients: ['EcoFashion'],
      potentialValue: 0,
      timeframe: '1 semana',
      successProbability: 92
    },
    createdAt: new Date('2025-01-20T08:45:00')
  },
  {
    id: '4',
    type: 'prediction',
    title: 'Predicción de Cierre - HealthTech Pro',
    description: 'Modelo predictivo indica 95% de probabilidad de cierre exitoso en los próximos 5 días. Cliente muestra todos los indicadores de decisión positiva.',
    confidence: 95,
    impact: 'high',
    category: 'pipeline',
    actionable: true,
    action: {
      label: 'Preparar Documentación de Cierre',
      description: 'Tener listos todos los documentos para firma inmediata',
      priority: 'high'
    },
    data: {
      affectedClients: ['HealthTech Pro'],
      potentialValue: 15000000,
      timeframe: '5 días',
      successProbability: 95
    },
    createdAt: new Date('2025-01-20T07:20:00')
  },
  {
    id: '5',
    type: 'optimization',
    title: 'Optimización de Precios Sugerida',
    description: 'Análisis de mercado y competencia sugiere aumentar precios en 15% para proyectos de agrotecnología. Demanda alta y competencia limitada.',
    confidence: 82,
    impact: 'high',
    category: 'pricing',
    actionable: true,
    action: {
      label: 'Ajustar Estrategia de Precios',
      description: 'Revisar y actualizar precios para nuevos proyectos de agrotecnología',
      priority: 'medium'
    },
    data: {
      affectedClients: ['AgroTech Solutions'],
      potentialValue: 2000000,
      timeframe: '2 semanas',
      successProbability: 82
    },
    createdAt: new Date('2025-01-19T16:30:00')
  }
];

export function AIPipelineAssistant() {
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights);
  const [filter, setFilter] = useState<'all' | 'opportunity' | 'risk' | 'recommendation' | 'prediction' | 'optimization'>('all');
  const [impactFilter, setImpactFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case 'prediction': return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'optimization': return <Settings className="w-5 h-5 text-purple-600" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'risk': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'recommendation': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'prediction': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'optimization': return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20';
    }
  };

  const getImpactIcon = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high': return <Zap className="w-4 h-4 text-red-500" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Award className="w-4 h-4 text-green-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredInsights = insights.filter(insight => {
    const matchesType = filter === 'all' || insight.type === filter;
    const matchesImpact = impactFilter === 'all' || insight.impact === impactFilter;
    return matchesType && matchesImpact;
  });

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // In a real app, this would trigger actual AI analysis
    }, 3000);
  };

  const getInsightStats = () => {
    const total = insights.length;
    const opportunities = insights.filter(i => i.type === 'opportunity').length;
    const risks = insights.filter(i => i.type === 'risk').length;
    const highImpact = insights.filter(i => i.impact === 'high').length;
    const actionable = insights.filter(i => i.actionable).length;
    
    return { total, opportunities, risks, highImpact, actionable };
  };

  const stats = getInsightStats();

  return (
    <ContentLayout 
      title="Asistente IA del Pipeline" 
      subtitle="Inteligencia artificial avanzada para optimizar tu pipeline de consultoría"
    >
      {/* Métricas de IA */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Insights IA
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
                  {stats.opportunities}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Oportunidades
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.risks}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Riesgos
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
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

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.actionable}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Accionables
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de Control de IA */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Motor de Análisis IA
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Análisis en tiempo real del pipeline y predicciones inteligentes
              </p>
            </div>
          </div>
          <Button
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Ejecutar Análisis
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Datos Analizados</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-xs text-gray-500">puntos de datos</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Precisión IA</span>
            </div>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-xs text-gray-500">tasa de acierto</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Última Actualización</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">2m</div>
            <div className="text-xs text-gray-500">hace</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'opportunity', 'risk', 'recommendation', 'prediction', 'optimization'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todos' :
                 filterType === 'opportunity' ? 'Oportunidades' :
                 filterType === 'risk' ? 'Riesgos' :
                 filterType === 'recommendation' ? 'Recomendaciones' :
                 filterType === 'prediction' ? 'Predicciones' : 'Optimizaciones'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todos los impactos</option>
              <option value="high">Alto impacto</option>
              <option value="medium">Medio impacto</option>
              <option value="low">Bajo impacto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Insights de IA */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <Card 
            key={insight.id} 
            className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getInsightColor(insight.type)}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {insight.title}
                      </h3>
                      {getImpactIcon(insight.impact)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}% confianza
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {insight.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Clientes Afectados</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {insight.data.affectedClients.join(', ')}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Valor Potencial</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {formatCurrency(insight.data.potentialValue)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Timeframe</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {insight.data.timeframe}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Probabilidad de Éxito</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {insight.data.successProbability}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTimeAgo(insight.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{insight.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{insight.impact} impact</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  {insight.actionable && insight.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        insight.action.priority === 'urgent' ? 'text-red-600 border-red-300 hover:bg-red-50' :
                        insight.action.priority === 'high' ? 'text-orange-600 border-orange-300 hover:bg-orange-50' :
                        insight.action.priority === 'medium' ? 'text-blue-600 border-blue-300 hover:bg-blue-50' :
                        'text-green-600 border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {insight.action.label}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay insights disponibles
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all' || impactFilter !== 'all'
              ? 'No hay insights que coincidan con los filtros seleccionados'
              : 'Ejecuta un análisis de IA para generar insights inteligentes'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}



