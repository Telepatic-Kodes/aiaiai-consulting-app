"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { Client } from '@/types/consulting';

// Mock data para demostración
const mockClients: Client[] = [
  {
    id: '1',
    name: 'María González',
    company: 'Sueño Andino',
    industry: 'Turismo Sostenible',
    email: 'maria@sueñoandino.cl',
    phone: '+56 9 1234 5678',
    size: 'pyme',
    budget: { min: 2000000, max: 5000000, currency: 'CLP' },
    timeline: 'Antes de octubre 2025',
    status: 'proposal_sent',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    company: 'TechStart Chile',
    industry: 'Tecnología',
    email: 'carlos@techstart.cl',
    phone: '+56 9 8765 4321',
    size: 'startup',
    budget: { min: 5000000, max: 10000000, currency: 'CLP' },
    timeline: 'Q2 2025',
    status: 'negotiating',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-12')
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    company: 'EcoFashion',
    industry: 'Moda Sostenible',
    email: 'ana@ecofashion.cl',
    phone: '+56 9 5555 1234',
    size: 'pyme',
    budget: { min: 3000000, max: 6000000, currency: 'CLP' },
    timeline: 'Marzo 2025',
    status: 'meeting_scheduled',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14')
  },
  {
    id: '4',
    name: 'Roberto Silva',
    company: 'AgroTech Solutions',
    industry: 'Agrotecnología',
    email: 'roberto@agrotech.cl',
    phone: '+56 9 7777 8888',
    size: 'empresa',
    budget: { min: 10000000, max: 20000000, currency: 'CLP' },
    timeline: 'Q1 2025',
    status: 'meeting_completed',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: '5',
    name: 'Laura Martínez',
    company: 'HealthTech Pro',
    industry: 'Salud Digital',
    email: 'laura@healthtech.cl',
    phone: '+56 9 9999 1111',
    size: 'startup',
    budget: { min: 8000000, max: 15000000, currency: 'CLP' },
    timeline: 'Q2 2025',
    status: 'closed_won',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '6',
    name: 'Diego Herrera',
    company: 'EduTech Innovations',
    industry: 'Educación',
    email: 'diego@edutech.cl',
    phone: '+56 9 3333 4444',
    size: 'pyme',
    budget: { min: 4000000, max: 8000000, currency: 'CLP' },
    timeline: 'Abril 2025',
    status: 'prospect',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16')
  }
];

interface AnalyticsData {
  totalClients: number;
  activePipeline: number;
  closedWon: number;
  closedLost: number;
  totalValue: number;
  averageDealSize: number;
  conversionRate: number;
  averageSalesCycle: number;
  industryBreakdown: { [key: string]: number };
  sizeBreakdown: { [key: string]: number };
  monthlyTrend: { month: string; value: number; clients: number }[];
  topPerformers: { company: string; value: number; status: string }[];
}

