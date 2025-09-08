import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chart } from '@/components/dashboard/Chart';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  RefreshCw
} from 'lucide-react';

/**
 * Reports and Analytics Page
 * 
 * Features:
 * - Comprehensive analytics dashboard
 * - Performance metrics
 * - Revenue tracking
 * - Agent performance reports
 * - Professional UI/UX
 * - Consistent with AIAIAI Consulting design system
 */
export default function ReportsPage() {
  // Mock data for demonstration
  const reportMetrics = [
    {
      title: 'Ingresos Totales',
      value: '$127,500',
      change: 18.5,
      changeType: 'percentage' as const,
      icon: DollarSign,
      trend: 'up' as const,
      description: 'Últimos 3 meses'
    },
    {
      title: 'Clientes Activos',
      value: '32',
      change: 8,
      changeType: 'number' as const,
      icon: Users,
      trend: 'up' as const,
      description: 'Con proyectos activos'
    },
    {
      title: 'Agentes Ejecutando',
      value: '5',
      change: 2,
      changeType: 'number' as const,
      icon: Bot,
      trend: 'up' as const,
      description: 'Tareas completadas'
    },
    {
      title: 'Tiempo Ahorrado',
      value: '247h',
      change: 45,
      changeType: 'number' as const,
      icon: Clock,
      trend: 'up' as const,
      description: 'Este mes'
    }
  ];

  const revenueData = [
    { label: 'Ene', value: 35000, change: 5000 },
    { label: 'Feb', value: 42000, change: 7000 },
    { label: 'Mar', value: 38000, change: -4000 },
    { label: 'Abr', value: 45000, change: 7000 },
    { label: 'May', value: 52000, change: 7000 },
    { label: 'Jun', value: 48000, change: -4000 }
  ];

  const agentPerformanceData = [
    { label: 'Meeting Summarizer', value: 94.2, color: '#3b82f6' },
    { label: 'Proposal Builder', value: 96.8, color: '#10b981' },
    { label: 'Lead Scorer', value: 91.5, color: '#f59e0b' },
    { label: 'CRM Updater', value: 98.1, color: '#ef4444' },
    { label: 'Follow-up Scheduler', value: 89.3, color: '#8b5cf6' }
  ];

  const clientSatisfactionData = [
    { label: 'Muy Satisfecho', value: 45, color: '#10b981' },
    { label: 'Satisfecho', value: 35, color: '#3b82f6' },
    { label: 'Neutral', value: 15, color: '#f59e0b' },
    { label: 'Insatisfecho', value: 5, color: '#ef4444' }
  ];

  const projectStatusData = [
    { label: 'Completados', value: 12, color: '#10b981' },
    { label: 'En Progreso', value: 8, color: '#3b82f6' },
    { label: 'Planificación', value: 3, color: '#f59e0b' },
    { label: 'En Pausa', value: 2, color: '#ef4444' }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      name: 'Reporte Mensual - Enero 2025',
      type: 'monthly',
      generated: '2025-01-31T23:59:00Z',
      status: 'completed',
      size: '2.4 MB',
      downloads: 15
    },
    {
      id: 'RPT-002',
      name: 'Análisis de Rendimiento de Agentes',
      type: 'performance',
      generated: '2025-01-28T14:30:00Z',
      status: 'completed',
      size: '1.8 MB',
      downloads: 8
    },
    {
      id: 'RPT-003',
      name: 'Reporte de Satisfacción de Clientes',
      type: 'satisfaction',
      generated: '2025-01-25T10:15:00Z',
      status: 'completed',
      size: '1.2 MB',
      downloads: 12
    },
    {
      id: 'RPT-004',
      name: 'Análisis Financiero Q4 2024',
      type: 'financial',
      generated: '2024-12-31T23:59:00Z',
      status: 'completed',
      size: '3.1 MB',
      downloads: 22
    }
  ];

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'monthly':
        return <Calendar className="h-4 w-4" />;
      case 'performance':
        return <TrendingUp className="h-4 w-4" />;
      case 'satisfaction':
        return <Users className="h-4 w-4" />;
      case 'financial':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'text-blue-600 bg-blue-50';
      case 'performance':
        return 'text-green-600 bg-green-50';
      case 'satisfaction':
        return 'text-purple-600 bg-purple-50';
      case 'financial':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Hoy';
    } else if (diffInDays === 1) {
      return 'Ayer';
    } else {
      return `Hace ${diffInDays} días`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reportes y Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Análisis completo del rendimiento de tu negocio y agentes
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtros
            </Button>
            <Button variant="outline" leftIcon={<RefreshCw className="h-4 w-4" />}>
              Actualizar
            </Button>
            <Button leftIcon={<FileText className="h-4 w-4" />}>
              Generar Reporte
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportMetrics.map((metric, index) => (
          <StandardMetricCard
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Chart
          title="Ingresos Mensuales"
          subtitle="Evolución de ingresos en los últimos 6 meses"
          data={revenueData}
          type="line"
          format="currency"
          showTrend={true}
        />

        {/* Agent Performance Chart */}
        <Chart
          title="Rendimiento de Agentes"
          subtitle="Precisión promedio por agente"
          data={agentPerformanceData}
          type="bar"
          format="percentage"
          showLegend={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Client Satisfaction Chart */}
        <Chart
          title="Satisfacción de Clientes"
          subtitle="Distribución de niveles de satisfacción"
          data={clientSatisfactionData}
          type="pie"
          format="number"
          showLegend={true}
        />

        {/* Project Status Chart */}
        <Chart
          title="Estado de Proyectos"
          subtitle="Distribución actual de proyectos"
          data={projectStatusData}
          type="pie"
          format="number"
          showLegend={true}
        />
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Reportes Recientes
              </h2>
              <p className="text-gray-600">
                Últimos reportes generados y disponibles para descarga
              </p>
            </div>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Descargar Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getReportTypeColor(report.type)}`}>
                    {getReportTypeIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {report.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Generado: {formatRelativeTime(report.generated)}</span>
                      <span>Tamaño: {report.size}</span>
                      <span>Descargas: {report.downloads}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      Completado
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                  >
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Reporte de Rendimiento
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Análisis detallado del rendimiento de agentes y proyectos
            </p>
            <Button variant="outline" size="sm">
              Generar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Reporte Financiero
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Análisis de ingresos, costos y rentabilidad
            </p>
            <Button variant="outline" size="sm">
              Generar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Reporte de Clientes
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Análisis de satisfacción y retención de clientes
            </p>
            <Button variant="outline" size="sm">
              Generar
            </Button>
          </CardContent>
        </Card>
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