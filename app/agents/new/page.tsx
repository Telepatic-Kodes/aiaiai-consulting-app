import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Bot, 
  ArrowLeft, 
  Save, 
  Play,
  Settings,
  FileText,
  Users,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';

/**
 * New Agent Creation Page
 * 
 * Features:
 * - Agent configuration form
 * - Template selection
 * - Pricing setup
 * - Integration options
 * - Professional UI/UX
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewAgentPage() {
  const agentTemplates = [
    {
      id: 'meeting.summarizer',
      name: 'Meeting Summarizer',
      description: 'Resumen automático de reuniones con extracción de tareas accionables',
      category: 'Operaciones & Cliente',
      icon: FileText,
      features: ['Análisis de transcripciones', 'Extracción de tareas', 'Análisis de sentimientos'],
      pricing: '$39/mes',
      estimatedSetup: '2 horas'
    },
    {
      id: 'proposal.builder',
      name: 'Proposal Builder',
      description: 'Generación automática de propuestas comerciales profesionales',
      category: 'Comercial & Marketing',
      icon: FileText,
      features: ['Generación de propuestas', 'Cálculo de precios', 'Templates personalizables'],
      pricing: '$79/mes',
      estimatedSetup: '3 horas'
    },
    {
      id: 'lead.scorer',
      name: 'Lead Scorer',
      description: 'Calificación automática de leads con análisis de comportamiento',
      category: 'Comercial & Marketing',
      icon: Users,
      features: ['Calificación de leads', 'Análisis de comportamiento', 'Integración CRM'],
      pricing: '$49/mes',
      estimatedSetup: '2 horas'
    },
    {
      id: 'crm.updater',
      name: 'CRM Updater',
      description: 'Sincronización automática de datos entre sistemas',
      category: 'Operaciones & Cliente',
      icon: Settings,
      features: ['Sincronización de datos', 'Mapeo de campos', 'Detección de duplicados'],
      pricing: '$59/mes',
      estimatedSetup: '4 horas'
    },
    {
      id: 'followup.scheduler',
      name: 'Follow-up Scheduler',
      description: 'Automatización de seguimientos y agendamiento',
      category: 'Comercial & Marketing',
      icon: Clock,
      features: ['Automatización de seguimientos', 'Integración calendario', 'Gestión de recordatorios'],
      pricing: '$49/mes',
      estimatedSetup: '2 horas'
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [agentConfig, setAgentConfig] = React.useState({
    name: '',
    description: '',
    category: '',
    pricing: '',
    integrations: [] as string[],
    customizations: {} as Record<string, any>
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = agentTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setAgentConfig({
        name: template.name,
        description: template.description,
        category: template.category,
        pricing: template.pricing,
        integrations: [],
        customizations: {}
      });
    }
  };

  const handleSave = () => {
    // TODO: Implement agent creation logic
    console.log('Creating agent:', { selectedTemplate, agentConfig });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Volver
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Crear Nuevo Agente
          </h1>
          <p className="text-gray-600 mt-2">
            Configura un nuevo agente de IA especializado para tu negocio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Seleccionar Plantilla
              </h2>
              <p className="text-gray-600">
                Elige una plantilla predefinida o crea un agente personalizado
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentTemplates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate === template.id;
                  
                  return (
                    <div
                      key={template.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            isSelected ? 'text-primary-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {template.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {template.category}
                            </span>
                            <span className="text-xs font-medium text-gray-900">
                              {template.pricing}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-primary-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Setup estimado:</span>
                            <span className="font-medium text-primary-600">
                              {template.estimatedSetup}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Agent Configuration */}
          {selectedTemplate && (
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Configuración del Agente
                </h2>
                <p className="text-gray-600">
                  Personaliza la configuración de tu agente
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Agente
                    </label>
                    <Input
                      value={agentConfig.name}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ingresa el nombre del agente"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={3}
                      value={agentConfig.description}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe las capacidades del agente"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={agentConfig.category}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Comercial & Marketing">Comercial & Marketing</option>
                      <option value="Operaciones & Cliente">Operaciones & Cliente</option>
                      <option value="Finanzas & Administración">Finanzas & Administración</option>
                      <option value="Conocimiento & Contexto">Conocimiento & Contexto</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio Mensual
                    </label>
                    <Input
                      value={agentConfig.pricing}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, pricing: e.target.value }))}
                      placeholder="$49/mes"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Resumen
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plantilla:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedTemplate ? agentTemplates.find(t => t.id === selectedTemplate)?.name : 'No seleccionada'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Categoría:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {agentConfig.category || 'No definida'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Precio:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {agentConfig.pricing || 'No definido'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Setup estimado:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedTemplate ? agentTemplates.find(t => t.id === selectedTemplate)?.estimatedSetup : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Acciones
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  leftIcon={<Save className="h-4 w-4" />}
                  onClick={handleSave}
                  disabled={!selectedTemplate}
                >
                  Crear Agente
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  leftIcon={<Play className="h-4 w-4" />}
                  disabled={!selectedTemplate}
                >
                  Vista Previa
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  leftIcon={<Settings className="h-4 w-4" />}
                  disabled={!selectedTemplate}
                >
                  Configuración Avanzada
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  Características
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agentTemplates.find(t => t.id === selectedTemplate)?.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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