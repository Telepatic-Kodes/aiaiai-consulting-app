import { NextRequest, NextResponse } from 'next/server';

/**
 * Dashboard API Route
 * 
 * Features:
 * - GET: Retrieve dashboard metrics and data
 * - Professional error handling
 * - Consistent with AIAIAI Consulting design system
 */

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    const dashboardData = {
      metrics: {
        activeAgents: {
          value: 5,
          change: 2,
          changeType: 'number',
          trend: 'up',
          description: 'Agentes ejecutando tareas'
        },
        activeClients: {
          value: 32,
          change: 8,
          changeType: 'number',
          trend: 'up',
          description: 'Clientes con proyectos activos'
        },
        activeProjects: {
          value: 23,
          change: 5,
          changeType: 'number',
          trend: 'up',
          description: 'Proyectos en ejecución'
        },
        monthlyRevenue: {
          value: 47500,
          change: 12.5,
          changeType: 'percentage',
          trend: 'up',
          description: 'Ingresos recurrentes mensuales'
        }
      },
      charts: {
        revenue: [
          { label: 'Ene', value: 35000, change: 5000 },
          { label: 'Feb', value: 42000, change: 7000 },
          { label: 'Mar', value: 38000, change: -4000 },
          { label: 'Abr', value: 45000, change: 7000 },
          { label: 'May', value: 52000, change: 7000 },
          { label: 'Jun', value: 48000, change: -4000 }
        ],
        agentPerformance: [
          { label: 'Meeting Summarizer', value: 94.2, color: '#3b82f6' },
          { label: 'Proposal Builder', value: 96.8, color: '#10b981' },
          { label: 'Lead Scorer', value: 91.5, color: '#f59e0b' },
          { label: 'CRM Updater', value: 98.1, color: '#ef4444' },
          { label: 'Follow-up Scheduler', value: 89.3, color: '#8b5cf6' }
        ],
        projectStatus: [
          { label: 'Completados', value: 12, color: '#10b981' },
          { label: 'En Progreso', value: 8, color: '#3b82f6' },
          { label: 'Planificación', value: 3, color: '#f59e0b' },
          { label: 'En Pausa', value: 2, color: '#ef4444' }
        ]
      },
      recentActivity: [
        {
          id: '1',
          type: 'user',
          title: 'Nuevo cliente agregado',
          description: 'María González de TechCorp Chile se ha registrado',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'success',
          metadata: {
            company: 'TechCorp Chile',
            role: 'CTO'
          }
        },
        {
          id: '2',
          type: 'agent',
          title: 'Lead Scorer completado',
          description: 'Procesó 47 nuevos leads con 85% de precisión',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          status: 'success',
          metadata: {
            leads: '47',
            precision: '85%'
          }
        },
        {
          id: '3',
          type: 'project',
          title: 'Proyecto actualizado',
          description: 'Implementación Lead Scorer - 75% completado',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          status: 'info',
          metadata: {
            progress: '75%',
            client: 'TechCorp Chile'
          }
        },
        {
          id: '4',
          type: 'revenue',
          title: 'Nuevo ingreso registrado',
          description: 'Pago recibido por proyecto de automatización',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          status: 'success',
          metadata: {
            amount: '$25,000',
            project: 'Automatización CRM'
          }
        },
        {
          id: '5',
          type: 'system',
          title: 'Reporte mensual generado',
          description: 'Reporte de rendimiento de agentes disponible',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          status: 'info'
        }
      ],
      quickActions: [
        {
          title: 'Nuevo Agente',
          description: 'Crear un nuevo agente de IA',
          href: '/agents/new',
          variant: 'primary'
        },
        {
          title: 'Nuevo Cliente',
          description: 'Agregar un nuevo cliente',
          href: '/clients/new',
          variant: 'secondary'
        },
        {
          title: 'Ver Reportes',
          description: 'Generar reportes de rendimiento',
          href: '/reports',
          variant: 'secondary'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      meta: {
        generatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los datos del dashboard'
      },
      { status: 500 }
    );
  }
}