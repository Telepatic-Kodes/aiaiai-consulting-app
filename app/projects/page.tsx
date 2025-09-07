import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  FileText,
  TrendingUp
} from 'lucide-react';

/**
 * Projects Management Page
 * 
 * Features:
 * - Project overview and metrics
 * - Project list with status tracking
 * - Timeline and progress visualization
 * - Professional UI/UX
 * - Consistent with AIAIAI Consulting design system
 */
export default function ProjectsPage() {
  // Mock data for demonstration
  const projectMetrics = [
    {
      title: 'Proyectos Activos',
      value: '23',
      change: 5,
      changeType: 'number' as const,
      icon: Briefcase,
      trend: 'up' as const,
      description: 'En ejecución'
    },
    {
      title: 'Completados Este Mes',
      value: '8',
      change: 2,
      changeType: 'number' as const,
      icon: CheckCircle,
      trend: 'up' as const,
      description: 'Proyectos finalizados'
    },
    {
      title: 'Ingresos del Mes',
      value: '$47,500',
      change: 12.5,
      changeType: 'percentage' as const,
      icon: DollarSign,
      trend: 'up' as const,
      description: 'De proyectos activos'
    },
    {
      title: 'Tiempo Promedio',
      value: '6.2',
      change: -0.8,
      changeType: 'number' as const,
      icon: Clock,
      trend: 'up' as const,
      description: 'Semanas por proyecto'
    }
  ];

  const projects = [
    {
      id: 'PROJ-001',
      name: 'Implementación Lead Scorer',
      client: 'Innovate Solutions',
      clientId: 'CLIENT-001',
      status: 'in_progress',
      progress: 75,
      startDate: '2025-01-01',
      endDate: '2025-02-15',
      budget: 25000,
      spent: 18750,
      team: ['María González', 'Carlos Silva'],
      description: 'Implementación de sistema de calificación automática de leads',
      category: 'Automatización',
      priority: 'high',
      lastUpdate: '2025-01-15T10:30:00Z',
      deliverables: ['Sistema configurado', 'Integración CRM', 'Capacitación'],
      completedDeliverables: 2
    },
    {
      id: 'PROJ-002',
      name: 'Automatización CRM',
      client: 'TechCorp Chile',
      clientId: 'CLIENT-002',
      status: 'planning',
      progress: 25,
      startDate: '2025-01-20',
      endDate: '2025-03-20',
      budget: 45000,
      spent: 11250,
      team: ['Roberto Martínez', 'Ana Herrera'],
      description: 'Automatización completa del proceso de CRM',
      category: 'Integración',
      priority: 'medium',
      lastUpdate: '2025-01-14T15:20:00Z',
      deliverables: ['Análisis de procesos', 'Configuración', 'Testing', 'Go-live'],
      completedDeliverables: 1
    },
    {
      id: 'PROJ-003',
      name: 'Dashboard Analytics',
      client: 'RetailMax',
      clientId: 'CLIENT-005',
      status: 'completed',
      progress: 100,
      startDate: '2024-11-01',
      endDate: '2024-12-15',
      budget: 30000,
      spent: 30000,
      team: ['Diego Fernández', 'Laura Silva'],
      description: 'Dashboard de analytics para retail con métricas en tiempo real',
      category: 'Analytics',
      priority: 'high',
      lastUpdate: '2024-12-15T16:45:00Z',
      deliverables: ['Dashboard diseñado', 'Métricas implementadas', 'Capacitación'],
      completedDeliverables: 3
    },
    {
      id: 'PROJ-004',
      name: 'Sistema de Propuestas',
      client: 'StartupLatam',
      clientId: 'CLIENT-003',
      status: 'on_hold',
      progress: 40,
      startDate: '2025-01-10',
      endDate: '2025-02-28',
      budget: 15000,
      spent: 6000,
      team: ['María González'],
      description: 'Sistema automatizado de generación de propuestas',
      category: 'Automatización',
      priority: 'low',
      lastUpdate: '2025-01-12T09:15:00Z',
      deliverables: ['Análisis de requerimientos', 'Prototipo', 'Implementación'],
      completedDeliverables: 1
    },
    {
      id: 'PROJ-005',
      name: 'Integración WhatsApp',
      client: 'EcoSolutions',
      clientId: 'CLIENT-004',
      status: 'in_progress',
      progress: 60,
      startDate: '2024-12-01',
      endDate: '2025-01-31',
      budget: 20000,
      spent: 12000,
      team: ['Carlos Silva', 'Ana Herrera'],
      description: 'Integración de WhatsApp Business API con CRM',
      category: 'Integración',
      priority: 'medium',
      lastUpdate: '2025-01-15T11:30:00Z',
      deliverables: ['API configurada', 'Integración CRM', 'Testing', 'Documentación'],
      completedDeliverables: 2
    },
    {
      id: 'PROJ-006',
      name: 'Sistema de Compliance',
      client: 'HealthTech',
      clientId: 'CLIENT-006',
      status: 'in_progress',
      progress: 85,
      startDate: '2024-11-15',
      endDate: '2025-01-30',
      budget: 35000,
      spent: 29750,
      team: ['Roberto Martínez', 'Laura Silva'],
      description: 'Sistema de cumplimiento normativo para sector salud',
      category: 'Compliance',
      priority: 'high',
      lastUpdate: '2025-01-14T16:20:00Z',
      deliverables: ['Análisis normativo', 'Sistema implementado', 'Auditoría', 'Certificación'],
      completedDeliverables: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'planning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'on_hold':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'planning':
        return <Clock className="h-4 w-4" />;
      case 'on_hold':
        return <Pause className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Hace ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays}d`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Proyectos
            </h1>
            <p className="text-gray-600 mt-2">
              Administra y monitorea todos tus proyectos de automatización
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtros
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Nuevo Proyecto
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {projectMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            trend={metric.trend}
            description={metric.description}
          />
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar proyectos por nombre, cliente o categoría..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.client}
                    </p>
                  </div>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1 capitalize">{project.status.replace('_', ' ')}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso</span>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Categoría:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {project.category}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prioridad:</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Presupuesto:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(project.budget)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gastado:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(project.spent)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fecha inicio:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(project.startDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fecha fin:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(project.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Entregables:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {project.completedDeliverables}/{project.deliverables.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Última actualización:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatRelativeTime(project.lastUpdate)}
                  </span>
                </div>
              </div>
              
              {/* Team */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Equipo</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.team.map((member, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex-1"
                >
                  Ver Detalles
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={<Settings className="h-4 w-4" />}
                >
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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