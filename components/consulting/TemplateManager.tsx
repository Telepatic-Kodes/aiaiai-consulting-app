"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload,
  Search,
  Filter,
  Star,
  Eye,
  Settings,
  Save,
  X,
  Check,
  AlertCircle,
  Zap,
  Target,
  Users,
  DollarSign,
  Clock,
  Brain,
  Mail
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'proposal' | 'email' | 'meeting' | 'followup' | 'contract' | 'presentation';
  type: 'basic' | 'standard' | 'premium' | 'custom';
  industry: 'all' | 'tourism' | 'tech' | 'healthcare' | 'education' | 'agriculture' | 'retail';
  content: {
    sections: {
      title: string;
      content: string;
      required: boolean;
      variables: string[];
    }[];
    variables: {
      name: string;
      type: 'text' | 'number' | 'currency' | 'date' | 'select';
      required: boolean;
      options?: string[];
      placeholder: string;
    }[];
  };
  pricing: {
    basePrice: number;
    currency: 'CLP' | 'USD';
    factors: {
      name: string;
      multiplier: number;
      description: string;
    }[];
  };
  usage: {
    timesUsed: number;
    successRate: number;
    avgValue: number;
  };
  isDefault: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Mock templates data
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Propuesta Básica - Automatización',
    description: 'Plantilla básica para propuestas de automatización de procesos',
    category: 'proposal',
    type: 'basic',
    industry: 'all',
    content: {
      sections: [
        {
          title: 'Resumen Ejecutivo',
          content: 'Este proyecto tiene como objetivo automatizar los procesos de {{company_name}} para mejorar la eficiencia operacional.',
          required: true,
          variables: ['company_name']
        },
        {
          title: 'Problema Identificado',
          content: 'Actualmente {{company_name}} enfrenta los siguientes desafíos: {{challenges}}',
          required: true,
          variables: ['company_name', 'challenges']
        },
        {
          title: 'Solución Propuesta',
          content: 'Nuestra solución incluye: {{solution_features}}',
          required: true,
          variables: ['solution_features']
        },
        {
          title: 'Inversión',
          content: 'La inversión total es de {{total_investment}} con un ROI esperado del {{roi_percentage}}%',
          required: true,
          variables: ['total_investment', 'roi_percentage']
        }
      ],
      variables: [
        { name: 'company_name', type: 'text', required: true, placeholder: 'Nombre de la empresa' },
        { name: 'challenges', type: 'text', required: true, placeholder: 'Desafíos identificados' },
        { name: 'solution_features', type: 'text', required: true, placeholder: 'Características de la solución' },
        { name: 'total_investment', type: 'currency', required: true, placeholder: 'Inversión total' },
        { name: 'roi_percentage', type: 'number', required: true, placeholder: 'Porcentaje de ROI' }
      ]
    },
    pricing: {
      basePrice: 12000000,
      currency: 'CLP',
      factors: [
        { name: 'Complejidad del proyecto', multiplier: 1.5, description: 'Multiplicador por complejidad' },
        { name: 'Tamaño de la empresa', multiplier: 1.2, description: 'Multiplicador por tamaño' }
      ]
    },
    usage: {
      timesUsed: 15,
      successRate: 73,
      avgValue: 14500000
    },
    isDefault: true,
    isPublic: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15'),
    createdBy: 'AIAIAI Team'
  },
  {
    id: '2',
    name: 'Propuesta Premium - IA Avanzada',
    description: 'Plantilla premium para proyectos de IA avanzada y transformación digital',
    category: 'proposal',
    type: 'premium',
    industry: 'tech',
    content: {
      sections: [
        {
          title: 'Visión Estratégica',
          content: 'Transformación digital completa para {{company_name}} utilizando IA de última generación.',
          required: true,
          variables: ['company_name']
        },
        {
          title: 'Análisis de Oportunidad',
          content: 'Identificamos oportunidades de valor por {{opportunity_value}} en {{timeframe}}',
          required: true,
          variables: ['opportunity_value', 'timeframe']
        },
        {
          title: 'Arquitectura de Solución',
          content: 'Implementaremos: {{ai_components}} con integración a {{existing_systems}}',
          required: true,
          variables: ['ai_components', 'existing_systems']
        }
      ],
      variables: [
        { name: 'company_name', type: 'text', required: true, placeholder: 'Nombre de la empresa' },
        { name: 'opportunity_value', type: 'currency', required: true, placeholder: 'Valor de la oportunidad' },
        { name: 'timeframe', type: 'text', required: true, placeholder: 'Marco temporal' },
        { name: 'ai_components', type: 'text', required: true, placeholder: 'Componentes de IA' },
        { name: 'existing_systems', type: 'text', required: true, placeholder: 'Sistemas existentes' }
      ]
    },
    pricing: {
      basePrice: 45000000,
      currency: 'CLP',
      factors: [
        { name: 'Complejidad técnica', multiplier: 2.0, description: 'Multiplicador por complejidad técnica' },
        { name: 'Integración', multiplier: 1.8, description: 'Multiplicador por integración' }
      ]
    },
    usage: {
      timesUsed: 8,
      successRate: 87,
      avgValue: 52000000
    },
    isDefault: false,
    isPublic: true,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-18'),
    createdBy: 'AIAIAI Team'
  },
  {
    id: '3',
    name: 'Email de Seguimiento - Post Reunión',
    description: 'Plantilla para emails de seguimiento después de reuniones',
    category: 'email',
    type: 'standard',
    industry: 'all',
    content: {
      sections: [
        {
          title: 'Asunto',
          content: 'Seguimiento - Reunión {{meeting_date}} con {{company_name}}',
          required: true,
          variables: ['meeting_date', 'company_name']
        },
        {
          title: 'Cuerpo del Email',
          content: 'Estimado {{contact_name}},\n\nGracias por la reunión del {{meeting_date}}. Como acordamos, adjunto {{documents}}.\n\nPróximos pasos: {{next_steps}}\n\nSaludos cordiales,\n{{sender_name}}',
          required: true,
          variables: ['contact_name', 'meeting_date', 'documents', 'next_steps', 'sender_name']
        }
      ],
      variables: [
        { name: 'contact_name', type: 'text', required: true, placeholder: 'Nombre del contacto' },
        { name: 'meeting_date', type: 'date', required: true, placeholder: 'Fecha de la reunión' },
        { name: 'documents', type: 'text', required: false, placeholder: 'Documentos adjuntos' },
        { name: 'next_steps', type: 'text', required: true, placeholder: 'Próximos pasos' },
        { name: 'sender_name', type: 'text', required: true, placeholder: 'Nombre del remitente' }
      ]
    },
    pricing: {
      basePrice: 0,
      currency: 'CLP',
      factors: []
    },
    usage: {
      timesUsed: 45,
      successRate: 91,
      avgValue: 0
    },
    isDefault: true,
    isPublic: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-10'),
    createdBy: 'AIAIAI Team'
  }
];

