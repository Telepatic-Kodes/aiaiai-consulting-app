import { NextRequest, NextResponse } from 'next/server';

/**
 * Agents API Route
 * 
 * Features:
 * - GET: Retrieve all agents
 * - POST: Create new agent
 * - Professional error handling
 * - Consistent with AIAIAI Consulting design system
 */

// Mock data for demonstration
const agents = [
  {
    id: 'meeting.summarizer',
    name: 'Meeting Summarizer',
    description: 'Resumen automático de reuniones con extracción de tareas accionables',
    status: 'active',
    version: '1.0.0',
    category: 'Operaciones & Cliente',
    pricing: '$39/mes',
    capabilities: [
      'Análisis de transcripciones',
      'Extracción de tareas',
      'Análisis de sentimientos'
    ],
    integrations: ['zoom', 'teams', 'google_meet', 'calendar'],
    metrics: {
      tasksCompleted: 342,
      accuracy: 94.2,
      lastRun: '2025-01-15T10:30:00Z'
    }
  },
  {
    id: 'proposal.builder',
    name: 'Proposal Builder',
    description: 'Generación automática de propuestas comerciales profesionales',
    status: 'active',
    version: '1.0.0',
    category: 'Comercial & Marketing',
    pricing: '$79/mes',
    capabilities: [
      'Generación de propuestas',
      'Cálculo de precios',
      'Templates personalizables'
    ],
    integrations: ['google_docs', 'microsoft_word', 'pdf_generator', 'gmail'],
    metrics: {
      tasksCompleted: 89,
      accuracy: 96.8,
      lastRun: '2025-01-15T09:15:00Z'
    }
  },
  {
    id: 'lead.scorer',
    name: 'Lead Scorer',
    description: 'Calificación automática de leads con análisis de comportamiento',
    status: 'active',
    version: '1.0.0',
    category: 'Comercial & Marketing',
    pricing: '$49/mes',
    capabilities: [
      'Calificación de leads',
      'Análisis de comportamiento',
      'Integración CRM'
    ],
    integrations: ['salesforce', 'hubspot', 'pipedrive', 'gmail'],
    metrics: {
      tasksCompleted: 567,
      accuracy: 91.5,
      lastRun: '2025-01-15T11:45:00Z'
    }
  },
  {
    id: 'crm.updater',
    name: 'CRM Updater',
    description: 'Sincronización automática de datos entre sistemas',
    status: 'development',
    version: '0.9.0',
    category: 'Operaciones & Cliente',
    pricing: '$59/mes',
    capabilities: [
      'Sincronización de datos',
      'Mapeo de campos',
      'Detección de duplicados'
    ],
    integrations: ['salesforce', 'hubspot', 'pipedrive', 'zoho'],
    metrics: {
      tasksCompleted: 123,
      accuracy: 98.1,
      lastRun: '2025-01-14T16:20:00Z'
    }
  },
  {
    id: 'followup.scheduler',
    name: 'Follow-up Scheduler',
    description: 'Automatización de seguimientos y agendamiento',
    status: 'development',
    version: '0.8.0',
    category: 'Comercial & Marketing',
    pricing: '$49/mes',
    capabilities: [
      'Automatización de seguimientos',
      'Integración calendario',
      'Gestión de recordatorios'
    ],
    integrations: ['gmail', 'outlook', 'calendar', 'whatsapp'],
    metrics: {
      tasksCompleted: 78,
      accuracy: 89.3,
      lastRun: '2025-01-14T14:10:00Z'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let filteredAgents = agents;

    // Filter by status
    if (status) {
      filteredAgents = filteredAgents.filter(agent => agent.status === status);
    }

    // Filter by category
    if (category) {
      filteredAgents = filteredAgents.filter(agent => 
        agent.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredAgents,
      meta: {
        total: filteredAgents.length,
        filters: { status, category }
      }
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los agentes'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'pricing'];
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

    // Create new agent
    const newAgent = {
      id: body.name.toLowerCase().replace(/\s+/g, '.'),
      name: body.name,
      description: body.description,
      status: 'development',
      version: '0.1.0',
      category: body.category,
      pricing: body.pricing,
      capabilities: body.capabilities || [],
      integrations: body.integrations || [],
      metrics: {
        tasksCompleted: 0,
        accuracy: 0,
        lastRun: null
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would save to database here
    // For now, we'll just return the created agent
    agents.push(newAgent);

    return NextResponse.json({
      success: true,
      data: newAgent,
      message: 'Agente creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo crear el agente'
      },
      { status: 500 }
    );
  }
}