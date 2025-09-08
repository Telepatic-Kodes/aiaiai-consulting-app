"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Download,
  Share
} from 'lucide-react';

interface AgentDetails {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive' | 'training';
  performance: number;
  lastActive: string;
  tasks: number;
  capabilities: string[];
  trainingData: string;
  performanceTarget: number;
  createdAt: string;
  totalTasksCompleted: number;
  averageResponseTime: string;
  accuracy: number;
}

// Mock data - en una aplicación real esto vendría de una API
const mockAgentDetails: AgentDetails = {
  id: '1',
  name: 'Analista Financiero',
  type: 'Análisis',
  description: 'Agente especializado en análisis financiero, generación de reportes y predicción de tendencias del mercado.',
  status: 'active',
  performance: 95,
  lastActive: 'Hace 2 minutos',
  tasks: 12,
  capabilities: [
    'Análisis de datos financieros',
    'Generación de reportes',
    'Predicción de tendencias',
    'Análisis de riesgo',
    'Optimización de carteras'
  ],
  trainingData: 'Entrenado con datos financieros históricos de los últimos 5 años, incluyendo análisis de mercado, reportes corporativos y métricas de rendimiento.',
  performanceTarget: 90,
  createdAt: '2024-01-15',
  totalTasksCompleted: 1247,
  averageResponseTime: '2.3s',
  accuracy: 94.2
};

export default function AgentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [agent] = useState<AgentDetails>(mockAgentDetails);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: AgentDetails['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'training': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  const getStatusText = (status: AgentDetails['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'training': return 'Entrenando';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400';
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: BarChart3 },
    { id: 'performance', name: 'Rendimiento', icon: Activity },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  return (
    <ProtectedRoute>
      <StandardLayout
        title={`Agente: ${agent.name}`}
        subtitle="Detalles y configuración del agente"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        }
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{agent.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-600 dark:text-gray-400">{agent.type}</span>
                  <span className={cn(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    getStatusColor(agent.status)
                  )}>
                    {getStatusText(agent.status)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share className="w-4 h-4" />
                <span>Compartir</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendimiento Actual</p>
                      <p className={cn("text-2xl font-bold mt-1", getPerformanceColor(agent.performance))}>
                        {agent.performance}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tareas Completadas</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {agent.totalTasksCompleted.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tiempo de Respuesta</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {agent.averageResponseTime}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Precisión</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {agent.accuracy}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description and Capabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{agent.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Capacidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {agent.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">Análisis de reporte financiero completado</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">Nueva tarea asignada: Análisis de tendencias Q1</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hace 15 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">Actualización de modelo de predicción</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hace 1 hora</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rendimiento General</span>
                      <span className={cn("text-sm font-medium", getPerformanceColor(agent.performance))}>
                        {agent.performance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={cn(
                          "h-3 rounded-full transition-all duration-300",
                          agent.performance >= 90 ? "bg-green-500" :
                          agent.performance >= 70 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${agent.performance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Precisión</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{agent.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="h-3 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${agent.accuracy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{agent.totalTasksCompleted}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tareas Completadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{agent.averageResponseTime}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tiempo Promedio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{agent.performanceTarget}%</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Objetivo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Agente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre del Agente
                  </label>
                  <input
                    type="text"
                    value={agent.name}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={agent.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Objetivo de Rendimiento (%)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={agent.performanceTarget}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>60%</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{agent.performanceTarget}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Iniciar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Pause className="w-4 h-4" />
                      <span>Pausar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Reiniciar</span>
                    </Button>
                  </div>
                  
                  <Button className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exportar Configuración</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </StandardLayout>
    </ProtectedRoute>
  );
}
