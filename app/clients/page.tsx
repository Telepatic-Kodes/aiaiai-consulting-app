"use client";

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { cn } from '@/lib/utils';
import { 
  Users,
  Building2, 
  DollarSign,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  projects: number;
  revenue: number;
  lastContact: string;
  avatar?: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@empresa.com',
    company: 'TechCorp Chile',
    status: 'active',
    projects: 3,
    revenue: 45000,
    lastContact: 'Hace 2 días'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@innovacion.cl',
    company: 'Innovación Digital',
    status: 'active',
    projects: 2,
    revenue: 32000,
    lastContact: 'Hace 1 semana'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana@startup.com',
    company: 'StartupLatam',
    status: 'pending',
    projects: 1,
    revenue: 15000,
    lastContact: 'Hace 3 días'
  },
  {
    id: '4',
    name: 'Roberto Silva',
    email: 'roberto@consulting.cl',
    company: 'Silva Consulting',
    status: 'active',
    projects: 4,
    revenue: 68000,
    lastContact: 'Ayer'
  },
  {
    id: '5',
    name: 'Laura Fernández',
    email: 'laura@empresa.com',
    company: 'Fernández & Asociados',
    status: 'inactive',
    projects: 0,
    revenue: 0,
    lastContact: 'Hace 1 mes'
  },
  {
    id: '6',
    name: 'Diego Herrera',
    email: 'diego@tech.com',
    company: 'Tech Solutions',
    status: 'active',
    projects: 2,
    revenue: 28000,
    lastContact: 'Hace 4 días'
  }
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'revenue' | 'lastContact'>('name');

  const filteredClients = clients
    .filter(client => {
      const matchesFilter = filter === 'all' || client.status === filter;
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'revenue':
          return b.revenue - a.revenue;
        case 'lastContact':
          return a.lastContact.localeCompare(b.lastContact);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusText = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <ProtectedRoute>
      <StandardLayout
        title="Gestión de Clientes"
        subtitle="Administra y monitorea tus clientes"
        actions={
          <button
            onClick={() => window.location.href = '/clients/new'}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cliente
          </button>
        }
      >

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StandardMetricCard
            title="Total Clientes"
            value={clients.length}
            icon={Users}
            color="blue"
            description="Clientes en el sistema"
          />
          <StandardMetricCard
            title="Activos"
            value={clients.filter(c => c.status === 'active').length}
            icon={Building2}
            color="green"
            description="Clientes con proyectos activos"
          />
          <StandardMetricCard
            title="Ingresos Totales"
            value={formatCurrency(clients.reduce((acc, client) => acc + client.revenue, 0))}
            icon={DollarSign}
            color="purple"
            description="Ingresos generados por clientes"
          />
          <StandardMetricCard
            title="Proyectos Activos"
            value={clients.reduce((acc, client) => acc + client.projects, 0)}
            icon={Plus}
            color="yellow"
            description="Proyectos en ejecución"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {(['all', 'active', 'inactive', 'pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    filter === status
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {status === 'all' ? 'Todos' : 
                   status === 'active' ? 'Activos' :
                   status === 'inactive' ? 'Inactivos' : 'Pendientes'}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="company">Ordenar por empresa</option>
                <option value="revenue">Ordenar por ingresos</option>
                <option value="lastContact">Ordenar por último contacto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                      {getInitials(client.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.company}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  getStatusColor(client.status)
                )}>
                  {getStatusText(client.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {client.email}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Proyectos:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{client.projects}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Ingresos:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{formatCurrency(client.revenue)}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Último contacto: {client.lastContact}
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  Ver Detalles
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron clientes</h3>
            <p className="text-gray-600 dark:text-gray-400">Intenta ajustar los filtros o agregar un nuevo cliente.</p>
          </div>
        )}
      </StandardLayout>
    </ProtectedRoute>
  );
}