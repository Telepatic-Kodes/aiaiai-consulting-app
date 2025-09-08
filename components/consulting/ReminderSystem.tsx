"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Bell, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Edit,
  Trash2,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  Target,
  Star
} from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'followup' | 'meeting' | 'proposal' | 'deadline' | 'custom';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  clientId?: string;
  clientName?: string;
  status: 'pending' | 'completed' | 'overdue';
  createdAt: Date;
  completedAt?: Date;
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  actions: {
    type: 'call' | 'email' | 'meeting' | 'proposal' | 'custom';
    label: string;
    completed: boolean;
  }[];
}

// Mock reminders data
const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Seguimiento urgente - Sueño Andino',
    description: 'Contactar a María González para obtener respuesta sobre la propuesta',
    type: 'followup',
    priority: 'high',
    dueDate: new Date('2025-01-20T17:00:00'),
    clientId: '1',
    clientName: 'Sueño Andino',
    status: 'pending',
    createdAt: new Date('2025-01-20T10:00:00'),
    actions: [
      { type: 'call', label: 'Llamar a María', completed: false },
      { type: 'email', label: 'Enviar email de seguimiento', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Reunión con EcoFashion',
    description: 'Preparar presentación para la reunión de las 15:00',
    type: 'meeting',
    priority: 'high',
    dueDate: new Date('2025-01-20T14:30:00'),
    clientId: '3',
    clientName: 'EcoFashion',
    status: 'pending',
    createdAt: new Date('2025-01-20T08:00:00'),
    actions: [
      { type: 'meeting', label: 'Preparar presentación', completed: false },
      { type: 'call', label: 'Confirmar reunión', completed: true }
    ]
  },
  {
    id: '3',
    title: 'Enviar propuesta a TechStart',
    description: 'Completar y enviar la propuesta técnica',
    type: 'proposal',
    priority: 'medium',
    dueDate: new Date('2025-01-19T18:00:00'),
    clientId: '2',
    clientName: 'TechStart Chile',
    status: 'completed',
    createdAt: new Date('2025-01-19T09:00:00'),
    completedAt: new Date('2025-01-19T17:30:00'),
    actions: [
      { type: 'proposal', label: 'Enviar propuesta', completed: true }
    ]
  },
  {
    id: '4',
    title: 'Research de mercado - Agrotecnología',
    description: 'Investigar tendencias en agrotecnología para AgroTech',
    type: 'deadline',
    priority: 'medium',
    dueDate: new Date('2025-01-22T12:00:00'),
    clientId: '4',
    clientName: 'AgroTech Solutions',
    status: 'pending',
    createdAt: new Date('2025-01-19T14:00:00'),
    actions: [
      { type: 'custom', label: 'Investigar mercado', completed: false },
      { type: 'email', label: 'Enviar resumen', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Actualizar CRM - HealthTech',
    description: 'Registrar información del contrato ganado',
    type: 'custom',
    priority: 'low',
    dueDate: new Date('2025-01-21T16:00:00'),
    clientId: '5',
    clientName: 'HealthTech Pro',
    status: 'pending',
    createdAt: new Date('2025-01-20T09:00:00'),
    actions: [
      { type: 'custom', label: 'Actualizar CRM', completed: false }
    ]
  }
];

export function ReminderSystem() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showNewReminder, setShowNewReminder] = useState(false);

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'followup': return <Phone className="w-5 h-5 text-blue-600" />;
      case 'meeting': return <Calendar className="w-5 h-5 text-green-600" />;
      case 'proposal': return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'deadline': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'custom': return <Star className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getStatusColor = (status: Reminder['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (diff < 0) return 'Vencido';
    if (hours < 24) return `En ${hours}h`;
    if (days < 7) return `En ${days}d`;
    return date.toLocaleDateString('es-CL');
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && reminder.status === 'pending') ||
      (filter === 'completed' && reminder.status === 'completed') ||
      (filter === 'overdue' && isOverdue(reminder.dueDate) && reminder.status === 'pending');
    
    const matchesPriority = priorityFilter === 'all' || reminder.priority === priorityFilter;
    
    return matchesFilter && matchesPriority;
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { 
            ...reminder, 
            status: reminder.status === 'completed' ? 'pending' : 'completed',
            completedAt: reminder.status === 'completed' ? undefined : new Date()
          }
        : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const completeAction = (reminderId: string, actionIndex: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? {
            ...reminder,
            actions: reminder.actions.map((action, index) => 
              index === actionIndex ? { ...action, completed: !action.completed } : action
            )
          }
        : reminder
    ));
  };

  const getReminderStats = () => {
    const total = reminders.length;
    const pending = reminders.filter(r => r.status === 'pending').length;
    const completed = reminders.filter(r => r.status === 'completed').length;
    const overdue = reminders.filter(r => isOverdue(r.dueDate) && r.status === 'pending').length;
    const highPriority = reminders.filter(r => r.priority === 'high' && r.status === 'pending').length;
    
    return { total, pending, completed, overdue, highPriority };
  };

  const stats = getReminderStats();

  return (
    <div className="space-y-6">
      {/* Métricas de Recordatorios */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total
                </div>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Pendientes
                </div>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Completados
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Vencidos
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.highPriority}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Alta Prioridad
                </div>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'pending', 'completed', 'overdue'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todos' :
                 filterType === 'pending' ? 'Pendientes' :
                 filterType === 'completed' ? 'Completados' : 'Vencidos'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las prioridades</option>
              <option value="high">Alta prioridad</option>
              <option value="medium">Media prioridad</option>
              <option value="low">Baja prioridad</option>
            </select>
            
            <Button
              onClick={() => setShowNewReminder(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Recordatorio
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de Recordatorios */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => (
          <Card 
            key={reminder.id} 
            className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getPriorityColor(reminder.priority)} ${
              reminder.status === 'completed' ? 'opacity-75' : ''
            } ${isOverdue(reminder.dueDate) && reminder.status === 'pending' ? 'ring-2 ring-red-200 dark:ring-red-800' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className="flex-shrink-0 mt-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {reminder.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getReminderIcon(reminder.type)}
                      <h3 className={`font-semibold ${reminder.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {reminder.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                        {reminder.status === 'pending' ? 'Pendiente' : 
                         reminder.status === 'completed' ? 'Completado' : 'Vencido'}
                      </span>
                      {isOverdue(reminder.dueDate) && reminder.status === 'pending' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${reminder.status === 'completed' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {reminder.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDueDate(reminder.dueDate)}
                      </div>
                      {reminder.clientName && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {reminder.clientName}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{reminder.priority} priority</span>
                      </div>
                    </div>
                    
                    {/* Acciones */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Acciones:</div>
                      <div className="flex flex-wrap gap-2">
                        {reminder.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => completeAction(reminder.id, index)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              action.completed 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {action.completed ? '✓ ' : ''}{action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay recordatorios
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all' 
              ? 'No hay recordatorios que coincidan con los filtros seleccionados'
              : '¡Excelente! No tienes recordatorios pendientes'
            }
          </p>
        </div>
      )}
    </div>
  );
}