export function ConsultingAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [clients] = useState<Client[]>(mockClients);

  const analyticsData = useMemo((): AnalyticsData => {
    const totalClients = clients.length;
    const activePipeline = clients.filter(c => !['closed_won', 'closed_lost'].includes(c.status)).length;
    const closedWon = clients.filter(c => c.status === 'closed_won').length;
    const closedLost = clients.filter(c => c.status === 'closed_lost').length;
    const totalValue = clients.reduce((sum, client) => sum + client.budget.max, 0);
    const averageDealSize = totalClients > 0 ? totalValue / totalClients : 0;
    const conversionRate = totalClients > 0 ? Math.round((closedWon / totalClients) * 100) : 0;
    const averageSalesCycle = 45; // Mock data

    // Industry breakdown
    const industryBreakdown = clients.reduce((acc, client) => {
      acc[client.industry] = (acc[client.industry] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Size breakdown
    const sizeBreakdown = clients.reduce((acc, client) => {
      acc[client.size] = (acc[client.size] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Monthly trend (mock data)
    const monthlyTrend = [
      { month: 'Oct 2024', value: 15000000, clients: 3 },
      { month: 'Nov 2024', value: 22000000, clients: 4 },
      { month: 'Dec 2024', value: 18000000, clients: 3 },
      { month: 'Jan 2025', value: 35000000, clients: 6 },
    ];

    // Top performers
    const topPerformers = clients
      .sort((a, b) => b.budget.max - a.budget.max)
      .slice(0, 5)
      .map(client => ({
        company: client.company,
        value: client.budget.max,
        status: client.status
      }));

    return {
      totalClients,
      activePipeline,
      closedWon,
      closedLost,
      totalValue,
      averageDealSize,
      conversionRate,
      averageSalesCycle,
      industryBreakdown,
      sizeBreakdown,
      monthlyTrend,
      topPerformers
    };
  }, [clients]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed_won': return 'text-green-600 bg-green-100';
      case 'negotiating': return 'text-orange-600 bg-orange-100';
      case 'proposal_sent': return 'text-yellow-600 bg-yellow-100';
      case 'meeting_completed': return 'text-blue-600 bg-blue-100';
      case 'meeting_scheduled': return 'text-purple-600 bg-purple-100';
      case 'prospect': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <ContentLayout 
      title="Analytics de Consultoría" 
      subtitle="Métricas avanzadas y análisis del rendimiento del pipeline"
    >
      {/* Filtros de Tiempo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900 dark:text-white">Período de Análisis</span>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-blue-600 text-white' : ''}
              >
                {range === '7d' ? '7 días' : 
                 range === '30d' ? '30 días' : 
                 range === '90d' ? '90 días' : '1 año'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Pipeline Total"
          value={formatCurrency(analyticsData.totalValue, 'CLP')}
          icon={DollarSign}
          color="green"
          change={`${analyticsData.activePipeline} clientes activos`}
          changeType="positive"
        />
        <StandardMetricCard
          title="Tasa de Conversión"
          value={`${analyticsData.conversionRate}%`}
          icon={Target}
          color="blue"
          change="+12% vs mes anterior"
          changeType="positive"
        />
        <StandardMetricCard
          title="Deal Promedio"
          value={formatCurrency(analyticsData.averageDealSize, 'CLP')}
          icon={TrendingUp}
          color="purple"
          change="+8% vs mes anterior"
          changeType="positive"
        />
        <StandardMetricCard
          title="Ciclo de Ventas"
          value={`${analyticsData.averageSalesCycle} días`}
          icon={Clock}
          color="yellow"
          change="-5 días vs promedio"
          changeType="positive"
        />
      </div>

      {/* Gráficos y Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tendencia Mensual */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tendencia Mensual
              </h3>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.monthlyTrend.map((month, index) => {
                const isLatest = index === analyticsData.monthlyTrend.length - 1;
                const prevValue = index > 0 ? analyticsData.monthlyTrend[index - 1].value : 0;
                const change = prevValue > 0 ? ((month.value - prevValue) / prevValue) * 100 : 0;
                
                return (
                  <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isLatest ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{month.month}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{month.clients} clientes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(month.value, 'CLP')}
                      </div>
                      {change !== 0 && (
                        <div className={`text-sm flex items-center gap-1 ${
                          change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(change).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Performers
              </h3>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topPerformers.map((performer, index) => (
                <div key={performer.company} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{performer.company}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(performer.status)}`}>
                        {performer.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(performer.value, 'CLP')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análisis por Industria y Tamaño */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distribución por Industria */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Por Industria
              </h3>
              <PieChart className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analyticsData.industryBreakdown).map(([industry, count]) => {
                const percentage = Math.round((count / analyticsData.totalClients) * 100);
                return (
                  <div key={industry} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
                      <span className="text-gray-700 dark:text-gray-300">{industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Tamaño */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Por Tamaño de Empresa
              </h3>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analyticsData.sizeBreakdown).map(([size, count]) => {
                const percentage = Math.round((count / analyticsData.totalClients) * 100);
                const sizeLabels = {
                  'startup': 'Startup',
                  'pyme': 'PYME',
                  'empresa': 'Empresa'
                };
                return (
                  <div key={size} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded"></div>
                      <span className="text-gray-700 dark:text-gray-300">{sizeLabels[size as keyof typeof sizeLabels]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de Rendimiento */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resumen de Rendimiento
            </h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Última actualización: hace 2 horas</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {analyticsData.closedWon}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Clientes Ganados</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {analyticsData.activePipeline}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Pipeline Activo</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {analyticsData.conversionRate}%
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Tasa de Conversión</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
