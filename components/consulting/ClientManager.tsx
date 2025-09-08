"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  DollarSign,
  Building,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2
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
    status: 'meeting_completed',
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
    status: 'proposal_sent',
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
  }
];

export function ClientManager() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'bg-gray-100 text-gray-800';
      case 'meeting_scheduled': return 'bg-blue-100 text-blue-800';
      case 'meeting_completed': return 'bg-green-100 text-green-800';
      case 'proposal_sent': return 'bg-yellow-100 text-yellow-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      case 'closed_won': return 'bg-green-100 text-green-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'prospect': return 'Prospecto';
      case 'meeting_scheduled': return 'Reunión Agendada';
      case 'meeting_completed': return 'Reunión Completada';
      case 'proposal_sent': return 'Propuesta Enviada';
      case 'negotiating': return 'Negociando';
      case 'closed_won': return 'Ganado';
      case 'closed_lost': return 'Perdido';
      default: return status;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <ContentLayout 
      title="Gestión de Clientes" 
      subtitle="Administra tu pipeline de consultoría"
      actions={
        <Button onClick={() => setShowNewClientForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      }
    >
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Total Clientes"
          value={clients.length}
          icon={Users}
          color="blue"
          change="+12% este mes"
          changeType="positive"
        />
        <StandardMetricCard
          title="Reuniones Programadas"
          value={clients.filter(c => c.status === 'meeting_scheduled').length}
          icon={Calendar}
          color="green"
          change="+3 esta semana"
          changeType="positive"
        />
        <StandardMetricCard
          title="Propuestas Enviadas"
          value={clients.filter(c => c.status === 'proposal_sent').length}
          icon={Mail}
          color="yellow"
          change="+2 esta semana"
          changeType="positive"
        />
        <StandardMetricCard
          title="Valor Pipeline"
          value={formatCurrency(
            clients.reduce((sum, client) => sum + client.budget.max, 0),
            'CLP'
          )}
          icon={DollarSign}
          color="purple"
          change="+25% este mes"
          changeType="positive"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todos los estados</option>
              <option value="prospect">Prospecto</option>
              <option value="meeting_scheduled">Reunión Agendada</option>
              <option value="meeting_completed">Reunión Completada</option>
              <option value="proposal_sent">Propuesta Enviada</option>
              <option value="negotiating">Negociando</option>
              <option value="closed_won">Ganado</option>
              <option value="closed_lost">Perdido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {client.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{client.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">{client.industry}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Presupuesto: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(client.budget.min, client.budget.currency)} - {formatCurrency(client.budget.max, client.budget.currency)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Timeline: </span>
                      <span className="font-medium text-gray-900 dark:text-white">{client.timeline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron clientes
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primer cliente'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}
