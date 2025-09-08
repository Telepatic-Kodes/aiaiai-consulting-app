"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  FileText, 
  Save, 
  ArrowLeft,
  Calendar,
  Filter,
  Download,
  Eye,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

/**
 * New Report Page Component
 * 
 * Features:
 * - Professional report creation form
 * - Report type selection
 * - Data source configuration
 * - Export options
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewReportPage() {
  const [formData, setFormData] = React.useState({
    reportName: '',
    reportType: '',
    dateRange: '30',
    dataSource: 'all',
    format: 'pdf',
    includeCharts: true,
    includeDetails: true,
    emailRecipients: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const reportTypes = [
    {
      id: 'performance',
      name: 'Reporte de Rendimiento',
      description: 'Análisis del rendimiento de agentes y tareas',
      icon: TrendingUp,
      color: 'text-primary-600'
    },
    {
      id: 'client-analysis',
      name: 'Análisis de Clientes',
      description: 'Estudio del comportamiento y satisfacción de clientes',
      icon: Users,
      color: 'text-accent-600'
    },
    {
      id: 'project-metrics',
      name: 'Métricas de Proyectos',
      description: 'Dashboard de métricas y KPIs de proyectos',
      icon: Target,
      color: 'text-success-600'
    },
    {
      id: 'roi-analysis',
      name: 'Análisis de ROI',
      description: 'Retorno de inversión de agentes implementados',
      icon: BarChart3,
      color: 'text-warning-600'
    }
  ];

  const dateRanges = [
    { value: '7', label: 'Últimos 7 días' },
    { value: '30', label: 'Últimos 30 días' },
    { value: '90', label: 'Últimos 90 días' },
    { value: '365', label: 'Último año' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const dataSources = [
    { value: 'all', label: 'Todos los datos' },
    { value: 'agents', label: 'Solo agentes' },
    { value: 'clients', label: 'Solo clientes' },
    { value: 'projects', label: 'Solo proyectos' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Nuevo Reporte
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Genera un reporte personalizado
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Configuration */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-primary-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Configuración del Reporte
                </h2>
                <p className="text-sm text-gray-600">
                  Define el tipo y parámetros del reporte
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Reporte *
                </label>
                <Input
                  name="reportName"
                  type="text"
                  value={formData.reportName}
                  onChange={handleInputChange}
                  placeholder="Ej: Reporte de Rendimiento Q1 2025"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Reporte *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {reportTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.reportType === type.id
                          ? 'border-primary-300 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, reportType: type.id }))}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gray-100 ${type.color}`}>
                          <type.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {type.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {type.description}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="reportType"
                          value={type.id}
                          checked={formData.reportType === type.id}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de Fechas
                </label>
                <select
                  name="dateRange"
                  value={formData.dateRange}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuente de Datos
                </label>
                <select
                  name="dataSource"
                  value={formData.dataSource}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {dataSources.map((source) => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Download className="h-6 w-6 text-primary-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Opciones de Exportación
                </h2>
                <p className="text-sm text-gray-600">
                  Configura el formato y opciones de exportación
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Exportación
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {formats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Opciones del Reporte
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeCharts"
                      checked={formData.includeCharts}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Incluir gráficos y visualizaciones</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeDetails"
                      checked={formData.includeDetails}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Incluir detalles y métricas específicas</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enviar por Email a
                </label>
                <Input
                  name="emailRecipients"
                  type="email"
                  value={formData.emailRecipients}
                  onChange={handleInputChange}
                  placeholder="email@empresa.com, otro@empresa.com"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separa múltiples emails con comas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Programar Generación
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    placeholder="Fecha"
                    className="w-full"
                  />
                  <Input
                    type="time"
                    placeholder="Hora"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="p-6 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="h-6 w-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Vista Previa
              </h2>
              <p className="text-sm text-gray-600">
                Revisa la configuración antes de generar
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Configuración</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium">{formData.reportName || 'Sin nombre'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">
                      {reportTypes.find(t => t.id === formData.reportType)?.name || 'No seleccionado'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Período:</span>
                    <span className="font-medium">
                      {dateRanges.find(r => r.value === formData.dateRange)?.label || 'No seleccionado'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Formato:</span>
                    <span className="font-medium">{formData.format.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Opciones</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gráficos:</span>
                    <span className="font-medium">{formData.includeCharts ? 'Sí' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Detalles:</span>
                    <span className="font-medium">{formData.includeDetails ? 'Sí' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.emailRecipients ? 'Configurado' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 mt-8">
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            <Save className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </form>
    </div>
  );
}


