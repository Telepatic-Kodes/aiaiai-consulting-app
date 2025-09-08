"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  Mail, 
  Phone, 
  FileText, 
  Calendar,
  TrendingUp,
  Target,
  Award,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Activity,
  Brain,
  Cpu,
  Database,
  BarChart3
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'time' | 'status' | 'action' | 'condition';
    condition: string;
    value: string;
  };
  action: {
    type: 'email' | 'task' | 'notification' | 'update' | 'reminder';
    template: string;
    target: string;
  };
  enabled: boolean;
  lastExecuted?: Date;
  executionCount: number;
  successRate: number;
  category: 'pipeline' | 'followup' | 'meeting' | 'proposal' | 'analytics';
  priority: 'high' | 'medium' | 'low';
}

// Mock automation rules
const mockAutomations: AutomationRule[] = [
  {
    id: '1',
    name: 'Seguimiento Automático de Propuestas',
    description: 'Envía recordatorio automático 3 días después de enviar una propuesta sin respuesta',
    trigger: {
      type: 'time',
      condition: 'days_since_proposal_sent',
      value: '3'
    },
    action: {
      type: 'email',
      template: 'followup_proposal',
      target: 'client_email'
    },
    enabled: true,
    lastExecuted: new Date('2025-01-19T10:00:00'),
    executionCount: 12,
    successRate: 85,
    category: 'followup',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Recordatorio de Reuniones',
    description: 'Envía recordatorio 1 hora antes de cada reunión programada',
    trigger: {
      type: 'time',
      condition: 'meeting_reminder',
      value: '1_hour'
    },
    action: {
      type: 'notification',
      template: 'meeting_reminder',
      target: 'user'
    },
    enabled: true,
    lastExecuted: new Date('2025-01-20T14:00:00'),
    executionCount: 8,
    successRate: 100,
    category: 'meeting',
    priority: 'high'
  },
  {
    id: '3',
    name: 'Actualización de Pipeline',
    description: 'Actualiza automáticamente el estado del pipeline cuando se completa una reunión',
    trigger: {
      type: 'action',
      condition: 'meeting_completed',
      value: 'true'
    },
    action: {
      type: 'update',
      template: 'pipeline_status',
      target: 'client_status'
    },
    enabled: true,
    lastExecuted: new Date('2025-01-20T15:30:00'),
    executionCount: 5,
    successRate: 100,
    category: 'pipeline',
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Generación de Tareas de Seguimiento',
    description: 'Crea automáticamente tareas de seguimiento después de cada reunión',
    trigger: {
      type: 'action',
      condition: 'meeting_completed',
      value: 'true'
    },
    action: {
      type: 'task',
      template: 'followup_task',
      target: 'task_manager'
    },
    enabled: true,
    lastExecuted: new Date('2025-01-20T15:35:00'),
    executionCount: 5,
    successRate: 100,
    category: 'followup',
    priority: 'medium'
  },
  {
    id: '5',
    name: 'Alertas de Oportunidades Calientes',
    description: 'Notifica cuando un cliente entra en etapa de negociación',
    trigger: {
      type: 'status',
      condition: 'client_status',
      value: 'negotiating'
    },
    action: {
      type: 'notification',
      template: 'hot_opportunity',
      target: 'user'
    },
    enabled: true,
    lastExecuted: new Date('2025-01-20T09:15:00'),
    executionCount: 3,
    successRate: 100,
    category: 'pipeline',
    priority: 'high'
  },
  {
    id: '6',
    name: 'Reporte Semanal Automático',
    description: 'Genera y envía reporte semanal de métricas del pipeline',
    trigger: {
      type: 'time',
      condition: 'weekly_report',
      value: 'monday_9am'
    },
    action: {
      type: 'email',
      template: 'weekly_report',
      target: 'user_email'
    },
    enabled: false,
    lastExecuted: new Date('2025-01-13T09:00:00'),
    executionCount: 4,
    successRate: 100,
    category: 'analytics',
    priority: 'low'
  }
];

