import React from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Chart } from '@/components/dashboard/Chart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { ExportButton } from '@/components/ui/ExportButton';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  Plus,
  Bell,
  Bot,
  Zap,
  Target,
  Filter
} from 'lucide-react';

/**
 * Dashboard Page Component
 * 
 * Features:
 * - Professional metrics overview
 * - Interactive charts
 * - Recent activity feed
 * - Quick actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  // Check if user is new (first time visiting)
  React.useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('aiaiai-onboarding-seen');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('aiaiai-onboarding-seen', 'true');
    setShowOnboarding(false);
  };

  // Mock data for demonstration
  const metrics = [
    {
      title: 'Agentes Activos',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Agentes ejecutando tareas'
    },
    {
      title: 'Clientes Activos',
      value: '47',
      change: '+8',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Clientes con proyectos activos'
    },
    {
      title: 'Proyectos en Curso',
      value: '23',
      change: '+5',
      changeType: 'positive' as const,
      icon: Briefcase,
      description: 'Proyectos en ejecución'
    },
    {
      title: 'Ingresos del Mes',
      value: '$47,500',
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Ingresos recurrentes mensuales'
    }
  ];

  const quickActions = [
    {
      title: 'Nuevo Agente',
      description: 'Crear un nuevo agente de IA',
      icon: Plus,
      href: '/agents/new',
      variant: 'primary' as const
    },
    {
      title: 'Nuevo Cliente',
      description: 'Agregar un nuevo cliente',
      icon: Users,
      href: '/clients/new',
      variant: 'secondary' as const
    },
    {
      title: 'Ver Reportes',
      description: 'Generar reportes de rendimiento',
      icon: TrendingUp,
      href: '/reports',
      variant: 'secondary' as const
    }
  ];

  // Mock data for export
  const exportData = [
    { agent: 'Meeting Summarizer', status: 'Activo', tasks: 45, success: '98%' },
    { agent: 'Proposal Builder', status: 'Activo', tasks: 23, success: '95%' },
    { agent: 'Lead Scorer', status: 'Activo', tasks: 67, success: '92%' },
    { agent: 'CRM Updater', status: 'Inactivo', tasks: 12, success: '89%' },
    { agent: 'Follow-up Scheduler', status: 'Activo', tasks: 34, success: '96%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido a tu centro de control AIAIAI Consulting</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-64">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar agentes, clientes..."
              showFilters={true}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
          </div>
          <ExportButton
            data={exportData}
            filename="dashboard-data"
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <AnimatedCard
            key={index}
            delay={index * 100}
            direction="up"
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              description={metric.description}
            />
          </AnimatedCard>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <AnimatedCard delay={400} direction="left">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Rendimiento de Agentes
                </h2>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    7 días
                  </Button>
                  <Button variant="ghost" size="sm">
                    30 días
                  </Button>
                  <Button variant="ghost" size="sm">
                    90 días
                  </Button>
                </div>
              </div>
              <Chart />
            </Card>
          </AnimatedCard>
        </div>

        {/* Recent Activity */}
        <div>
          <AnimatedCard delay={500} direction="right">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Actividad Reciente
              </h2>
              <RecentActivity />
            </Card>
          </AnimatedCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <AnimatedCard
              key={index}
              delay={600 + (index * 100)}
              direction="up"
            >
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    action.variant === 'primary' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {action.description}
                    </p>
                    <Button 
                      variant={action.variant} 
                      size="sm"
                      className="w-full"
                    >
                      {action.title}
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* AIAIAI Consulting Branding */}
      <AnimatedCard delay={1000} direction="up">
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <span className="text-sm">Powered by</span>
            <span className="font-semibold text-primary-600">AIAIAI Consulting</span>
            <span className="text-sm">- Tú enseñas. Ellos ejecutan. Tú creces.</span>
          </div>
        </div>
      </AnimatedCard>

      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}