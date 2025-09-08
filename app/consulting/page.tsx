"use client";

import React, { useState } from 'react';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { ClientManager } from '@/components/consulting/ClientManager';
import { ClientPipeline } from '@/components/consulting/ClientPipeline';
import { ConsultingAnalytics } from '@/components/consulting/ConsultingAnalytics';
import { AIPipelineAssistant } from '@/components/consulting/AIPipelineAssistant';
import { PredictiveAnalytics } from '@/components/consulting/PredictiveAnalytics';
import { NotificationCenter } from '@/components/consulting/NotificationCenter';
import { TaskManager } from '@/components/consulting/TaskManager';
import { AutomationHub } from '@/components/consulting/AutomationHub';
import { MeetingManager } from '@/components/consulting/MeetingManager';
import { ProposalGenerator } from '@/components/consulting/ProposalGenerator';
import { ProcessSimulator } from '@/components/consulting/ProcessSimulator';
import { PromptManager } from '@/components/consulting/PromptManager';
import { ReminderSystem } from '@/components/consulting/ReminderSystem';
import { RealTimeDashboard } from '@/components/consulting/RealTimeDashboard';
import { TemplateManager } from '@/components/consulting/TemplateManager';
import { AutoReportSystem } from '@/components/consulting/AutoReportSystem';
import { 
  Users, 
  Calendar, 
  FileText, 
  Brain,
  DollarSign,
  BarChart3,
  CheckCircle,
  ArrowRight,
  GitBranch,
  TrendingUp,
  Bell,
  CheckSquare,
  Zap,
  Target,
  Activity
} from 'lucide-react';