export function AutomationHub() {
  const [automations, setAutomations] = useState<AutomationRule[]>(mockAutomations);
  const [filter, setFilter] = useState<'all' | 'enabled' | 'disabled' | 'high_priority'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getCategoryIcon = (category: AutomationRule['category']) => {
    switch (category) {
      case 'pipeline': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'followup': return <Phone className="w-4 h-4 text-green-600" />;
      case 'meeting': return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'proposal': return <FileText className="w-4 h-4 text-orange-600" />;
      case 'analytics': return <BarChart3 className="w-4 h-4 text-red-600" />;
    }
  };

  const getPriorityIcon = (priority: AutomationRule['priority']) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Award className="w-4 h-4 text-green-500" />;
    }
  };

  const getActionIcon = (actionType: AutomationRule['action']['type']) => {
    switch (actionType) {
      case 'email': return <Mail className="w-4 h-4 text-blue-600" />;
      case 'task': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'notification': return <Bell className="w-4 h-4 text-yellow-600" />;
      case 'update': return <Database className="w-4 h-4 text-purple-600" />;
      case 'reminder': return <Clock className="w-4 h-4 text-orange-600" />;
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

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { ...automation, enabled: !automation.enabled }
          : automation
      )
    );
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  const filteredAutomations = automations.filter(automation => {
    const matchesFilter = filter === 'all' || 
      (filter === 'enabled' && automation.enabled) ||
      (filter === 'disabled' && !automation.enabled) ||
      (filter === 'high_priority' && automation.priority === 'high');
    
    const matchesCategory = categoryFilter === 'all' || automation.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  const getAutomationStats = () => {
    const total = automations.length;
    const enabled = automations.filter(a => a.enabled).length;
    const disabled = automations.filter(a => !a.enabled).length;
    const totalExecutions = automations.reduce((sum, a) => sum + a.executionCount, 0);
    const avgSuccessRate = automations.length > 0 
      ? Math.round(automations.reduce((sum, a) => sum + a.successRate, 0) / automations.length)
      : 0;
    
    return { total, enabled, disabled, totalExecutions, avgSuccessRate };
  };

  const stats = getAutomationStats();

  return (
    <ContentLayout 
      title="Centro de Automatización" 
      subtitle="Automatiza procesos y mejora la eficiencia del pipeline de consultoría"
    >
      {/* Métricas de Automatización */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Reglas
                </div>
              </div>
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.enabled}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Activas
                </div>
              </div>
              <ToggleRight className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {stats.disabled}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Inactivas
                </div>
              </div>
              <ToggleLeft className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalExecutions}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Ejecuciones
                </div>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.avgSuccessRate}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Éxito Promedio
                </div>
              </div>
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'enabled', 'disabled', 'high_priority'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todas' :
                 filterType === 'enabled' ? 'Activas' :
                 filterType === 'disabled' ? 'Inactivas' : 'Alta Prioridad'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="pipeline">Pipeline</option>
              <option value="followup">Seguimiento</option>
              <option value="meeting">Reuniones</option>
              <option value="proposal">Propuestas</option>
              <option value="analytics">Analytics</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Regla
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de Automatizaciones */}
      <div className="space-y-4">
        {filteredAutomations.map((automation) => (
          <Card 
            key={automation.id} 
            className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
              automation.enabled ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-400'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {automation.enabled ? (
                      <ToggleRight className="w-6 h-6 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${automation.enabled ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                        {automation.name}
                      </h3>
                      {getCategoryIcon(automation.category)}
                      {getPriorityIcon(automation.priority)}
                      {getActionIcon(automation.action.type)}
                    </div>
                    
                    <p className={`text-sm mb-3 ${automation.enabled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>
                      {automation.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Trigger</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {automation.trigger.condition.replace('_', ' ')}: {automation.trigger.value}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Acción</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {automation.action.type}: {automation.action.template}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        {automation.executionCount} ejecuciones
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {automation.successRate}% éxito
                      </div>
                      {automation.lastExecuted && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Última: {formatTimeAgo(automation.lastExecuted)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAutomation(automation.id)}
                    className={automation.enabled 
                      ? 'text-red-600 border-red-300 hover:bg-red-50' 
                      : 'text-green-600 border-green-300 hover:bg-green-50'
                    }
                  >
                    {automation.enabled ? 'Desactivar' : 'Activar'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteAutomation(automation.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAutomations.length === 0 && (
        <div className="text-center py-12">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay automatizaciones
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all' || categoryFilter !== 'all'
              ? 'No hay automatizaciones que coincidan con los filtros seleccionados'
              : 'Comienza creando tu primera regla de automatización'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}



