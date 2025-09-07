import { NextRequest, NextResponse } from 'next/server';

/**
 * Projects API Route
 * 
 * Features:
 * - GET: Retrieve all projects
 * - POST: Create new project
 * - Professional error handling
 * - Consistent with AIAIAI Consulting design system
 */

// Mock data for demonstration
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
    completedDeliverables: 2,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
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
    completedDeliverables: 1,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-14T15:20:00Z'
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
    completedDeliverables: 3,
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-12-15T16:45:00Z'
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
    completedDeliverables: 1,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-12T09:15:00Z'
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
    completedDeliverables: 2,
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2025-01-15T11:30:00Z'
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
    completedDeliverables: 3,
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2025-01-14T16:20:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const clientId = searchParams.get('clientId');
    const search = searchParams.get('search');

    let filteredProjects = projects;

    // Filter by status
    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status);
    }

    // Filter by category
    if (category) {
      filteredProjects = filteredProjects.filter(project => 
        project.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by priority
    if (priority) {
      filteredProjects = filteredProjects.filter(project => project.priority === priority);
    }

    // Filter by client
    if (clientId) {
      filteredProjects = filteredProjects.filter(project => project.clientId === clientId);
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      meta: {
        total: filteredProjects.length,
        filters: { status, category, priority, clientId, search }
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los proyectos'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'clientId', 'budget', 'startDate', 'endDate'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos requeridos faltantes',
          message: `Los siguientes campos son requeridos: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    
    if (startDate >= endDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fechas inválidas',
          message: 'La fecha de inicio debe ser anterior a la fecha de fin'
        },
        { status: 400 }
      );
    }

    // Validate budget
    if (body.budget <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Presupuesto inválido',
          message: 'El presupuesto debe ser mayor a 0'
        },
        { status: 400 }
      );
    }

    // Create new project
    const newProject = {
      id: `PROJ-${String(projects.length + 1).padStart(3, '0')}`,
      name: body.name,
      client: body.client || 'Cliente no especificado',
      clientId: body.clientId,
      status: 'planning',
      progress: 0,
      startDate: body.startDate,
      endDate: body.endDate,
      budget: body.budget,
      spent: 0,
      team: body.team || [],
      description: body.description || '',
      category: body.category || 'General',
      priority: body.priority || 'medium',
      lastUpdate: new Date().toISOString(),
      deliverables: body.deliverables || [],
      completedDeliverables: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would save to database here
    // For now, we'll just return the created project
    projects.push(newProject);

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Proyecto creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo crear el proyecto'
      },
      { status: 500 }
    );
  }
}