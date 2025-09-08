"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  Edit,
  Search
} from 'lucide-react';
import { Client } from '@/types/consulting';

// Mock data para demostración
const mockClients: Client[] = [
  {
    id: '1',
    name: 'María González',
    company: 'Sueño Andino',
    industry: 'Turismo Sostenible',
    email: 'maria@sueñoandino.cl',
    phone: '+56 9 1234 5678',
    size: 'pyme',
    budget: { min: 2000000, max: 5000000, currency: 'CLP' },
    timeline: 'Antes de octubre 2025',
    status: 'proposal_sent',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    company: 'TechStart Chile',
    industry: 'Tecnología',
    email: 'carlos@techstart.cl',
    phone: '+56 9 8765 4321',
    size: 'startup',
    budget: { min: 5000000, max: 10000000, currency: 'CLP' },
    timeline: 'Q2 2025',
    status: 'negotiating',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-12')
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    company: 'EcoFashion',
    industry: 'Moda Sostenible',
    email: 'ana@ecofashion.cl',
    phone: '+56 9 5555 1234',
    size: 'pyme',
    budget: { min: 3000000, max: 6000000, currency: 'CLP' },
    timeline: 'Marzo 2025',
    status: 'meeting_scheduled',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14')
  },
  {
    id: '4',
    name: 'Roberto Silva',
    company: 'AgroTech Solutions',
    industry: 'Agrotecnología',
    email: 'roberto@agrotech.cl',
    phone: '+56 9 7777 8888',
    size: 'empresa',
    budget: { min: 10000000, max: 20000000, currency: 'CLP' },
    timeline: 'Q1 2025',
    status: 'meeting_completed',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: '5',
    name: 'Laura Martínez',
    company: 'HealthTech Pro',
    industry: 'Salud Digital',
    email: 'laura@healthtech.cl',
    phone: '+56 9 9999 1111',
    size: 'startup',
    budget: { min: 8000000, max: 15000000, currency: 'CLP' },
    timeline: 'Q2 2025',
    status: 'closed_won',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '6',
    name: 'Diego Herrera',
    company: 'EduTech Innovations',
    industry: 'Educación',
    email: 'diego@edutech.cl',
    phone: '+56 9 3333 4444',
    size: 'pyme',
    budget: { min: 4000000, max: 8000000, currency: 'CLP' },
    timeline: 'Abril 2025',
    status: 'prospect',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16')
  }
];

interface PipelineStage {
  id: string;
  name: string;
  status: Client['status'];
  color: string;
  icon: React.ReactNode;
  description: string;
  order: number;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'prospect',
    name: 'Prospecto',
    status: 'prospect',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: <Users className="w-5 h-5" />,
    description: 'Cliente potencial identificado',
    order: 1
  },
  {
    id: 'meeting_scheduled',
    name: 'Reunión Agendada',
    status: 'meeting_scheduled',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Reunión programada',
    order: 2
  },
  {
    id: 'meeting_completed',
    name: 'Reunión Completada',
    status: 'meeting_completed',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle className="w-5 h-5" />,
    description: 'Reunión realizada, analizando',
    order: 3
  },
  {
    id: 'proposal_sent',
    name: 'Propuesta Enviada',
    status: 'proposal_sent',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: <FileText className="w-5 h-5" />,
    description: 'Propuesta enviada, esperando respuesta',
    order: 4
  },
  {
    id: 'negotiating',
    name: 'Negociando',
    status: 'negotiating',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'En proceso de negociación',
    order: 5
  },
  {
    id: 'closed_won',
    name: 'Ganado',
    status: 'closed_won',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle className="w-5 h-5" />,
    description: 'Cliente ganado',
    order: 6
  },
  {
    id: 'closed_lost',
    name: 'Perdido',
    status: 'closed_lost',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: <AlertCircle className="w-5 h-5" />,
    description: 'Oportunidad perdida',
    order: 7
  }
];

