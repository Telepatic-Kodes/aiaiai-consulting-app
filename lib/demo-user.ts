/**
 * Demo User Data for AIAIAI Consulting App
 * 
 * This file contains realistic demo data for testing all functionalities
 * of the consulting platform.
 */

export const demoUser = {
  // Personal Information
  personal: {
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@techconsulting.cl",
    phone: "+56 9 8765 4321",
    position: "CEO & Fundador",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },

  // Company Information
  company: {
    name: "TechConsulting LATAM",
    industry: "Consultoría Tecnológica",
    size: "10-50 empleados",
    website: "https://techconsulting.cl",
    address: "Av. Providencia 1234, Santiago, Chile",
    description: "Consultoría especializada en transformación digital y automatización de procesos empresariales para empresas LATAM."
  },

  // Account Information
  account: {
    plan: "Premium",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-12-19",
    timezone: "America/Santiago"
  },

  // Demo Clients
  clients: [
    {
      id: "client-001",
      name: "María González",
      email: "maria.gonzalez@retailmax.cl",
      company: "RetailMax Chile",
      industry: "Retail",
      size: "100-500 empleados",
      status: "active",
      nps: 9,
      projects: 3,
      revenue: 45000,
      lastContact: "2024-12-18"
    },
    {
      id: "client-002", 
      name: "Roberto Silva",
      email: "roberto.silva@fintechpro.cl",
      company: "FinTech Pro",
      industry: "Fintech",
      size: "50-100 empleados",
      status: "active",
      nps: 8,
      projects: 2,
      revenue: 32000,
      lastContact: "2024-12-17"
    },
    {
      id: "client-003",
      name: "Ana Martínez",
      email: "ana.martinez@logistics.cl",
      company: "Logistics Solutions",
      industry: "Logística",
      size: "200-500 empleados",
      status: "prospect",
      nps: 0,
      projects: 0,
      revenue: 0,
      lastContact: "2024-12-16"
    }
  ],

  // Demo Projects
  projects: [
    {
      id: "project-001",
      name: "Automatización de Procesos de Ventas",
      client: "RetailMax Chile",
      status: "en_progress",
      progress: 75,
      startDate: "2024-11-01",
      endDate: "2024-12-31",
      budget: 25000,
      team: ["Carlos Rodríguez", "María González", "Agente Lead Scorer"],
      deliverables: [
        { name: "Análisis de procesos actuales", status: "completed" },
        { name: "Diseño de automatización", status: "completed" },
        { name: "Implementación de agentes IA", status: "in_progress" },
        { name: "Capacitación del equipo", status: "pending" }
      ]
    },
    {
      id: "project-002",
      name: "Sistema de Gestión de Clientes",
      client: "FinTech Pro",
      status: "completed",
      progress: 100,
      startDate: "2024-10-01",
      endDate: "2024-11-30",
      budget: 18000,
      team: ["Carlos Rodríguez", "Roberto Silva", "Agente CRM Updater"],
      deliverables: [
        { name: "Análisis de requerimientos", status: "completed" },
        { name: "Desarrollo del sistema", status: "completed" },
        { name: "Integración con APIs", status: "completed" },
        { name: "Testing y despliegue", status: "completed" }
      ]
    },
    {
      id: "project-003",
      name: "Optimización de Cadena de Suministro",
      client: "Logistics Solutions",
      status: "planning",
      progress: 15,
      startDate: "2025-01-15",
      endDate: "2025-03-15",
      budget: 35000,
      team: ["Carlos Rodríguez", "Ana Martínez"],
      deliverables: [
        { name: "Análisis de procesos actuales", status: "in_progress" },
        { name: "Identificación de oportunidades", status: "pending" },
        { name: "Diseño de solución", status: "pending" },
        { name: "Implementación", status: "pending" }
      ]
    }
  ],

  // Demo Agents
  agents: [
    {
      id: "agent-001",
      name: "Meeting Summarizer",
      category: "Operaciones & Cliente",
      status: "active",
      accuracy: 94,
      tasksCompleted: 156,
      lastExecution: "2024-12-19T10:30:00Z",
      price: 39,
      description: "Resumen automático de reuniones con análisis de sentimientos"
    },
    {
      id: "agent-002",
      name: "Proposal Builder",
      category: "Comercial & Marketing",
      status: "active",
      accuracy: 89,
      tasksCompleted: 89,
      lastExecution: "2024-12-19T09:15:00Z",
      price: 79,
      description: "Generación automática de propuestas comerciales"
    },
    {
      id: "agent-003",
      name: "Lead Scorer",
      category: "Comercial & Marketing",
      status: "active",
      accuracy: 92,
      tasksCompleted: 234,
      lastExecution: "2024-12-19T11:45:00Z",
      price: 49,
      description: "Calificación automática de leads con análisis predictivo"
    },
    {
      id: "agent-004",
      name: "CRM Updater",
      category: "Operaciones & Cliente",
      status: "development",
      accuracy: 87,
      tasksCompleted: 67,
      lastExecution: "2024-12-18T16:20:00Z",
      price: 59,
      description: "Sincronización automática de datos CRM"
    },
    {
      id: "agent-005",
      name: "Follow-up Scheduler",
      category: "Comercial & Marketing",
      status: "inactive",
      accuracy: 91,
      tasksCompleted: 123,
      lastExecution: "2024-12-17T14:10:00Z",
      price: 49,
      description: "Automatización de seguimientos comerciales"
    }
  ],

  // Demo Notifications
  notifications: [
    {
      id: "notif-001",
      type: "success",
      title: "Proyecto completado",
      message: "El proyecto 'Sistema de Gestión de Clientes' ha sido completado exitosamente",
      timestamp: "2024-12-19T10:30:00Z",
      read: false,
      actions: [
        { label: "Ver proyecto", action: "view_project", data: "project-002" },
        { label: "Generar reporte", action: "generate_report", data: "project-002" }
      ]
    },
    {
      id: "notif-002",
      type: "info",
      title: "Nueva reunión programada",
      message: "Reunión con Ana Martínez de Logistics Solutions programada para mañana a las 10:00 AM",
      timestamp: "2024-12-19T09:15:00Z",
      read: false,
      actions: [
        { label: "Ver calendario", action: "view_calendar", data: "meeting-001" },
        { label: "Preparar agenda", action: "prepare_agenda", data: "meeting-001" }
      ]
    },
    {
      id: "notif-003",
      type: "warning",
      title: "Agente inactivo",
      message: "El agente 'Follow-up Scheduler' no ha ejecutado tareas en las últimas 24 horas",
      timestamp: "2024-12-19T08:45:00Z",
      read: true,
      actions: [
        { label: "Revisar configuración", action: "check_config", data: "agent-005" },
        { label: "Reiniciar agente", action: "restart_agent", data: "agent-005" }
      ]
    }
  ],

  // Demo Favorites
  favorites: [
    {
      id: "fav-001",
      type: "client",
      title: "RetailMax Chile",
      description: "Cliente principal con 3 proyectos activos",
      tags: ["principal", "retail", "activo"],
      url: "/clients/client-001",
      addedAt: "2024-12-15T10:30:00Z"
    },
    {
      id: "fav-002",
      type: "project",
      title: "Automatización de Procesos de Ventas",
      description: "Proyecto en progreso con 75% completado",
      tags: ["en_progreso", "automatización", "ventas"],
      url: "/projects/project-001",
      addedAt: "2024-12-16T14:20:00Z"
    },
    {
      id: "fav-003",
      type: "agent",
      title: "Lead Scorer",
      description: "Agente con 92% de precisión y 234 tareas completadas",
      tags: ["alto_rendimiento", "marketing", "leads"],
      url: "/agents/agent-003",
      addedAt: "2024-12-17T09:15:00Z"
    }
  ],

  // Demo Comments
  comments: [
    {
      id: "comment-001",
      projectId: "project-001",
      author: "Carlos Rodríguez",
      content: "Excelente progreso en la implementación. El agente está funcionando mejor de lo esperado.",
      timestamp: "2024-12-19T10:30:00Z",
      likes: 3,
      dislikes: 0,
      resolved: false,
      replies: [
        {
          id: "reply-001",
          author: "María González",
          content: "Gracias Carlos, el equipo está muy satisfecho con los resultados.",
          timestamp: "2024-12-19T11:15:00Z",
          likes: 1,
          dislikes: 0
        }
      ]
    },
    {
      id: "comment-002",
      projectId: "project-002",
      author: "Roberto Silva",
      content: "¿Podemos programar una reunión para revisar los próximos pasos?",
      timestamp: "2024-12-18T16:45:00Z",
      likes: 1,
      dislikes: 0,
      resolved: true,
      replies: []
    }
  ],

  // Demo Integrations
  integrations: [
    {
      id: "integration-001",
      name: "Slack",
      status: "connected",
      description: "Notificaciones y colaboración en tiempo real",
      lastSync: "2024-12-19T10:30:00Z",
      config: {
        channel: "#aiaiai-notifications",
        webhook: "https://hooks.slack.com/services/..."
      }
    },
    {
      id: "integration-002",
      name: "Google Calendar",
      status: "connected",
      description: "Sincronización de eventos y reuniones",
      lastSync: "2024-12-19T09:15:00Z",
      config: {
        calendarId: "primary",
        syncInterval: "15min"
      }
    },
    {
      id: "integration-003",
      name: "Salesforce CRM",
      status: "pending",
      description: "Sincronización de datos de clientes y oportunidades",
      lastSync: null,
      config: {
        apiVersion: "v58.0",
        sandbox: false
      }
    }
  ],

  // Demo Analytics
  analytics: {
    revenue: {
      monthly: 95000,
      quarterly: 285000,
      yearly: 1140000,
      growth: 23.5
    },
    clients: {
      total: 12,
      active: 8,
      prospects: 4,
      satisfaction: 8.7
    },
    projects: {
      total: 18,
      completed: 12,
      inProgress: 4,
      planning: 2,
      successRate: 94.4
    },
    agents: {
      total: 5,
      active: 3,
      development: 1,
      inactive: 1,
      averageAccuracy: 90.6
    }
  }
};

export default demoUser;