export function TemplateManager() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filter, setFilter] = useState<'all' | 'proposal' | 'email' | 'meeting' | 'followup' | 'contract' | 'presentation'>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesFilter = filter === 'all' || template.category === filter;
    const matchesIndustry = industryFilter === 'all' || template.industry === industryFilter;
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesIndustry && matchesSearch;
  });

  const getCategoryIcon = (category: Template['category']) => {
    switch (category) {
      case 'proposal': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'email': return <Mail className="w-5 h-5 text-green-600" />;
      case 'meeting': return <Users className="w-5 h-5 text-purple-600" />;
      case 'followup': return <Target className="w-5 h-5 text-orange-600" />;
      case 'contract': return <FileText className="w-5 h-5 text-red-600" />;
      case 'presentation': return <Eye className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getTypeColor = (type: Template['type']) => {
    switch (type) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const duplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copia)`,
      isDefault: false,
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Usuario Actual',
      usage: {
        timesUsed: 0,
        successRate: 0,
        avgValue: 0
      }
    };
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const getTemplateStats = () => {
    const total = templates.length;
    const publicTemplates = templates.filter(t => t.isPublic).length;
    const customTemplates = templates.filter(t => !t.isDefault).length;
    const totalUsage = templates.reduce((sum, t) => sum + t.usage.timesUsed, 0);
    
    return { total, publicTemplates, customTemplates, totalUsage };
  };

  const stats = getTemplateStats();

  return (
    <div className="space-y-6">
      {/* Métricas de Plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Plantillas
                </div>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.publicTemplates}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Públicas
                </div>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.customTemplates}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Personalizadas
                </div>
              </div>
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.totalUsage}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Usos Totales
                </div>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'proposal', 'email', 'meeting', 'followup', 'contract', 'presentation'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todas' :
                 filterType === 'proposal' ? 'Propuestas' :
                 filterType === 'email' ? 'Emails' :
                 filterType === 'meeting' ? 'Reuniones' :
                 filterType === 'followup' ? 'Seguimiento' :
                 filterType === 'contract' ? 'Contratos' : 'Presentaciones'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las industrias</option>
              <option value="tourism">Turismo</option>
              <option value="tech">Tecnología</option>
              <option value="healthcare">Salud</option>
              <option value="education">Educación</option>
              <option value="agriculture">Agricultura</option>
              <option value="retail">Retail</option>
            </select>
            
            <Button
              onClick={() => setShowNewTemplate(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Plantilla
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Lista de Plantillas */}
      <div className="grid gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getCategoryIcon(template.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      {template.isDefault && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {template.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Precio Base</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {template.pricing.basePrice > 0 ? formatCurrency(template.pricing.basePrice, template.pricing.currency) : 'Gratis'}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Usos</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {template.usage.timesUsed}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tasa de Éxito</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {template.usage.successRate}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{template.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{template.industry}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{template.content.sections.length} secciones</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{template.content.variables.length} variables</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowPreview(true);
                    }}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  {!template.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTemplate(template.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay plantillas
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filter !== 'all' || industryFilter !== 'all'
              ? 'No hay plantillas que coincidan con los filtros seleccionados'
              : 'Comienza creando tu primera plantilla personalizada'
            }
          </p>
        </div>
      )}

      {/* Modal de Vista Previa */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedTemplate.name}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Secciones de la Plantilla</h3>
                  <div className="space-y-4">
                    {selectedTemplate.content.sections.map((section, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          {section.title}
                          {section.required && <span className="text-red-500 ml-1">*</span>}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {section.content}
                        </p>
                        {section.variables.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {section.variables.map((variable, varIndex) => (
                              <span key={varIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                                {`{{${variable}}}`}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Variables Disponibles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTemplate.content.variables.map((variable, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {variable.name}
                          </span>
                          {variable.required && <span className="text-red-500">*</span>}
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {variable.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {variable.placeholder}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Copy className="w-4 h-4 mr-2" />
                    Usar Plantilla
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
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
    </div>
  );
}
