"use client";

import React, { useState, useMemo } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Database, 
  Calendar,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Shield,
  BarChart3
} from 'lucide-react';

interface AgentSpec {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  pricing: {
    base: number;
    currency: string;
    tiers: Array<{
      name: string;
      price: number;
      features: string[];
      popular?: boolean;
    }>;
  };
  features: string[];
  integrations: string[];
  sla: string;
  latamFeatures: string[];
  status: 'available' | 'beta' | 'coming_soon';
}

const agentCatalog: AgentSpec[] = [
  {
    id: 'lead-scorer',
    name: 'lead.scorer',
    title: 'Lead Scorer',
    description: 'Califica y prioriza leads automáticamente basado en comportamiento y datos demográficos para optimizar tu proceso de ventas.',
    category: 'Comercial & Marketing',
    icon: TrendingUp,
    pricing: {
      base: 49,
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 49,
          features: ['1,000 leads/mes', 'Calificación automática', 'Integración CRM básica', 'Reportes básicos']
        },
        {
          name: 'Professional',
          price: 99,
          features: ['5,000 leads/mes', 'Análisis avanzado', 'Integraciones múltiples', 'Reportes personalizados'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 199,
          features: ['20,000 leads/mes', 'IA personalizada', 'API completa', 'Soporte dedicado']
        }
      ]
    },
    features: [
      'Calificación automática de leads',
      'Análisis de comportamiento web',
      'Integración con múltiples CRMs',
      'Reportes de conversión',
      'Alertas de leads calientes'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Pipedrive', 'Google Analytics', 'WhatsApp Business'],
    sla: '30 segundos',
    latamFeatures: ['Soporte en español', 'Integración WhatsApp', 'Zona horaria local', 'Clasificación regional'],
    status: 'available'
  },
  {
    id: 'proposal-builder',
    name: 'proposal.builder',
    title: 'Proposal Builder',
    description: 'Genera propuestas comerciales personalizadas y cotizaciones basadas en requerimientos del cliente en minutos.',
    category: 'Comercial & Marketing',
    icon: FileText,
    pricing: {
      base: 79,
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 79,
          features: ['50 propuestas/mes', 'Templates básicos', 'Generación automática', 'Exportación PDF']
        },
        {
          name: 'Professional',
          price: 149,
          features: ['200 propuestas/mes', 'Templates personalizados', 'Integración CRM', 'Análisis de conversión'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 299,
          features: ['1,000 propuestas/mes', 'IA personalizada', 'Branding corporativo', 'Soporte dedicado']
        }
      ]
    },
    features: [
      'Generación automática de propuestas',
      'Templates personalizables',
      'Cálculo automático de precios',
      'Integración con CRM',
      'Análisis de efectividad'
    ],
    integrations: ['Google Docs', 'Microsoft Word', 'Canva', 'Google Drive', 'Gmail'],
    sla: '2 minutos',
    latamFeatures: ['Templates en español', 'Requerimientos legales locales', 'Modelos de precios regionales', 'Métodos de pago locales'],
    status: 'available'
  },
  {
    id: 'meeting-summarizer',
    name: 'meeting.summarizer',
    title: 'Meeting Summarizer',
    description: 'Resume reuniones automáticamente y extrae tareas accionables para maximizar la productividad de tu equipo.',
    category: 'Operaciones & Cliente',
    icon: Users,
    pricing: {
      base: 39,
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 39,
          features: ['300 min/mes', 'Resúmenes básicos', 'Extracción de tareas', 'Integración calendario']
        },
        {
          name: 'Professional',
          price: 79,
          features: ['1,000 min/mes', 'Análisis de sentimientos', 'Múltiples idiomas', 'Integraciones avanzadas'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 149,
          features: ['5,000 min/mes', 'IA personalizada', 'Análisis predictivo', 'Soporte dedicado']
        }
      ]
    },
    features: [
      'Resúmenes automáticos de reuniones',
      'Extracción de tareas accionables',
      'Análisis de sentimientos',
      'Integración con calendarios',
      'Múltiples formatos de exportación'
    ],
    integrations: ['Zoom', 'Teams', 'Google Meet', 'Otter.ai', 'Asana', 'Trello'],
    sla: '1 minuto',
    latamFeatures: ['Análisis en español', 'Terminología empresarial local', 'Contexto cultural', 'Formatos de reunión regionales'],
    status: 'available'
  },
  {
    id: 'crm-updater',
    name: 'crm.updater',
    title: 'CRM Updater',
    description: 'Sincroniza y actualiza automáticamente datos en sistemas CRM, eliminando duplicados y manteniendo la integridad.',
    category: 'Operaciones & Cliente',
    icon: Database,
    pricing: {
      base: 59,
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 59,
          features: ['10,000 registros/mes', 'Sincronización básica', 'Detección de duplicados', 'Validación de datos']
        },
        {
          name: 'Professional',
          price: 119,
          features: ['50,000 registros/mes', 'Sincronización avanzada', 'Enriquecimiento de datos', 'Reportes de calidad'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 239,
          features: ['200,000 registros/mes', 'IA personalizada', 'API completa', 'Soporte dedicado']
        }
      ]
    },
    features: [
      'Sincronización automática de datos',
      'Detección y eliminación de duplicados',
      'Validación de calidad de datos',
      'Enriquecimiento de información',
      'Reportes de integridad'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Pipedrive', 'Google Contacts', 'LinkedIn Sales Navigator'],
    sla: '90 segundos',
    latamFeatures: ['Procesamiento en español', 'Formatos de teléfono locales', 'Validación de direcciones regionales', 'Clasificación empresarial local'],
    status: 'available'
  },
  {
    id: 'followup-scheduler',
    name: 'followup.scheduler',
    title: 'Follow-up Scheduler',
    description: 'Automatiza seguimientos y agendamiento de reuniones basado en comportamiento del cliente y patrones de respuesta.',
    category: 'Comercial & Marketing',
    icon: Calendar,
    pricing: {
      base: 49,
      currency: 'USD',
      tiers: [
        {
          name: 'Starter',
          price: 49,
          features: ['500 seguimientos/mes', 'Programación básica', 'Recordatorios por email', 'Integración calendario']
        },
        {
          name: 'Professional',
          price: 99,
          features: ['2,000 seguimientos/mes', 'Programación inteligente', 'Multi-canal', 'Análisis de efectividad'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 199,
          features: ['10,000 seguimientos/mes', 'IA personalizada', 'Automatización completa', 'Soporte dedicado']
        }
      ]
    },
    features: [
      'Programación automática de seguimientos',
      'Recordatorios multi-canal',
      'Análisis de patrones de respuesta',
      'Integración con calendarios',
      'Optimización de horarios'
    ],
    integrations: ['Google Calendar', 'Outlook', 'Cal.com', 'WhatsApp Business', 'Slack'],
    sla: '45 segundos',
    latamFeatures: ['Comunicación en español', 'Manejo de zona horaria local', 'Integración WhatsApp Business', 'Patrones culturales de comunicación'],
    status: 'available'
  }
];

