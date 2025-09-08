"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  FileText, 
  Plus, 
  Brain, 
  DollarSign, 
  Clock,
  Target,
  CheckCircle,
  Send,
  Download,
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { Proposal, BenchmarkData } from '@/types/consulting';

// Mock data para demostración
const mockProposals: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    meetingId: '1',
    title: 'Propuesta Sueño Andino - Agentes de IA',
    description: 'Implementación de agentes de IA para automatización de atención al cliente y mejora de la experiencia de reservas',
    solution: {
      features: [
        'Agente de WhatsApp con IA',
        'Agente de Email automatizado',
        'Sistema de reservas integrado',
        'Panel de administración',
        'Integración con ReservasPro'
      ],
      benefits: [
        'Reducción del 80% en tiempo de respuesta',
        'Aumento del 40% en conversión de ventas',
        'Disponibilidad 24/7 para clientes',
        'Escalabilidad para crecimiento futuro'
      ],
      timeline: '8 semanas',
      deliverables: [
        'Desarrollo completo del sistema',
        'Implementación y configuración',
        'Capacitación del equipo',
        'Documentación técnica',
        '3 meses de soporte gratuito'
      ]
    },
    pricing: {
      total: 18500000,
      currency: 'CLP',
      breakdown: {
        development: 12000000,
        implementation: 3000000,
        training: 2000000,
        support: 1500000
      },
      paymentOptions: {
        upfront: 18500000,
        milestones: [9250000, 9250000],
        monthly: 1541667
      }
    },
    benchmark: {
      freelancer: {
        min: 8000000,
        max: 15000000,
        average: 11500000
      },
      agency: {
        min: 15000000,
        max: 40000000,
        average: 27500000
      },
      competitors: [
        { name: 'TecnoSoluciones', price: 20000000, timeline: '6 meses' },
        { name: 'DigitalPro', price: 35000000, timeline: '4 meses' },
        { name: 'IAChile', price: 45000000, timeline: '3 meses' },
        { name: 'TechCorp', price: 60000000, timeline: '2 meses' }
      ]
    },
    status: 'sent',
    createdAt: new Date('2025-01-15'),
    sentAt: new Date('2025-01-16')
  }
];

const mockBenchmarkData: BenchmarkData = {
  industry: 'Turismo',
  freelancer: {
    junior: { min: 800000, max: 1200000, average: 1000000 },
    senior: { min: 1500000, max: 2500000, average: 2000000 },
    consultant: { min: 2000000, max: 3500000, average: 2750000 }
  },
  agency: {
    small: { min: 15000000, max: 25000000, average: 20000000 },
    medium: { min: 25000000, max: 40000000, average: 32500000 },
    large: { min: 40000000, max: 80000000, average: 60000000 }
  },
  competitors: [
    { name: 'TecnoSoluciones', price: 20000000, timeline: '6 meses', rating: 4.2 },
    { name: 'DigitalPro', price: 35000000, timeline: '4 meses', rating: 4.5 },
    { name: 'IAChile', price: 45000000, timeline: '3 meses', rating: 4.7 },
    { name: 'TechCorp', price: 60000000, timeline: '2 meses', rating: 4.8 }
  ]
};

