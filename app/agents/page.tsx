"use client";

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  Monitor,
  Users, 
  Briefcase, 
  DollarSign,
  Plus
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  performance: number;
  lastActive: string;
  tasks: number;
  responseTime?: number;
  accuracy?: number;
  cost?: number;
  capabilities?: string[];
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Meeting Summarizer',
    type: 'NLP',
    status: 'active',
    performance: 95,
    lastActive: 'Hace 2 horas',
    tasks: 45,
    responseTime: 1.2,
    accuracy: 98,
    cost: 0.05,
    capabilities: ['Análisis de texto', 'Resumen automático']
  },
  {
    id: '2',
    name: 'Proposal Builder',
    type: 'Generative',
    status: 'active',
    performance: 88,
    lastActive: 'Hace 1 hora',
    tasks: 23,
    responseTime: 2.1,
    accuracy: 95,
    cost: 0.08,
    capabilities: ['Generación de contenido', 'Análisis de propuestas']
  },
  {
    id: '3',
    name: 'Lead Scorer',
    type: 'ML',
    status: 'training',
    performance: 75,
    lastActive: 'Hace 3 horas',
    tasks: 12,
    responseTime: 1.8,
    accuracy: 92,
    cost: 0.06,
    capabilities: ['Scoring de leads', 'Predicción de conversión']
  }
];

export default function AgentsPage() {
  const [agents] = useState<Agent[]>(mockAgents);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'comparison'>('overview');

  return (
    <ProtectedRoute>
      <StandardLayout
        title="Gestión de Agentes"
        subtitle="Administra y monitorea tus agentes de IA"
        actions={
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.href = '/agents/catalog'}
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Catálogo
            </button>
            <button
              onClick={() => window.location.href = '/agents/new'}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Agente
            </button>
          </div>
        }
      >
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comparison'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Comparación
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StandardMetricCard
                title="Total Agentes"
                value={agents.length}
                icon={Monitor}
                color="blue"
                description="Agentes en el sistema"
              />
              <StandardMetricCard
                title="Activos"
                value={agents.filter(a => a.status === 'active').length}
                icon={Users}
                color="green"
                description="Agentes ejecutando tareas"
              />
              <StandardMetricCard
                title="Entrenando"
                value={agents.filter(a => a.status === 'training').length}
                icon={Briefcase}
                color="yellow"
                description="Agentes en proceso de aprendizaje"
              />
              <StandardMetricCard
                title="Promedio Rendimiento"
                value={`${Math.round(agents.reduce((acc, agent) => acc + agent.performance, 0) / agents.length)}%`}
                icon={DollarSign}
                color="purple"
                description="Eficiencia general del sistema"
              />
            </div>

            {/* Agents List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Lista de Agentes
                </h2>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{agent.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          agent.status === 'training' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {agent.status === 'active' ? 'Activo' : agent.status === 'training' ? 'Entrenando' : 'Inactivo'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{agent.performance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">Funcionalidad de analytics en desarrollo.</p>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Comparación</h3>
            <p className="text-gray-600 dark:text-gray-400">Funcionalidad de comparación en desarrollo.</p>
          </div>
        )}
      </StandardLayout>
    </ProtectedRoute>
  );
}