export default function AgentCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(agentCatalog.map(agent => agent.category))];
    return cats;
  }, []);

  const filteredAgents = useMemo(() => {
    if (selectedCategory === 'all') return agentCatalog;
    return agentCatalog.filter(agent => agent.category === selectedCategory);
  }, [selectedCategory]);

  const getStatusBadge = (status: AgentSpec['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disponible
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Beta
          </span>
        );
      case 'coming_soon':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            Próximamente
          </span>
        );
    }
  };

  return (
    <StandardLayout
      title="Catálogo de Agentes"
      subtitle="Explora y descubre agentes de IA disponibles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Catálogo de Agentes AIAIAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubre nuestra suite completa de agentes de IA especializados para emprendedores LATAM. 
            Cada agente está diseñado para automatizar procesos específicos y acelerar tu crecimiento.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              )}
            >
              {category === 'all' ? 'Todos los Agentes' : category}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <agent.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{agent.category}</p>
                  </div>
                </div>
                {getStatusBadge(agent.status)}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {agent.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  SLA: {agent.sla}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Zap className="w-4 h-4 mr-2" />
                  Desde ${agent.pricing.base}/mes
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Globe className="w-4 h-4 mr-2" />
                  Optimizado para LATAM
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={agent.status !== 'available'}
                >
                  {agent.status === 'available' ? 'Activar' : 'Próximamente'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Agent Details Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const agent = agentCatalog.find(a => a.id === selectedAgent);
                if (!agent) return null;

                return (
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                          <agent.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {agent.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">{agent.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAgent(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Descripción
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {agent.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Características Principales
                          </h3>
                          <ul className="space-y-2">
                            {agent.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Características LATAM
                          </h3>
                          <ul className="space-y-2">
                            {agent.latamFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Globe className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Planes y Precios
                          </h3>
                          <div className="space-y-4">
                            {agent.pricing.tiers.map((tier, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "p-4 rounded-lg border-2 transition-all duration-200",
                                  tier.popular
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                                )}
                              >
                                {tier.popular && (
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                      Más Popular
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {tier.name}
                                  </h4>
                                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    ${tier.price}
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mes</span>
                                  </span>
                                </div>
                                <ul className="space-y-1">
                                  {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Integraciones
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {agent.integrations.map((integration, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                              >
                                {integration}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <Button
                        variant="primary"
                        size="lg"
                        className="flex-1"
                        disabled={agent.status !== 'available'}
                      >
                        {agent.status === 'available' ? 'Activar Agente' : 'Próximamente'}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setSelectedAgent(null)}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para revolucionar tu negocio?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Comienza con nuestros agentes más populares y escala según crezcas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Comenzar Prueba Gratuita
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Hablar con un Experto
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}