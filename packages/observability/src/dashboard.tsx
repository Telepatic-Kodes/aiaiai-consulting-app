"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Zap,
  Users,
  Database,
  BarChart3,
  RefreshCw,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  unit: string;
  description: string;
}

interface AgentMetrics {
  agent: string;
  jobsProcessed: number;
  successRate: number;
  avgDuration: number;
  tokensUsed: number;
  lastActive: string;
  status: 'healthy' | 'warning' | 'error';
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  responseTime: number;
  errorRate: number;
  activeConnections: number;
}

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
  resolved: boolean;
}

/**
 * Observability Dashboard Component
 * 
 * Features:
 * - Real-time system metrics
 * - Agent performance monitoring
 * - Error tracking and alerting
 * - Cost and usage analytics
 * - Export capabilities
 * - Filtering and time range selection
 */

export default function ObservabilityDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  // Mock data - in production this would come from the observability API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMetrics([
        {
          name: 'Jobs Processed',
          value: 1247,
          change: 12.5,
          changeType: 'positive',
          unit: 'jobs',
          description: 'Total jobs processed in the last 24 hours'
        },
        {
          name: 'Success Rate',
          value: 96.8,
          change: 2.1,
          changeType: 'positive',
          unit: '%',
          description: 'Percentage of successfully completed jobs'
        },
        {
          name: 'Avg Response Time',
          value: 245,
          change: -15.2,
          changeType: 'positive',
          unit: 'ms',
          description: 'Average job processing time'
        },
        {
          name: 'Active Agents',
          value: 12,
          change: 0,
          changeType: 'neutral',
          unit: 'agents',
          description: 'Currently active agents'
        },
        {
          name: 'Tokens Used',
          value: 45678,
          change: 8.3,
          changeType: 'negative',
          unit: 'tokens',
          description: 'Total tokens consumed'
        },
        {
          name: 'Error Rate',
          value: 1.2,
          change: -0.5,
          changeType: 'positive',
          unit: '%',
          description: 'Percentage of failed jobs'
        }
      ]);

      setAgentMetrics([
        {
          agent: 'lead.scorer',
          jobsProcessed: 342,
          successRate: 98.5,
          avgDuration: 180,
          tokensUsed: 12345,
          lastActive: '2 minutes ago',
          status: 'healthy'
        },
        {
          agent: 'proposal.builder',
          jobsProcessed: 156,
          successRate: 95.2,
          avgDuration: 320,
          tokensUsed: 23456,
          lastActive: '5 minutes ago',
          status: 'healthy'
        },
        {
          agent: 'meeting.summarizer',
          jobsProcessed: 289,
          successRate: 97.8,
          avgDuration: 450,
          tokensUsed: 18765,
          lastActive: '1 minute ago',
          status: 'healthy'
        },
        {
          agent: 'crm.updater',
          jobsProcessed: 198,
          successRate: 89.4,
          avgDuration: 280,
          tokensUsed: 9876,
          lastActive: '15 minutes ago',
          status: 'warning'
        },
        {
          agent: 'followup.scheduler',
          jobsProcessed: 262,
          successRate: 99.1,
          avgDuration: 120,
          tokensUsed: 5432,
          lastActive: '3 minutes ago',
          status: 'healthy'
        }
      ]);

      setSystemHealth({
        status: 'healthy',
        uptime: '99.9%',
        responseTime: 245,
        errorRate: 1.2,
        activeConnections: 47
      });

      setAlerts([
        {
          id: '1',
          severity: 'medium',
          title: 'High Token Usage',
          description: 'CRM Updater agent is using 15% more tokens than usual',
          timestamp: '10 minutes ago',
          agent: 'crm.updater',
          resolved: false
        },
        {
          id: '2',
          severity: 'low',
          title: 'Slow Response Time',
          description: 'Proposal Builder average response time increased by 20%',
          timestamp: '25 minutes ago',
          agent: 'proposal.builder',
          resolved: false
        },
        {
          id: '3',
          severity: 'high',
          title: 'Agent Offline',
          description: 'Lead Scorer agent has been offline for 5 minutes',
          timestamp: '5 minutes ago',
          agent: 'lead.scorer',
          resolved: true
        }
      ]);

      setLoading(false);
    };

    fetchData();
  }, [timeRange, selectedAgent]);

  const filteredAgentMetrics = useMemo(() => {
    if (selectedAgent === 'all') return agentMetrics;
    return agentMetrics.filter(agent => agent.agent === selectedAgent);
  }, [agentMetrics, selectedAgent]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportData = () => {
    const data = {
      metrics,
      agentMetrics: filteredAgentMetrics,
      systemHealth,
      alerts,
      timestamp: new Date().toISOString(),
      timeRange,
      selectedAgent
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aiaiai-observability-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Cargando métricas...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Observabilidad del Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitoreo en tiempo real de agentes y métricas del sistema
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm"
          >
            <option value="1h">Última hora</option>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
          </select>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm"
          >
            <option value="all">Todos los agentes</option>
            {agentMetrics.map(agent => (
              <option key={agent.agent} value={agent.agent}>{agent.agent}</option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Exportar
          </Button>
        </div>
      </div>

      {/* System Health */}
      {systemHealth && (
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Estado del Sistema
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.status)}`}>
                {systemHealth.status === 'healthy' ? 'Saludable' : 
                 systemHealth.status === 'degraded' ? 'Degradado' : 'Fuera de servicio'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {systemHealth.uptime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {systemHealth.responseTime}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tiempo de respuesta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {systemHealth.errorRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tasa de error</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {systemHealth.activeConnections}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Conexiones activas</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {metric.description}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' :
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.changeType === 'positive' ? '+' : ''}{metric.change}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {metric.value.toLocaleString()} {metric.unit}
            </div>
          </Card>
        ))}
      </div>

      {/* Agent Performance */}
      <div className="mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Rendimiento de Agentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Agente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Jobs Procesados</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Tasa de Éxito</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Duración Promedio</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Tokens Usados</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Última Actividad</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgentMetrics.map((agent, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {agent.agent}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                        {agent.status === 'healthy' ? 'Saludable' :
                         agent.status === 'warning' ? 'Advertencia' : 'Error'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {agent.jobsProcessed.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {agent.successRate}%
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {agent.avgDuration}ms
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {agent.tokensUsed.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {agent.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Alertas del Sistema
          </h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                alert.severity === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {alert.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {alert.timestamp}
                      {alert.agent && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Agente: {alert.agent}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    {alert.resolved ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Resuelto
                      </span>
                    ) : (
                      <Button variant="outline" size="sm">
                        Resolver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
