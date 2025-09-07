import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Edit
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  fields: string[];
  preview: React.ReactNode;
}

/**
 * Report Templates Component
 * 
 * Features:
 * - Pre-built report templates
 * - Category organization
 * - Preview functionality
 * - Customizable fields
 * - Professional design
 */
export function ReportTemplates() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<ReportTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const templates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Reporte de Rendimiento de Agentes',
      description: 'Análisis completo del rendimiento de todos los agentes de IA',
      category: 'agents',
      icon: BarChart3,
      color: 'bg-blue-500',
      fields: ['Agente', 'Tareas Completadas', 'Tiempo Promedio', 'Precisión', 'Satisfacción del Cliente'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-blue-200 rounded w-3/4"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2"></div>
          <div className="h-4 bg-blue-200 rounded w-2/3"></div>
        </div>
      )
    },
    {
      id: '2',
      name: 'Análisis de Satisfacción de Clientes',
      description: 'Métricas de satisfacción y feedback de clientes',
      category: 'clients',
      icon: Users,
      color: 'bg-green-500',
      fields: ['Cliente', 'Proyecto', 'Puntuación', 'Comentarios', 'Fecha'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-green-200 rounded w-4/5"></div>
          <div className="h-4 bg-green-200 rounded w-3/5"></div>
          <div className="h-4 bg-green-200 rounded w-2/3"></div>
        </div>
      )
    },
    {
      id: '3',
      name: 'Reporte Financiero Mensual',
      description: 'Resumen de ingresos, gastos y rentabilidad',
      category: 'financial',
      icon: DollarSign,
      color: 'bg-yellow-500',
      fields: ['Período', 'Ingresos', 'Gastos', 'Rentabilidad', 'Proyección'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-yellow-200 rounded w-5/6"></div>
          <div className="h-4 bg-yellow-200 rounded w-1/2"></div>
          <div className="h-4 bg-yellow-200 rounded w-3/4"></div>
        </div>
      )
    },
    {
      id: '4',
      name: 'Estado de Proyectos',
      description: 'Resumen del progreso y estado de todos los proyectos',
      category: 'projects',
      icon: Briefcase,
      color: 'bg-purple-500',
      fields: ['Proyecto', 'Cliente', 'Progreso', 'Fecha de Entrega', 'Estado'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-purple-200 rounded w-2/3"></div>
          <div className="h-4 bg-purple-200 rounded w-4/5"></div>
          <div className="h-4 bg-purple-200 rounded w-1/2"></div>
        </div>
      )
    },
    {
      id: '5',
      name: 'Análisis de Tendencias',
      description: 'Tendencias de uso y crecimiento de la plataforma',
      category: 'analytics',
      icon: TrendingUp,
      color: 'bg-red-500',
      fields: ['Métrica', 'Período', 'Valor', 'Cambio', 'Tendencia'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-red-200 rounded w-3/4"></div>
          <div className="h-4 bg-red-200 rounded w-1/2"></div>
          <div className="h-4 bg-red-200 rounded w-5/6"></div>
        </div>
      )
    },
    {
      id: '6',
      name: 'Reporte de Actividad',
      description: 'Registro detallado de todas las actividades del sistema',
      category: 'activity',
      icon: Calendar,
      color: 'bg-indigo-500',
      fields: ['Fecha', 'Usuario', 'Acción', 'Recurso', 'Resultado'],
      preview: (
        <div className="space-y-3">
          <div className="h-4 bg-indigo-200 rounded w-4/5"></div>
          <div className="h-4 bg-indigo-200 rounded w-2/3"></div>
          <div className="h-4 bg-indigo-200 rounded w-3/5"></div>
        </div>
      )
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: templates.length },
    { id: 'agents', name: 'Agentes', count: templates.filter(t => t.category === 'agents').length },
    { id: 'clients', name: 'Clientes', count: templates.filter(t => t.category === 'clients').length },
    { id: 'financial', name: 'Financiero', count: templates.filter(t => t.category === 'financial').length },
    { id: 'projects', name: 'Proyectos', count: templates.filter(t => t.category === 'projects').length },
    { id: 'analytics', name: 'Analytics', count: templates.filter(t => t.category === 'analytics').length },
    { id: 'activity', name: 'Actividad', count: templates.filter(t => t.category === 'activity').length }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleUseTemplate = (template: ReportTemplate) => {
    // TODO: Implement template usage
    console.log('Using template:', template);
  };

  const handlePreviewTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plantillas de Reportes</h2>
          <p className="text-gray-600">Selecciona una plantilla para generar tu reporte</p>
        </div>
        <Button variant="outline" leftIcon={<FileText className="h-4 w-4" />}>
          Crear Plantilla Personalizada
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.name}</span>
            <span className="px-2 py-1 text-xs bg-white rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${template.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Vista Previa</h4>
                  {template.preview}
                </div>

                {/* Fields */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Campos Incluidos</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.map((field, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Eye className="h-4 w-4" />}
                    onClick={() => handlePreviewTemplate(template)}
                    className="flex-1"
                  >
                    Vista Previa
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<Edit className="h-4 w-4" />}
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1"
                  >
                    Usar Plantilla
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${selectedTemplate.color}`}>
                    <selectedTemplate.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedTemplate.name}
                    </h3>
                    <p className="text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Campos del Reporte</h4>
                  <div className="space-y-2">
                    {selectedTemplate.fields.map((field, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedTemplate.preview}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTemplate(null)}
                >
                  Cerrar
                </Button>
                <Button
                  leftIcon={<Download className="h-4 w-4" />}
                  onClick={() => handleUseTemplate(selectedTemplate)}
                >
                  Generar Reporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
