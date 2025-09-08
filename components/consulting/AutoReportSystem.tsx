"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Mail,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertTriangle,
  Zap,
  Star,
  Filter,
  Search
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'custom';
  category: 'pipeline' | 'revenue' | 'clients' | 'performance' | 'custom';
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    dayOfWeek?: number;
    dayOfMonth?: number;
    time: string;
    timezone: string;
  };
  recipients: {
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'consultant' | 'client';
  }[];
  metrics: {
    name: string;
    type: 'number' | 'currency' | 'percentage' | 'chart';
    source: string;
    aggregation: 'sum' | 'avg' | 'count' | 'max' | 'min';
  }[];
  filters: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
    value: any;
  }[];
  isActive: boolean;
  lastGenerated?: Date;
  nextGeneration?: Date;
  generationCount: number;
  createdAt: Date;
  createdBy: string;
}

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Reporte Semanal de Pipeline',
    description: 'Resumen semanal del estado del pipeline de clientes',
    type: 'weekly',
    category: 'pipeline',
    schedule: {
      frequency: 'weekly',
      dayOfWeek: 1, // Lunes
      time: '09:00',
      timezone: 'America/Santiago'
    },
    recipients: [
      { email: 'tomas@aiaiai.cl', name: 'Tomás', role: 'admin' },
      { email: 'manager@aiaiai.cl', name: 'Manager', role: 'manager' }
    ],
    metrics: [
      { name: 'Total Clientes', type: 'number', source: 'clients', aggregation: 'count' },
      { name: 'Valor Pipeline', type: 'currency', source: 'pipeline_value', aggregation: 'sum' },
      { name: 'Tasa Conversión', type: 'percentage', source: 'conversion_rate', aggregation: 'avg' },
      { name: 'Tendencias', type: 'chart', source: 'trends', aggregation: 'avg' }
    ],
    filters: [
      { field: 'status', operator: 'not_equals', value: 'closed_lost' },
      { field: 'created_at', operator: 'greater_than', value: '7_days_ago' }
    ],
    isActive: true,
    lastGenerated: new Date('2025-01-20T09:00:00'),
    nextGeneration: new Date('2025-01-27T09:00:00'),
    generationCount: 12,
    createdAt: new Date('2025-01-01'),
    createdBy: 'Tomás'
  },
  {
    id: '2',
    name: 'Reporte Mensual de Ingresos',
    description: 'Análisis mensual de ingresos y proyecciones',
    type: 'monthly',
    category: 'revenue',
    schedule: {
      frequency: 'monthly',
      dayOfMonth: 1,
      time: '08:00',
      timezone: 'America/Santiago'
    },
    recipients: [
      { email: 'tomas@aiaiai.cl', name: 'Tomás', role: 'admin' },
      { email: 'finance@aiaiai.cl', name: 'Finance', role: 'manager' }
    ],
    metrics: [
      { name: 'Ingresos Totales', type: 'currency', source: 'revenue', aggregation: 'sum' },
      { name: 'Proyección', type: 'currency', source: 'projection', aggregation: 'sum' },
      { name: 'Crecimiento', type: 'percentage', source: 'growth', aggregation: 'avg' },
      { name: 'Distribución', type: 'chart', source: 'distribution', aggregation: 'sum' }
    ],
    filters: [
      { field: 'status', operator: 'equals', value: 'closed_won' },
      { field: 'date', operator: 'between', value: ['month_start', 'month_end'] }
    ],
    isActive: true,
    lastGenerated: new Date('2025-01-01T08:00:00'),
    nextGeneration: new Date('2025-02-01T08:00:00'),
    generationCount: 3,
    createdAt: new Date('2024-12-01'),
    createdBy: 'Tomás'
  },
  {
    id: '3',
    name: 'Reporte de Performance del Equipo',
    description: 'Métricas de performance individual y del equipo',
    type: 'weekly',
    category: 'performance',
    schedule: {
      frequency: 'weekly',
      dayOfWeek: 5, // Viernes
      time: '17:00',
      timezone: 'America/Santiago'
    },
    recipients: [
      { email: 'tomas@aiaiai.cl', name: 'Tomás', role: 'admin' }
    ],
    metrics: [
      { name: 'Tareas Completadas', type: 'number', source: 'tasks_completed', aggregation: 'sum' },
      { name: 'Tiempo Promedio', type: 'number', source: 'avg_time', aggregation: 'avg' },
      { name: 'Satisfacción Cliente', type: 'percentage', source: 'satisfaction', aggregation: 'avg' },
      { name: 'Productividad', type: 'chart', source: 'productivity', aggregation: 'avg' }
    ],
    filters: [
      { field: 'team_member', operator: 'not_equals', value: 'inactive' },
      { field: 'week', operator: 'equals', value: 'current_week' }
    ],
    isActive: false,
    lastGenerated: new Date('2025-01-17T17:00:00'),
    nextGeneration: new Date('2025-01-24T17:00:00'),
    generationCount: 8,
    createdAt: new Date('2024-12-15'),
    createdBy: 'Tomás'
  }
];