export function ProposalGenerator() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData>(mockBenchmarkData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [proposalTemplate, setProposalTemplate] = useState<string>('standard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'sent': return 'Enviada';
      case 'reviewed': return 'Revisada';
      case 'accepted': return 'Aceptada';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const generateProposal = async () => {
    setIsGenerating(true);
    
    // Simular generación de propuesta con IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const templates = {
      standard: {
        title: 'Propuesta TechStart Chile - Automatización',
        description: 'Implementación de sistema de automatización para mejorar eficiencia operacional',
        features: [
          'Automatización de procesos',
          'Integración de sistemas',
          'Dashboard de analytics',
          'Reportes automáticos',
          'API personalizada'
        ],
        benefits: [
          'Reducción del 60% en tareas manuales',
          'Aumento del 35% en productividad',
          'Mejora en la toma de decisiones',
          'Escalabilidad empresarial'
        ],
        timeline: '12 semanas',
        total: 25000000
      },
      premium: {
        title: 'Propuesta Premium - Solución Integral',
        description: 'Solución completa de transformación digital con IA avanzada',
        features: [
          'IA Conversacional Avanzada',
          'Automatización Robótica de Procesos',
          'Analytics Predictivos',
          'Integración Multi-plataforma',
          'Soporte 24/7 con IA'
        ],
        benefits: [
          'Reducción del 80% en costos operacionales',
          'Aumento del 50% en eficiencia',
          'ROI del 300% en 12 meses',
          'Escalabilidad ilimitada'
        ],
        timeline: '16 semanas',
        total: 45000000
      },
      basic: {
        title: 'Propuesta Básica - Automatización Simple',
        description: 'Solución básica de automatización para pequeñas empresas',
        features: [
          'Automatización básica',
          'Dashboard simple',
          'Reportes básicos',
          'Soporte por email'
        ],
        benefits: [
          'Reducción del 40% en tareas manuales',
          'Mejora en organización',
          'Ahorro de tiempo',
          'Fácil implementación'
        ],
        timeline: '6 semanas',
        total: 12000000
      }
    };

    const template = templates[proposalTemplate as keyof typeof templates] || templates.standard;
    
    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      clientId: selectedClient || '2',
      meetingId: '2',
      title: template.title,
      description: template.description,
      solution: {
        features: template.features,
        benefits: template.benefits,
        timeline: template.timeline,
        deliverables: [
          'Análisis y diseño del sistema',
          'Desarrollo completo',
          'Implementación y pruebas',
          'Capacitación del equipo',
          'Documentación técnica',
          '3 meses de soporte gratuito'
        ]
      },
      pricing: {
        total: template.total,
        currency: 'CLP',
        breakdown: {
          development: Math.round(template.total * 0.7),
          implementation: Math.round(template.total * 0.15),
          training: Math.round(template.total * 0.1),
          support: Math.round(template.total * 0.05)
        },
        paymentOptions: {
          upfront: template.total,
          milestones: [
            Math.round(template.total * 0.5),
            Math.round(template.total * 0.5)
          ],
          monthly: Math.round(template.total / 12)
        }
      },
      benchmark: benchmarkData,
      status: 'draft',
      createdAt: new Date()
    };

    setProposals(prev => [newProposal, ...prev]);
    setIsGenerating(false);
  };

  return (
    <ContentLayout 
      title="Generador de Propuestas" 
      subtitle="Crea propuestas profesionales con IA"
      actions={
        <div className="flex gap-2">
          <Button 
            onClick={generateProposal}
            disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generar con IA
              </>
            )}
          </Button>
          <Button 
            onClick={() => setShowNewProposalForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Propuesta
          </Button>
        </div>
      }
    >
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Propuestas Generadas"
          value={proposals.length}
          icon={FileText}
          color="blue"
          change="+3 este mes"
          changeType="positive"
        />
        <StandardMetricCard
          title="Propuestas Enviadas"
          value={proposals.filter(p => p.status === 'sent').length}
          icon={Send}
          color="green"
          change="+2 esta semana"
          changeType="positive"
        />
        <StandardMetricCard
          title="Valor Total"
          value={formatCurrency(
            proposals.reduce((sum, p) => sum + p.pricing.total, 0),
            'CLP'
          )}
          icon={DollarSign}
          color="purple"
          change="+45% este mes"
          changeType="positive"
        />
        <StandardMetricCard
          title="Tasa de Aceptación"
          value="75%"
          icon={TrendingUp}
          color="yellow"
          change="+12% vs mes anterior"
          changeType="positive"
        />
      </div>

      {/* Panel de Configuración de Generación */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configuración de Generación con IA
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cliente
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Seleccionar cliente...</option>
                <option value="1">Sueño Andino</option>
                <option value="2">TechStart Chile</option>
                <option value="3">EcoFashion</option>
                <option value="4">AgroTech Solutions</option>
                <option value="5">HealthTech Pro</option>
                <option value="6">EduTech Innovations</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template de Propuesta
              </label>
              <select
                value={proposalTemplate}
                onChange={(e) => setProposalTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="basic">Básica - $12M CLP</option>
                <option value="standard">Estándar - $25M CLP</option>
                <option value="premium">Premium - $45M CLP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Análisis de Mercado
              </label>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Benchmark actualizado
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">
                IA Avanzada Activada
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              La IA analizará automáticamente el perfil del cliente, necesidades específicas y mercado para generar una propuesta personalizada y competitiva.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Análisis de Benchmark - Mercado Chileno
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Freelancers</h4>
              <div className="space-y-1 text-sm">
                <div>Junior: {formatCurrency(benchmarkData.freelancer.junior.average, 'CLP')}/mes</div>
                <div>Senior: {formatCurrency(benchmarkData.freelancer.senior.average, 'CLP')}/mes</div>
                <div>Consultor: {formatCurrency(benchmarkData.freelancer.consultant.average, 'CLP')}/mes</div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Agencias</h4>
              <div className="space-y-1 text-sm">
                <div>Pequeña: {formatCurrency(benchmarkData.agency.small.average, 'CLP')}</div>
                <div>Mediana: {formatCurrency(benchmarkData.agency.medium.average, 'CLP')}</div>
                <div>Grande: {formatCurrency(benchmarkData.agency.large.average, 'CLP')}</div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Competidores</h4>
              <div className="space-y-1 text-sm">
                {benchmarkData.competitors.slice(0, 3).map((comp, index) => (
                  <div key={index}>
                    {comp.name}: {formatCurrency(comp.price, 'CLP')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Propuestas */}
      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {proposal.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {proposal.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Valor Total</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(proposal.pricing.total, proposal.pricing.currency)}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Timeline</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {proposal.solution.timeline}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Entregables</span>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        {proposal.solution.deliverables.length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {proposal.solution.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                    {proposal.solution.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{proposal.solution.features.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedProposal(proposal);
                      setShowDetailedView(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  {proposal.status === 'draft' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setProposals(prev => prev.map(p => 
                          p.id === proposal.id ? { ...p, status: 'sent', sentAt: new Date() } : p
                        ));
                      }}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Enviar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {proposals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay propuestas generadas
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Comienza generando tu primera propuesta con IA
          </p>
        </div>
      )}

      {/* Vista Detallada de Propuesta */}
      {showDetailedView && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProposal.title}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowDetailedView(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Información General */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProposal.description}</p>
                </div>
                
                {/* Características y Beneficios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Características</h3>
                    <ul className="space-y-2">
                      {selectedProposal.solution.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300">
                          <CheckCircle className="w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Beneficios</h3>
                    <ul className="space-y-2">
                      {selectedProposal.solution.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
                          <TrendingUp className="w-4 h-4" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Precios y Opciones de Pago */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">Precios y Opciones de Pago</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pago Completo</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(selectedProposal.pricing.paymentOptions.upfront, selectedProposal.pricing.currency)}
                      </div>
                      <div className="text-sm text-gray-500">Ahorro del 5%</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Por Hitos</h4>
                      <div className="text-lg font-bold text-blue-600">
                        {selectedProposal.pricing.paymentOptions.milestones.map((milestone, index) => (
                          <div key={index}>
                            {formatCurrency(milestone, selectedProposal.pricing.currency)}
                            {index < selectedProposal.pricing.paymentOptions.milestones.length - 1 && <span className="text-sm text-gray-500"> + </span>}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">2 pagos</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mensual</h4>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(selectedProposal.pricing.paymentOptions.monthly, selectedProposal.pricing.currency)}
                      </div>
                      <div className="text-sm text-gray-500">12 meses</div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline y Entregables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">Timeline</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {selectedProposal.solution.timeline}
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      Tiempo estimado de implementación
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Entregables</h3>
                    <div className="text-2xl font-bold text-indigo-600 mb-2">
                      {selectedProposal.solution.deliverables.length}
                    </div>
                    <div className="text-sm text-indigo-700 dark:text-indigo-300">
                      Elementos incluidos
                    </div>
                  </div>
                </div>
                
                {/* Acciones */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Propuesta
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </Button>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContentLayout>
  );
}
