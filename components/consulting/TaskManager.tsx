"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  Phone,
  Mail,
  AlertTriangle,
  Star,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Flag,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  category: 'followup' | 'meeting' | 'proposal' | 'research' | 'admin' | 'urgent';
  clientId?: string;
  clientName?: string;
  createdAt: Date;
  completedAt?: Date;
  tags: string[];
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
}

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Seguimiento urgente - Sueño Andino',
    description: 'Contactar a María González para obtener respuesta sobre la propuesta enviada hace 5 días',
    completed: false,
    priority: 'high',
    dueDate: new Date('2025-01-20T17:00:00'),
    category: 'followup',
    clientId: '1',
    clientName: 'Sueño Andino',
    createdAt: new Date('2025-01-20T10:00:00'),
    tags: ['urgente', 'propuesta', 'seguimiento'],
    estimatedTime: 30
  },
  {
    id: '2',
    title: 'Preparar presentación para EcoFashion',
    description: 'Crear presentación personalizada para la reunión de las 15:00 con Ana Rodríguez',
    completed: false,
    priority: 'high',
    dueDate: new Date('2025-01-20T14:30:00'),
    category: 'meeting',
    clientId: '3',
    clientName: 'EcoFashion',
    createdAt: new Date('2025-01-20T08:00:00'),
    tags: ['presentación', 'reunión', 'preparación'],
    estimatedTime: 60
  },
  {
    id: '3',
    title: 'Enviar propuesta técnica a TechStart',
    description: 'Completar y enviar la propuesta técnica detallada para el proyecto de IA',
    completed: true,
    priority: 'medium',
    dueDate: new Date('2025-01-19T18:00:00'),
    category: 'proposal',
    clientId: '2',
    clientName: 'TechStart Chile',
    createdAt: new Date('2025-01-19T09:00:00'),
    completedAt: new Date('2025-01-19T17:30:00'),
    tags: ['propuesta', 'técnica', 'IA'],
    estimatedTime: 120,
    actualTime: 135
  },
  {
    id: '4',
    title: 'Research de mercado - Agrotecnología',
    description: 'Investigar tendencias y competencia en el sector de agrotecnología para AgroTech Solutions',
    completed: false,
    priority: 'medium',
    dueDate: new Date('2025-01-22T12:00:00'),
    category: 'research',
    clientId: '4',
    clientName: 'AgroTech Solutions',
    createdAt: new Date('2025-01-19T14:00:00'),
    tags: ['research', 'mercado', 'competencia'],
    estimatedTime: 90
  },
  {
    id: '5',
    title: 'Actualizar CRM con datos de HealthTech',
    description: 'Registrar información del contrato ganado y actualizar pipeline',
    completed: false,
    priority: 'low',
    dueDate: new Date('2025-01-21T16:00:00'),
    category: 'admin',
    clientId: '5',
    clientName: 'HealthTech Pro',
    createdAt: new Date('2025-01-20T09:00:00'),
    tags: ['CRM', 'actualización', 'contrato'],
    estimatedTime: 20
  },
  {
    id: '6',
    title: 'Llamada de seguimiento - EduTech',
    description: 'Programar y realizar llamada de seguimiento con Diego Herrera',
    completed: false,
    priority: 'medium',
    dueDate: new Date('2025-01-21T10:00:00'),
    category: 'followup',
    clientId: '6',
    clientName: 'EduTech Innovations',
    createdAt: new Date('2025-01-20T11:00:00'),
    tags: ['llamada', 'seguimiento', 'prospecto'],
    estimatedTime: 25
  }
];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-500" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Award className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'followup': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'meeting': return <Users className="w-4 h-4 text-green-600" />;
      case 'proposal': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'research': return <Search className="w-4 h-4 text-orange-600" />;
      case 'admin': return <CheckSquare className="w-4 h-4 text-gray-600" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-600" />;
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

    if (diff < 0) return 'Vencida';
    if (hours < 24) return `En ${hours}h`;
    if (days < 7) return `En ${days}d`;
    return date.toLocaleDateString('es-CL');
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !task.completed) ||
      (filter === 'completed' && task.completed) ||
      (filter === 'overdue' && !task.completed && isOverdue(task.dueDate));
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.clientName && task.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCompleted = showCompleted || !task.completed;
    
    return matchesFilter && matchesPriority && matchesCategory && matchesSearch && matchesCompleted;
  });

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const overdue = tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length;
    const highPriority = tasks.filter(t => !t.completed && t.priority === 'high').length;
    
    return { total, completed, pending, overdue, highPriority };
  };

  const stats = getTaskStats();

  return (
    <ContentLayout 
      title="Gestor de Tareas" 
      subtitle="Organiza y gestiona todas las tareas del proceso de consultoría"
    >
      {/* Métricas de Tareas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
              <CheckSquare className="w-8 h-8 text-blue-600" />
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
                  Completadas
                </div>
              </div>
              <CheckSquare className="w-8 h-8 text-green-600" />
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
                <div className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Vencidas
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
              <Flag className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'completed', 'overdue'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todas' :
                 filterType === 'pending' ? 'Pendientes' :
                 filterType === 'completed' ? 'Completadas' : 'Vencidas'}
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
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="followup">Seguimiento</option>
              <option value="meeting">Reuniones</option>
              <option value="proposal">Propuestas</option>
              <option value="research">Research</option>
              <option value="admin">Administrativo</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
            className={showCompleted ? 'bg-green-50 text-green-700 border-green-300' : ''}
          >
            {showCompleted ? 'Ocultar completadas' : 'Mostrar completadas'}
          </Button>
        </div>
      </div>

      {/* Lista de Tareas */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card 
            key={task.id} 
            className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getPriorityColor(task.priority)} ${
              task.completed ? 'opacity-75' : ''
            } ${isOverdue(task.dueDate) && !task.completed ? 'ring-2 ring-red-200 dark:ring-red-800' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 mt-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                      </h3>
                      {getPriorityIcon(task.priority)}
                      {getCategoryIcon(task.category)}
                      {isOverdue(task.dueDate) && !task.completed && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {task.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDueDate(task.dueDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.estimatedTime}min
                      </div>
                      {task.clientName && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {task.clientName}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{task.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
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
                    onClick={() => deleteTask(task.id)}
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

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay tareas
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
              ? 'No hay tareas que coincidan con los filtros seleccionados'
              : '¡Excelente! No tienes tareas pendientes'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}