export function AutoReportSystem() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewReport, setShowNewReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && report.isActive) ||
      (filter === 'inactive' && !report.isActive);
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: Report['category']) => {
    switch (category) {
      case 'pipeline': return <Target className="w-5 h-5 text-blue-600" />;
      case 'revenue': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'clients': return <Users className="w-5 h-5 text-purple-600" />;
      case 'performance': return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case 'custom': return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-green-100 text-green-800';
      case 'quarterly': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyText = (schedule: Report['schedule']) => {
    switch (schedule.frequency) {
      case 'daily': return 'Diario';
      case 'weekly': return `Semanal (${getDayName(schedule.dayOfWeek)})`;
      case 'monthly': return `Mensual (día ${schedule.dayOfMonth})`;
      case 'quarterly': return 'Trimestral';
    }
  };

  const getDayName = (dayOfWeek?: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayOfWeek || 0];
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('es-CL');
  };

  const toggleReport = (id: string) => {
    setReports(prev => prev.map(report => 
      report.id === id 
        ? { ...report, isActive: !report.isActive }
        : report
    ));
  };

  const generateReport = (id: string) => {
    setReports(prev => prev.map(report => 
      report.id === id 
        ? { 
            ...report, 
            lastGenerated: new Date(),
            generationCount: report.generationCount + 1
          }
        : report
    ));
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  const getReportStats = () => {
    const total = reports.length;
    const active = reports.filter(r => r.isActive).length;
    const totalGenerations = reports.reduce((sum, r) => sum + r.generationCount, 0);
    const avgGenerations = total > 0 ? Math.round(totalGenerations / total) : 0;
    
    return { total, active, totalGenerations, avgGenerations };
  };

  const stats = getReportStats();

  return (
    <div className="space-y-6">
      {/* Métricas de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Reportes
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
                  {stats.active}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Activos
                </div>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalGenerations}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Generaciones
                </div>
              </div>
              <RefreshCw className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.avgGenerations}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Promedio/Reporte
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todos' :
                 filterType === 'active' ? 'Activos' : 'Inactivos'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="pipeline">Pipeline</option>
              <option value="revenue">Ingresos</option>
              <option value="clients">Clientes</option>
              <option value="performance">Performance</option>
              <option value="custom">Personalizado</option>
            </select>
            
            <Button
              onClick={() => setShowNewReport(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Reporte
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar reportes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Lista de Reportes */}
      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getCategoryIcon(report.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {report.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                      {report.isActive ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Play className="w-4 h-4" />
                          <span className="text-xs">Activo</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Pause className="w-4 h-4" />
                          <span className="text-xs">Inactivo</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {report.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Programación</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {getFrequencyText(report.schedule)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {report.schedule.time} {report.schedule.timezone}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Última Generación</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.lastGenerated ? formatTimeAgo(report.lastGenerated) : 'Nunca'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {report.generationCount} generaciones
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Destinatarios</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.recipients.length} personas
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {report.metrics.length} métricas
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{report.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Creado por {report.createdBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{formatTimeAgo(report.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedReport(report);
                      setShowPreview(true);
                    }}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateReport(report.id)}
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReport(report.id)}
                    className={report.isActive ? 'text-orange-600 border-orange-300 hover:bg-orange-50' : 'text-green-600 border-green-300 hover:bg-green-50'}
                  >
                    {report.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteReport(report.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay reportes
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filter !== 'all' || categoryFilter !== 'all'
              ? 'No hay reportes que coincidan con los filtros seleccionados'
              : 'Comienza creando tu primer reporte automático'
            }
          </p>
        </div>
      )}

      {/* Modal de Vista Previa */}
      {showPreview && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedReport.name}
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
                  <p className="text-gray-600 dark:text-gray-400">{selectedReport.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Configuración</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Frecuencia:</span>
                        <span className="font-medium">{getFrequencyText(selectedReport.schedule)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Hora:</span>
                        <span className="font-medium">{selectedReport.schedule.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Zona Horaria:</span>
                        <span className="font-medium">{selectedReport.schedule.timezone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Estado:</span>
                        <span className={`font-medium ${selectedReport.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedReport.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Estadísticas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Generaciones:</span>
                        <span className="font-medium">{selectedReport.generationCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Última:</span>
                        <span className="font-medium">
                          {selectedReport.lastGenerated ? formatTimeAgo(selectedReport.lastGenerated) : 'Nunca'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Próxima:</span>
                        <span className="font-medium">
                          {selectedReport.nextGeneration ? formatTimeAgo(selectedReport.nextGeneration) : 'No programada'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Destinatarios:</span>
                        <span className="font-medium">{selectedReport.recipients.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Métricas Incluidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.metrics.map((metric, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {metric.name}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            {metric.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Fuente: {metric.source} | Agregación: {metric.aggregation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Destinatarios</h3>
                  <div className="space-y-2">
                    {selectedReport.recipients.map((recipient, index) => (
                      <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{recipient.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{recipient.email}</div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                          {recipient.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generar Ahora
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
