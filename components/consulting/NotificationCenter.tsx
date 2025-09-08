"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  TrendingUp,
  X,
  Filter,
  MoreHorizontal,
  Star,
  Zap,
  Target,
  Award
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'urgent' | 'warning' | 'success' | 'info' | 'opportunity';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    onClick: () => void;
  };
  clientId?: string;
  category: 'pipeline' | 'meeting' | 'proposal' | 'followup' | 'analytics';
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'Cliente Crítico - Seguimiento Requerido',
    message: 'Sueño Andino no ha respondido a la propuesta enviada hace 5 días. Acción inmediata requerida.',
    timestamp: new Date('2025-01-20T10:30:00'),
    read: false,
    priority: 'high',
    action: {
      label: 'Contactar Ahora',
      onClick: () => console.log('Contactar Sueño Andino')
    },
    clientId: '1',
    category: 'followup'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Oportunidad Caliente Detectada',
    message: 'TechStart Chile está en etapa de negociación. Valor potencial: $10,000,000 CLP',
    timestamp: new Date('2025-01-20T09:15:00'),
    read: false,
    priority: 'high',
    action: {
      label: 'Ver Detalles',
      onClick: () => console.log('Ver TechStart Chile')
    },
    clientId: '2',
    category: 'pipeline'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Reunión Programada para Hoy',
    message: 'Reunión con EcoFashion programada para las 15:00. Preparar presentación de propuesta.',
    timestamp: new Date('2025-01-20T08:00:00'),
    read: false,
    priority: 'medium',
    action: {
      label: 'Ver Reunión',
      onClick: () => console.log('Ver reunión EcoFashion')
    },
    clientId: '3',
    category: 'meeting'
  },
  {
    id: '4',
    type: 'success',
    title: 'Propuesta Aprobada',
    message: 'HealthTech Pro ha aprobado la propuesta. Proyecto valorado en $15,000,000 CLP',
    timestamp: new Date('2025-01-19T16:45:00'),
    read: true,
    priority: 'high',
    action: {
      label: 'Ver Contrato',
      onClick: () => console.log('Ver contrato HealthTech')
    },
    clientId: '5',
    category: 'proposal'
  },
  {
    id: '5',
    type: 'info',
    title: 'Nuevo Prospecto Identificado',
    message: 'EduTech Innovations ha mostrado interés. Presupuesto estimado: $8,000,000 CLP',
    timestamp: new Date('2025-01-19T14:20:00'),
    read: true,
    priority: 'medium',
    action: {
      label: 'Agregar a Pipeline',
      onClick: () => console.log('Agregar EduTech')
    },
    clientId: '6',
    category: 'pipeline'
  },
  {
    id: '6',
    type: 'warning',
    title: 'Pipeline en Riesgo',
    message: '3 clientes han estado sin actualización por más de 7 días. Revisar seguimiento.',
    timestamp: new Date('2025-01-19T11:30:00'),
    read: false,
    priority: 'medium',
    action: {
      label: 'Revisar Pipeline',
      onClick: () => console.log('Revisar pipeline')
    },
    category: 'analytics'
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'opportunity'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'urgent': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'opportunity': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityIcon = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return <Zap className="w-4 h-4 text-red-500" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Award className="w-4 h-4 text-green-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'urgent' && notification.type === 'urgent') ||
      (filter === 'opportunity' && notification.type === 'opportunity');
    
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;
    
    return matchesFilter && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.type === 'urgent' && !n.read).length;
  const opportunityCount = notifications.filter(n => n.type === 'opportunity' && !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <ContentLayout 
      title="Centro de Notificaciones" 
      subtitle="Mantente al día con todas las actividades importantes del pipeline"
    >
      {/* Métricas de Notificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {unreadCount}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Sin Leer
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
                <div className="text-2xl font-bold text-red-600">
                  {urgentCount}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Urgentes
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
                <div className="text-2xl font-bold text-blue-600">
                  {opportunityCount}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Oportunidades
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notifications.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'unread', 'urgent', 'opportunity'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-blue-600 text-white' : ''}
              >
                {filterType === 'all' ? 'Todas' :
                 filterType === 'unread' ? 'Sin Leer' :
                 filterType === 'urgent' ? 'Urgentes' : 'Oportunidades'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="pipeline">Pipeline</option>
              <option value="meeting">Reuniones</option>
              <option value="proposal">Propuestas</option>
              <option value="followup">Seguimiento</option>
              <option value="analytics">Analytics</option>
            </select>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="text-green-600 border-green-300 hover:bg-green-50"
              >
                Marcar todas como leídas
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Notificaciones */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getNotificationColor(notification.type)} ${
              !notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      {getPriorityIcon(notification.priority)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTimeAgo(notification.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{notification.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{notification.priority}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {notification.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        notification.action?.onClick();
                        markAsRead(notification.id);
                      }}
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      {notification.action.label}
                    </Button>
                  )}
                  
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      Marcar como leída
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay notificaciones
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all' 
              ? 'No hay notificaciones que coincidan con los filtros seleccionados'
              : '¡Excelente! Estás al día con todas las notificaciones'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}



