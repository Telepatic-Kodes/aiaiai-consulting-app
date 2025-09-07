import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Building,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

/**
 * Clients Management Page
 * 
 * Features:
 * - Client overview and metrics
 * - Client list with search and filters
 * - Quick actions
 * - Professional UI/UX
 * - Consistent with AIAIAI Consulting design system
 */
export default function ClientsPage() {
  // Mock data for demonstration
  const clientMetrics = [
    {
      title: 'Clientes Totales',
      value: '47',
      change: 8,
      changeType: 'number' as const,
      icon: Users,
      trend: 'up' as const,
      description: 'Clientes registrados'
    },
    {
      title: 'Clientes Activos',
      value: '32',
      change: 5,
      changeType: 'number' as const,
      icon: CheckCircle,
      trend: 'up' as const,
      description: 'Con proyectos activos'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$47,500',
      change: 12.5,
      changeType: 'percentage' as const,
      icon: DollarSign,
      trend: 'up' as const,
      description: 'De clientes activos'
    },
    {
      title: 'Satisfacción Promedio',
      value: '4.7',
      change: 0.3,
      changeType: 'number' as const,
      icon: TrendingUp,
      trend: 'up' as const,
      description: 'De 5.0 estrellas'
    }
  ];

  const clients = [
    {
      id: 'CLIENT-001',
      name: 'Carlos Rodríguez',
      company: 'Innovate Solutions',
      email: 'carlos@innovate.cl',
      phone: '+56 9 1234 5678',
      location: 'Santiago, Chile',
      industry: 'Tecnología',
      companySize: 'Mediana',
      status: 'active',
      projects: 3,
      totalRevenue: 75000,
      lastContact: '2025-01-15T10:30:00Z',
      satisfaction: 4.8,
      tags: ['VIP', 'Automatización']
    },
    {
      id: 'CLIENT-002',
      name: 'María González',
      company: 'TechCorp Chile',
      email: 'maria@techcorp.cl',
      phone: '+56 9 2345 6789',
      location: 'Valparaíso, Chile',
      industry: 'Software',
      companySize: 'Grande',
      status: 'active',
      projects: 2,
      totalRevenue: 45000,
      lastContact: '2025-01-14T15:20:00Z',
      satisfaction: 4.6,
      tags: ['CRM', 'Integración']
    },
    {
      id: 'CLIENT-003',
      name: 'Roberto Silva',
      company: 'StartupLatam',
      email: 'roberto@startuplatam.com',
      phone: '+56 9 3456 7890',
      location: 'Concepción, Chile',
      industry: 'Fintech',
      companySize: 'Pequeña',
      status: 'prospect',
      projects: 0,
      totalRevenue: 0,
      lastContact: '2025-01-13T09:15:00Z',
      satisfaction: null,
      tags: ['Lead', 'Nuevo']
    },
    {
      id: 'CLIENT-004',
      name: 'Ana Martínez',
      company: 'EcoSolutions',
      email: 'ana@ecosolutions.cl',
      phone: '+56 9 4567 8901',
      location: 'Antofagasta, Chile',
      industry: 'Sostenibilidad',
      companySize: 'Mediana',
      status: 'inactive',
      projects: 1,
      totalRevenue: 15000,
      lastContact: '2024-12-20T14:45:00Z',
      satisfaction: 4.2,
      tags: ['Inactivo']
    },
    {
      id: 'CLIENT-005',
      name: 'Diego Herrera',
      company: 'RetailMax',
      email: 'diego@retailmax.cl',
      phone: '+56 9 5678 9012',
      location: 'Temuco, Chile',
      industry: 'Retail',
      companySize: 'Grande',
      status: 'active',
      projects: 4,
      totalRevenue: 120000,
      lastContact: '2025-01-15T11:30:00Z',
      satisfaction: 4.9,
      tags: ['VIP', 'Retail', 'Analytics']
    },
    {
      id: 'CLIENT-006',
      name: 'Laura Fernández',
      company: 'HealthTech',
      email: 'laura@healthtech.cl',
      phone: '+56 9 6789 0123',
      location: 'Viña del Mar, Chile',
      industry: 'Salud',
      companySize: 'Mediana',
      status: 'active',
      projects: 2,
      totalRevenue: 35000,
      lastContact: '2025-01-14T16:20:00Z',
      satisfaction: 4.7,
      tags: ['Salud', 'Compliance']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'prospect':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'prospect':
        return <Clock className="h-4 w-4" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
              Gestión de Clientes
            </h1>
            <p className="text-gray-600 mt-2">
              Administra y monitorea tus clientes y sus proyectos
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtros
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Nuevo Cliente
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {clientMetrics.map((metric, index) => (
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
                  placeholder="Buscar clientes por nombre, empresa o email..."
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {client.company}
                    </p>
                  </div>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                  {getStatusIcon(client.status)}
                  <span className="ml-1 capitalize">{client.status}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{client.location}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Industria:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {client.industry}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tamaño:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {client.companySize}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Proyectos:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {client.projects}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ingresos totales:</span>
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(client.totalRevenue)}
                  </span>
                </div>
                {client.satisfaction && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Satisfacción:</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {client.satisfaction}/5.0
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Último contacto:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatRelativeTime(client.lastContact)}
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {client.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
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
                >
                  Contactar
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