export function ClientPipeline() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedClient, setDraggedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || client.status === selectedStage;
    return matchesSearch && matchesStage;
  });

  const getClientsByStage = (stageStatus: Client['status']) => {
    return clients.filter(client => client.status === stageStatus);
  };

  const getStageInfo = (status: Client['status']) => {
    return PIPELINE_STAGES.find(stage => stage.status === status);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysSinceUpdate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalPipelineValue = () => {
    return clients
      .filter(client => !['closed_won', 'closed_lost'].includes(client.status))
      .reduce((sum, client) => sum + client.budget.max, 0);
  };

  const getConversionRate = () => {
    const total = clients.length;
    const won = clients.filter(c => c.status === 'closed_won').length;
    return total > 0 ? Math.round((won / total) * 100) : 0;
  };

  // Funciones de Drag & Drop
  const handleDragStart = useCallback((client: Client) => {
    setDraggedClient(client);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedClient(null);
  }, []);

  const handleDrop = useCallback((newStatus: Client['status']) => {
    if (draggedClient && draggedClient.status !== newStatus) {
      setClients(prev => prev.map(client => 
        client.id === draggedClient.id 
          ? { ...client, status: newStatus, updatedAt: new Date() }
          : client
      ));
    }
    setDraggedClient(null);
  }, [draggedClient]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <ContentLayout 
      title="🎯 Pipeline de Clientes" 
      subtitle="Gestiona todo tu proceso de consultoría de forma visual e intuitiva"
    >
      {/* Métricas del Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Total Clientes"
          value={clients.length}
          icon={Users}
          color="blue"
          change={`${getClientsByStage('prospect').length} prospectos`}
          changeType="neutral"
        />
        <StandardMetricCard
          title="Valor Pipeline"
          value={formatCurrency(getTotalPipelineValue(), 'CLP')}
          icon={DollarSign}
          color="green"
          change="+15% este mes"
          changeType="positive"
        />
        <StandardMetricCard
          title="Tasa de Conversión"
          value={`${getConversionRate()}%`}
          icon={TrendingUp}
          color="purple"
          change="+5% vs mes anterior"
          changeType="positive"
        />
        <StandardMetricCard
          title="Promedio de Cierre"
          value="45 días"
          icon={Clock}
          color="yellow"
          change="-3 días vs promedio"
          changeType="positive"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las etapas</option>
              {PIPELINE_STAGES.map(stage => (
                <option key={stage.id} value={stage.status}>
                  {stage.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pipeline Visual Mejorado */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                🚀 Tu Pipeline Visual
              </h3>
              <p className="text-blue-100">
                Arrastra y organiza tus clientes de forma intuitiva
              </p>
            </div>
            <div className="text-right">
              <div className="text-blue-100 text-sm">Total Clientes</div>
              <div className="text-3xl font-bold">{clients.length}</div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mt-2"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex overflow-x-auto gap-6 pb-4">
            {PIPELINE_STAGES.map((stage, index) => {
              const stageClients = getClientsByStage(stage.status);
              const stageValue = stageClients.reduce((sum, client) => sum + client.budget.max, 0);
              const percentage = clients.length > 0 ? Math.round((stageClients.length / clients.length) * 100) : 0;
              
              return (
                <div key={stage.id} className="flex-shrink-0 w-80">
                  <div 
                    className={`rounded-2xl border-2 p-6 ${stage.color} min-h-[320px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer ${
                      draggedClient && draggedClient.status !== stage.status ? 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                    onDrop={() => handleDrop(stage.status)}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md">
                          {stage.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 dark:text-white">{stage.name}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {percentage}% del total
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {stageClients.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          clientes
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                      {stage.description}
                    </div>
                    
                    <div className="mb-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Valor Total</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(stageValue, 'CLP')}
                      </div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Clientes en esta etapa */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Clientes en esta etapa:
                        </div>
                        {draggedClient && draggedClient.status !== stage.status && (
                          <div className="text-xs text-blue-600 font-medium animate-pulse">
                            ✨ Suelta aquí para mover
                          </div>
                        )}
                        {stageClients.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 h-6 text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            Ver todos
                          </Button>
                        )}
                      </div>
                      {stageClients.slice(0, 3).map(client => (
                        <div 
                          key={client.id} 
                          draggable
                          onDragStart={() => handleDragStart(client)}
                          onDragEnd={handleDragEnd}
                          className={`bg-white dark:bg-gray-700 rounded-xl p-4 text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-move border border-gray-200 dark:border-gray-600 ${
                            draggedClient?.id === client.id ? 'opacity-50 scale-95' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {client.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold truncate text-gray-900 dark:text-white">{client.company}</div>
                              <div className="text-gray-500 truncate text-xs">{client.name}</div>
                            </div>
                          </div>
                          <div className="text-green-600 font-bold text-sm mb-3">
                            {formatCurrency(client.budget.max, 'CLP')}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-3 py-1 h-6 text-green-600 border-green-300 hover:bg-green-50 rounded-lg"
                            >
                              👁️ Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs px-3 py-1 h-6 text-blue-600 border-blue-300 hover:bg-blue-50 rounded-lg"
                            >
                              ✏️ Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                      {stageClients.length > 3 && (
                        <div className="text-xs text-gray-500 text-center p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                          +{stageClients.length - 3} clientes más
                        </div>
                      )}
                      {stageClients.length === 0 && (
                        <div className="text-xs text-gray-400 text-center p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          No hay clientes en esta etapa
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Flecha de conexión mejorada */}
                  {index < PIPELINE_STAGES.length - 1 && (
                    <div className="flex justify-center mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Siguiente etapa
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Panel de Acciones Rápidas del Pipeline */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            ⚡ Acciones Rápidas
          </h3>
          <p className="text-green-100">
            Haz clic en cualquier acción para comenzar
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-blue-200 hover:border-blue-400">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">➕ Agregar Cliente</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Nuevo prospecto al pipeline</div>
                <div className="text-xs text-blue-600 font-medium">Hacer clic para agregar</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-green-200 hover:border-green-400">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">📅 Programar Reunión</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Con cliente activo</div>
                <div className="text-xs text-green-600 font-medium">Hacer clic para programar</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-purple-200 hover:border-purple-400">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">📄 Generar Propuesta</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Para cliente calificado</div>
                <div className="text-xs text-purple-600 font-medium">Hacer clic para generar</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-orange-200 hover:border-orange-400">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">📊 Ver Analytics</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Métricas del pipeline</div>
                <div className="text-xs text-orange-600 font-medium">Hacer clic para ver</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista Detallada de Clientes Mejorada */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Clientes Detallados
          </h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredClients.length} de {clients.length} clientes
            </div>
          </div>
        </div>
        
        <div className="grid gap-6">
          {filteredClients.map((client) => {
            const stageInfo = getStageInfo(client.status);
            const daysSinceUpdate = getDaysSinceUpdate(client.updatedAt);
            const isUrgent = daysSinceUpdate > 7;
            const isHot = client.status === 'negotiating' || client.status === 'proposal_sent';
            
            return (
              <Card key={client.id} className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${
                isHot ? 'border-l-orange-500' : 
                isUrgent ? 'border-l-red-500' : 
                'border-l-blue-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            isHot ? 'bg-orange-500 animate-pulse' : 
                            isUrgent ? 'bg-red-500' : 
                            'bg-green-500'
                          }`}></div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {client.company}
                          </h3>
                        </div>
                        
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${stageInfo?.color} shadow-sm`}>
                          {stageInfo?.name}
                        </span>
                        
                        {isUrgent && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200 animate-pulse">
                            ⚠️ {daysSinceUpdate} días sin actualizar
                          </span>
                        )}
                        
                        {isHot && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                            🔥 Oportunidad Caliente
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{client.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{client.industry}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-4 border border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <div className="text-sm font-medium text-green-700 dark:text-green-300">Presupuesto</div>
                          </div>
                          <div className="font-bold text-green-800 dark:text-green-200">
                            {formatCurrency(client.budget.min, client.budget.currency)} - {formatCurrency(client.budget.max, client.budget.currency)}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Timeline</div>
                          </div>
                          <div className="font-bold text-blue-800 dark:text-blue-200">{client.timeline}</div>
                        </div>
                        
                        <div className={`rounded-xl p-4 border ${
                          isUrgent ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-red-200 dark:border-red-700' :
                          'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-gray-200 dark:border-gray-600'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className={`w-4 h-4 ${isUrgent ? 'text-red-600' : 'text-gray-600'}`} />
                            <div className={`text-sm font-medium ${isUrgent ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              Última Actualización
                            </div>
                          </div>
                          <div className={`font-bold ${isUrgent ? 'text-red-800 dark:text-red-200' : 'text-gray-800 dark:text-gray-200'}`}>
                            {daysSinceUpdate} días
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <span className="text-blue-600">📧</span>
                          <span className="text-gray-700 dark:text-gray-300">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <span className="text-green-600">📞</span>
                          <span className="text-gray-700 dark:text-gray-300">{client.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {isHot && (
                        <div className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                          Prioridad Alta
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron clientes
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || selectedStage !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primer cliente'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}
