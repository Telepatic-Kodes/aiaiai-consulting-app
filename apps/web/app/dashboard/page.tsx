import React from 'react'
import { Metadata } from 'next'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { Chart } from '@/components/dashboard/Chart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { 
  DollarSign, 
  Users, 
  FolderOpen, 
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard - AIAIAI Consulting',
  description: 'Dashboard principal con métricas y analytics de agentes de IA'
}

/**
 * Dashboard Page
 * 
 * Features:
 * - Professional layout with sidebar and header
 * - Key performance metrics
 * - Interactive charts and visualizations
 * - Recent activity feed
 * - Responsive design
 * - Clean, minimal styling
 */
export default function Dashboard() {
  // Sample data for demonstration
  const revenueData = [
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 135000 },
    { month: 'Mar', revenue: 142000 },
    { month: 'Apr', revenue: 158000 },
    { month: 'May', revenue: 165000 },
    { month: 'Jun', revenue: 172000 },
  ]
  
  const projectStatusData = [
    { name: 'Active', value: 12, color: '#10b981' },
    { name: 'Planning', value: 5, color: '#f59e0b' },
    { name: 'Completed', value: 8, color: '#6b7280' },
    { name: 'On Hold', value: 2, color: '#ef4444' },
  ]
  
  const clientSatisfactionData = [
    { month: 'Jan', satisfaction: 4.2 },
    { month: 'Feb', satisfaction: 4.4 },
    { month: 'Mar', satisfaction: 4.1 },
    { month: 'Apr', satisfaction: 4.6 },
    { month: 'May', satisfaction: 4.5 },
    { month: 'Jun', satisfaction: 4.7 },
  ]
  
  return (
    <div className="flex h-screen bg-primary-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                Dashboard
              </h1>
              <p className="text-primary-600">
                Monitorea el rendimiento de tus agentes de IA y métricas de negocio
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={172000}
                change={4200}
                changeType="currency"
                trend="up"
                icon={<DollarSign />}
              />
              
              <MetricCard
                title="Active Clients"
                value={24}
                change={3}
                changeType="number"
                trend="up"
                icon={<Users />}
              />
              
              <MetricCard
                title="Active Projects"
                value={12}
                change={-1}
                changeType="number"
                trend="down"
                icon={<FolderOpen />}
              />
              
              <MetricCard
                title="Team Utilization"
                value={87}
                change={5}
                changeType="percentage"
                trend="up"
                icon={<TrendingUp />}
              />
            </div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart
                title="Revenue Trend"
                data={revenueData}
                type="line"
                dataKey="revenue"
                xAxisKey="month"
                color="#1f2937"
              />
              
              <Chart
                title="Project Status Distribution"
                data={projectStatusData}
                type="pie"
                dataKey="value"
              />
            </div>
            
            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Chart
                title="Client Satisfaction"
                data={clientSatisfactionData}
                type="line"
                dataKey="satisfaction"
                xAxisKey="month"
                color="#059669"
                height={250}
              />
              
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
            </div>
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Project Completion Rate"
                value={94}
                change={2}
                changeType="percentage"
                trend="up"
                icon={<CheckCircle />}
              />
              
              <MetricCard
                title="Average Project Duration"
                value={45}
                change={-3}
                changeType="number"
                trend="up"
                icon={<Clock />}
              />
              
              <MetricCard
                title="Risk Projects"
                value={2}
                change={0}
                changeType="number"
                trend="neutral"
                icon={<AlertTriangle />}
              />
            </div>

            {/* Agent Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">
                Rendimiento de Agentes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">85%</div>
                  <div className="text-sm text-primary-600">Lead Scorer</div>
                  <div className="text-xs text-primary-500">Precisión</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">95%</div>
                  <div className="text-sm text-primary-600">Proposal Builder</div>
                  <div className="text-xs text-primary-500">Precisión</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">88%</div>
                  <div className="text-sm text-primary-600">Meeting Summarizer</div>
                  <div className="text-xs text-primary-500">Precisión</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">92%</div>
                  <div className="text-sm text-primary-600">CRM Updater</div>
                  <div className="text-xs text-primary-500">Precisión</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">90%</div>
                  <div className="text-sm text-primary-600">Follow-up Scheduler</div>
                  <div className="text-xs text-primary-500">Precisión</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
