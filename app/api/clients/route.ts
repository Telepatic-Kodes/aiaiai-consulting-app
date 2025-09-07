import { NextRequest, NextResponse } from 'next/server';

/**
 * Clients API Route
 * 
 * Features:
 * - GET: Retrieve all clients
 * - POST: Create new client
 * - Professional error handling
 * - Consistent with AIAIAI Consulting design system
 */

// Mock data for demonstration
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
    tags: ['VIP', 'Automatización'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
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
    tags: ['CRM', 'Integración'],
    createdAt: '2024-10-15T00:00:00Z',
    updatedAt: '2025-01-14T15:20:00Z'
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
    tags: ['Lead', 'Nuevo'],
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-13T09:15:00Z'
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
    tags: ['Inactivo'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-20T14:45:00Z'
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
    tags: ['VIP', 'Retail', 'Analytics'],
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2025-01-15T11:30:00Z'
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
    tags: ['Salud', 'Compliance'],
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2025-01-14T16:20:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const industry = searchParams.get('industry');
    const companySize = searchParams.get('companySize');
    const search = searchParams.get('search');

    let filteredClients = clients;

    // Filter by status
    if (status) {
      filteredClients = filteredClients.filter(client => client.status === status);
    }

    // Filter by industry
    if (industry) {
      filteredClients = filteredClients.filter(client => 
        client.industry.toLowerCase().includes(industry.toLowerCase())
      );
    }

    // Filter by company size
    if (companySize) {
      filteredClients = filteredClients.filter(client => client.companySize === companySize);
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClients = filteredClients.filter(client => 
        client.name.toLowerCase().includes(searchLower) ||
        client.company.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredClients,
      meta: {
        total: filteredClients.length,
        filters: { status, industry, companySize, search }
      }
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los clientes'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company'];
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email inválido',
          message: 'Por favor, ingresa un email válido'
        },
        { status: 400 }
      );
    }

    // Check if client already exists
    const existingClient = clients.find(client => client.email === body.email);
    if (existingClient) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cliente ya existe',
          message: 'Ya existe un cliente con este email'
        },
        { status: 409 }
      );
    }

    // Create new client
    const newClient = {
      id: `CLIENT-${String(clients.length + 1).padStart(3, '0')}`,
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone || '',
      location: body.location || '',
      industry: body.industry || '',
      companySize: body.companySize || '',
      status: 'prospect',
      projects: 0,
      totalRevenue: 0,
      lastContact: new Date().toISOString(),
      satisfaction: null,
      tags: body.tags || ['Nuevo'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would save to database here
    // For now, we'll just return the created client
    clients.push(newClient);

    return NextResponse.json({
      success: true,
      data: newClient,
      message: 'Cliente creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo crear el cliente'
      },
      { status: 500 }
    );
  }
}