export default function ConsultingPage() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'overview' | 'analytics' | 'ai-assistant' | 'predictions' | 'notifications' | 'tasks' | 'automation' | 'clients' | 'meetings' | 'proposals' | 'simulator' | 'prompts' | 'reminders' | 'dashboard' | 'templates' | 'reports'>('pipeline');
  const [activeCategory, setActiveCategory] = useState<string>('main');

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3, category: 'main' },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch, category: 'main' },
    { id: 'proposals', label: 'Propuestas', icon: FileText, category: 'main' },
    { id: 'clients', label: 'Clientes', icon: Users, category: 'main' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, category: 'analytics' },
    { id: 'dashboard', label: 'Dashboard', icon: Activity, category: 'analytics' },
    { id: 'predictions', label: 'Predicciones', icon: Target, category: 'analytics' },
    { id: 'reports', label: 'Reportes', icon: BarChart3, category: 'analytics' },
    { id: 'tasks', label: 'Tareas', icon: CheckSquare, category: 'productivity' },
    { id: 'reminders', label: 'Recordatorios', icon: Bell, category: 'productivity' },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, category: 'productivity' },
    { id: 'templates', label: 'Plantillas', icon: FileText, category: 'productivity' },
    { id: 'ai-assistant', label: 'IA Assistant', icon: Brain, category: 'ai' },
    { id: 'simulator', label: 'Simulador', icon: Brain, category: 'ai' },
    { id: 'prompts', label: 'Prompts', icon: Brain, category: 'ai' }
  ];

  const categories = [
    { id: 'main', label: 'Principal', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'productivity', label: 'Productividad', icon: CheckSquare },
    { id: 'ai', label: 'IA & Automatización', icon: Brain }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pipeline':
        return <ClientPipeline />;
      case 'analytics':
        return <ConsultingAnalytics />;
      case 'ai-assistant':
        return <AIPipelineAssistant />;
      case 'predictions':
        return <PredictiveAnalytics />;
      case 'notifications':
        return <NotificationCenter />;
      case 'tasks':
        return <TaskManager />;
      case 'automation':
        return <AutomationHub />;
      case 'clients':
        return <ClientManager />;
      case 'meetings':
        return <MeetingManager />;
      case 'proposals':
        return <ProposalGenerator />;
      case 'simulator':
        return <ProcessSimulator />;
      case 'prompts':
        return <PromptManager />;
      case 'reminders':
        return <ReminderSystem />;
      case 'dashboard':
        return <RealTimeDashboard />;
      case 'templates':
        return <TemplateManager />;
      case 'reports':
        return <AutoReportSystem />;
      default:
        return (
          <div className="space-y-8">
            {/* Métricas Generales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StandardMetricCard
                title="Clientes Activos"
                value="12"
                icon={Users}
                color="blue"
                change="+3 este mes"
                changeType="positive"
                description="Clientes en pipeline activo"
              />
              <StandardMetricCard
                title="Reuniones Programadas"
                value="8"
                icon={Calendar}
                color="green"
                change="+2 esta semana"
                changeType="positive"
                description="Próximas reuniones"
              />
              <StandardMetricCard
                title="Propuestas Enviadas"
                value="5"
                icon={FileText}
                color="yellow"
                change="+1 esta semana"
                changeType="positive"
                description="Propuestas en revisión"
              />
              <StandardMetricCard
                title="Valor Pipeline"
                value="$45M CLP"
                icon={DollarSign}
                color="purple"
                change="+25% este mes"
                changeType="positive"
                description="Valor total del pipeline"
              />
            </div>

            {/* Proceso de Consultoría */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Proceso de Consultoría AIAIAI
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Agendamiento</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Programamos reuniones con clientes potenciales para entender sus necesidades
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Reunión & Transcripción</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Realizamos la reunión vía Google Meet y transcribimos automáticamente
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Análisis con IA</h4>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Nuestro Meetintel Agent analiza la reunión y genera insights clave
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Propuesta Técnica</h4>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Generamos una propuesta técnica personalizada basada en los insights
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Benchmark & Research</h4>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Realizamos deep research del mercado chileno y competencia
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">6</span>
                    </div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">Propuesta Comercial</h4>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Finalizamos con una propuesta comercial competitiva y atractiva
                  </p>
                </div>
              </div>
            </div>

            {/* Caso de Estudio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Caso de Estudio: Sueño Andino
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Cliente:</strong> Sueño Andino - Agencia de Turismo Sostenible<br/>
                  <strong>Industria:</strong> Turismo<br/>
                  <strong>Presupuesto:</strong> $2-5M CLP anuales<br/>
                  <strong>Timeline:</strong> Implementación antes de octubre 2025
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Necesidades Identificadas</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Automatización de atención al cliente</li>
                    <li>• Respuesta rápida en WhatsApp (70% de consultas)</li>
                    <li>• Sistema de reservas integrado</li>
                    <li>• Escalabilidad para crecimiento</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Solución Propuesta</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Agente de WhatsApp con IA</li>
                    <li>• Agente de Email automatizado</li>
                    <li>• Sistema de reservas integrado</li>
                    <li>• Panel de administración</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Propuesta Enviada: $18.5M CLP</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  ROI esperado: 300% en el primer año
                </p>
              </div>
            </div>

            {/* Acciones Rápidas - Pipeline Centrado */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl border-2 border-purple-400 p-6 transform hover:scale-110 transition-all duration-300 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl mb-2">🚀 Pipeline Visual</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Centro de control de tu consultoría
                  </p>
                  <button 
                    onClick={() => setActiveTab('pipeline')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Ver Pipeline ✨
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl border-2 border-green-400 p-6 transform hover:scale-105 transition-all duration-300 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">📊 Analytics</h4>
                  <p className="text-green-100 text-xs mb-3">
                    Métricas y análisis
                  </p>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300"
                  >
                    Ver Analytics
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Bell className="w-6 h-6 text-orange-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Notificaciones</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Centro de notificaciones inteligentes
                </p>
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Ver notificaciones <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckSquare className="w-6 h-6 text-indigo-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Tareas</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Gestor de tareas y recordatorios
                </p>
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Ver tareas <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Automatización</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Centro de automatización inteligente
                </p>
                <button 
                  onClick={() => setActiveTab('automation')}
                  className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Ver automatización <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl border-2 border-blue-400 p-6 transform hover:scale-105 transition-all duration-300 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">🧠 IA Assistant</h4>
                  <p className="text-blue-100 text-xs mb-3">
                    Inteligencia artificial
                  </p>
                  <button 
                    onClick={() => setActiveTab('ai-assistant')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300"
                  >
                    Ver IA
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl border-2 border-orange-400 p-6 transform hover:scale-105 transition-all duration-300 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">🎯 Predicciones</h4>
                  <p className="text-orange-100 text-xs mb-3">
                    Analytics predictivos
                  </p>
                  <button 
                    onClick={() => setActiveTab('predictions')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300"
                  >
                    Ver Predicciones
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Gestionar Clientes</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Administra tu pipeline de clientes y prospectos
                </p>
                <button 
                  onClick={() => setActiveTab('clients')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver clientes <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Reuniones</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Programa y gestiona tus reuniones con clientes
                </p>
                <button 
                  onClick={() => setActiveTab('meetings')}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Ver reuniones <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Propuestas</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Genera propuestas profesionales con IA
                </p>
                <button 
                  onClick={() => setActiveTab('proposals')}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Ver propuestas <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ContentLayout 
      title="Consultoría AIAIAI" 
      subtitle="Gestión completa del proceso de consultoría"
    >
      {/* Navegación por Categorías */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        {/* Categorías principales */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    // Seleccionar la primera pestaña de la categoría
                    const firstTab = tabs.find(tab => tab.category === category.id);
                    if (firstTab) setActiveTab(firstTab.id as any);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeCategory === category.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Pestañas de la categoría activa */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {tabs
              .filter(tab => tab.category === activeCategory)
              .map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-green-100 hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Contenido */}
      {renderContent()}
    </ContentLayout>
  );
}
