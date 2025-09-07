import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn, formatRelativeTime } from '@/lib/utils';
import { 
  User, 
  FileText, 
  Bot, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  LucideIcon
} from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'user' | 'agent' | 'project' | 'revenue' | 'system' | 'notification';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  metadata?: Record<string, any>;
}

export interface RecentActivityProps {
  activities: ActivityItem[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
  className?: string;
  loading?: boolean;
  showTimestamps?: boolean;
  onItemClick?: (item: ActivityItem) => void;
}

/**
 * Professional Recent Activity Component
 * 
 * Features:
 * - Activity feed with different types
 * - Status indicators
 * - Relative timestamps
 * - Clickable items
 * - Loading states
 * - Consistent with AIAIAI Consulting design system
 */
export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  title = 'Actividad Reciente',
  subtitle,
  maxItems = 5,
  className,
  loading = false,
  showTimestamps = true,
  onItemClick,
}) => {
  const getActivityIcon = (type: ActivityItem['type']): LucideIcon => {
    switch (type) {
      case 'user':
        return User;
      case 'agent':
        return Bot;
      case 'project':
        return FileText;
      case 'revenue':
        return DollarSign;
      case 'system':
        return TrendingUp;
      case 'notification':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusIcon = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const displayedActivities = activities.slice(0, maxItems);

  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardHeader title={title} subtitle={subtitle} />
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={subtitle} />
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay actividad reciente</p>
            </div>
          ) : (
            displayedActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              
              return (
                <div
                  key={activity.id}
                  className={cn(
                    'flex items-start space-x-3 p-3 rounded-lg border-l-4 transition-colors duration-200',
                    getStatusColor(activity.status),
                    onItemClick && 'cursor-pointer hover:bg-gray-50'
                  )}
                  onClick={() => onItemClick?.(activity)}
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {getStatusIcon(activity.status)}
                        {showTimestamps && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatRelativeTime(activity.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {activity.metadata && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {activities.length > maxItems && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Ver toda la actividad ({activities.length - maxItems} más)
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Sample data for demonstration
export const sampleActivities: ActivityItem[] = [
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
];