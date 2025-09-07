import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  Bot, 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Agents Management Page
 * 
 * Features:
 * - Agent catalog overview
 * - Agent status monitoring
 * - Quick actions
 * - Performance metrics
 * - Professional UI/UX
 * - Consistent with AIAIAI Consulting design system
 */
export default function AgentsPage() {
  // Mock data for demonstration
  const agentMetrics = [
    {
      title: 'Agentes Activos',
      value: '5',
      change: 2,
      changeType: 'number' as const,
      icon: Bot,
      trend: 'up' as const,
      description: 'Agentes ejecutando tareas'
    },
    {
      title: 'Tareas Completadas',
      value: '1,247',
      change: 156,
      changeType: 'number' as const,
      icon: CheckCircle,
      trend: 'up' as const,
      description: 'Este mes'
    },
    {
      title: 'Tiempo Promedio',
      value: '2.3m',
      change: -0.5,
      changeType: 'number' as const,
      icon: Clock,
      trend: 'up' as const,
      description: 'Por tarea'
    },
    {
      title: 'Precisión Promedio',
      value: '94.2%',
      change: 2.1,
      changeType: 'percentage' as const,
      icon: TrendingUp,
      trend: 'up' as const,
      description: 'Tasa de éxito'
    }
  ];

  const agents = [
    {
      id: 'meeting.summarizer',
      name: 'Meeting Summarizer',
      description: 'Resumen automático de reuniones con extracción de tareas accionables',
      status: 'active',
      version: '1.0.0',
      tasksCompleted: 342,
      accuracy: 94.2,
      lastRun: '2025-01-15T10:30:00Z',
      category: 'Operaciones & Cliente',
      pricing: '$39/mes'
    },
    {
      id: 'proposal.builder',
      name: 'Proposal Builder',
      description: 'Generación automática de propuestas comerciales profesionales',
      status: 'active',
      version: '1.0.0',
      tasksCompleted: 89,
      accuracy: 96.8,
      lastRun: '2025-01-15T09:15:00Z',
      category: 'Comercial & Marketing',
      pricing: '$79/mes'
    },
    {
      id: 'lead.scorer',
      name: 'Lead Scorer',
      description: 'Calificación automática de leads con análisis de comportamiento',
      status: 'active',
      version: '1.0.0',
      tasksCompleted: 567,
      accuracy: 91.5,
      lastRun: '2025-01-15T11:45:00Z',
      category: 'Comercial & Marketing',
      pricing: '$49/mes'
    },
    {
      id: 'crm.updater',
      name: 'CRM Updater',
      description: 'Sincronización automática de datos entre sistemas',
      status: 'development',
      version: '0.9.0',
      tasksCompleted: 123,
      accuracy: 98.1,
      lastRun: '2025-01-14T16:20:00Z',
      category: 'Operaciones & Cliente',
      pricing: '$59/mes'
    },
    {
      id: 'followup.scheduler',
      name: 'Follow-up Scheduler',
      description: 'Automatización de seguimientos y agendamiento',
      status: 'development',
      version: '0.8.0',
      tasksCompleted: 78,
      accuracy: 89.3,
      lastRun: '2025-01-14T14:10:00Z',
      category: 'Comercial & Marketing',
      pricing: '$49/mes'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'development':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'development':
        return <AlertCircle className="h-4 w-4" />;
      case 'inactive':
        return <Pause className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Agentes
            </h1>
            <p className="text-gray-600 mt-2">
              Administra y monitorea tus agentes de IA especializados
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" leftIcon={<Settings className="h-4 w-4" />}>
              Configuración
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Nuevo Agente
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {agentMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            trend={metric.trend}
            description={metric.description}
          />
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      v{agent.version}
                    </p>
                  </div>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                  {getStatusIcon(agent.status)}
                  <span className="ml-1 capitalize">{agent.status}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4">
                {agent.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Categoría:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {agent.category}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tareas completadas:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {agent.tasksCompleted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precisión:</span>
                  <span className="text-sm font-medium text-green-600">
                    {agent.accuracy}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precio:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {agent.pricing}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex-1"
                  leftIcon={<Play className="h-4 w-4" />}
                >
                  {agent.status === 'active' ? 'Ejecutar' : 'Activar'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={<Settings className="h-4 w-4" />}
                >
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AIAIAI Consulting Branding */}
      <div className="text-center py-8 mt-12">
        <div className="inline-flex items-center space-x-2 text-gray-500">
          <span className="text-sm">Powered by</span>
          <span className="font-semibold text-primary-600">AIAIAI Consulting</span>
          <span className="text-sm">- Tú enseñas. Ellos ejecutan. Tú creces.</span>
        </div>
      </div>
    </div>
  );
}