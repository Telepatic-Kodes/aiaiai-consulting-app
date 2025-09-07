import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Edit3,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  currentActivity?: string;
}

interface CollaborationSession {
  id: string;
  name: string;
  type: 'document' | 'project' | 'report';
  collaborators: Collaborator[];
  isActive: boolean;
  createdAt: Date;
  lastActivity: Date;
}

/**
 * Real-Time Collaboration Component
 * 
 * Features:
 * - Live collaborator presence
 * - Activity tracking
 * - Role management
 * - Real-time updates
 * - Professional interface
 */
export function RealTimeCollaboration() {
  const [sessions, setSessions] = React.useState<CollaborationSession[]>([
    {
      id: '1',
      name: 'Reporte de Rendimiento Q1',
      type: 'report',
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      collaborators: [
        {
          id: '1',
          name: 'María González',
          email: 'maria@techcorp.cl',
          role: 'owner',
          isOnline: true,
          currentActivity: 'Editando sección de métricas'
        },
        {
          id: '2',
          name: 'Carlos Rodríguez',
          email: 'carlos@techcorp.cl',
          role: 'editor',
          isOnline: true,
          currentActivity: 'Revisando gráficos'
        },
        {
          id: '3',
          name: 'Ana Silva',
          email: 'ana@techcorp.cl',
          role: 'viewer',
          isOnline: false,
          lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        }
      ]
    },
    {
      id: '2',
      name: 'Proyecto Lead Scorer',
      type: 'project',
      isActive: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      lastActivity: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      collaborators: [
        {
          id: '4',
          name: 'Roberto Martínez',
          email: 'roberto@techcorp.cl',
          role: 'owner',
          isOnline: true,
          currentActivity: 'Actualizando timeline'
        },
        {
          id: '5',
          name: 'Laura Fernández',
          email: 'laura@techcorp.cl',
          role: 'editor',
          isOnline: false,
          lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        }
      ]
    }
  ]);

  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState<string | null>(null);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'editor':
        return <Edit3 className="h-4 w-4 text-blue-600" />;
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-green-100 text-green-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <Edit3 className="h-4 w-4" />;
      case 'project':
        return <Users className="h-4 w-4" />;
      case 'report':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  const handleInviteCollaborator = (sessionId: string) => {
    setSelectedSession(sessionId);
    setShowInviteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Colaboración en Tiempo Real</h2>
          <p className="text-gray-600">Gestiona sesiones de colaboración activas</p>
        </div>
        <Button leftIcon={<UserPlus className="h-4 w-4" />}>
          Nueva Sesión
        </Button>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    {getTypeIcon(session.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{session.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Última actividad: {formatLastSeen(session.lastActivity)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{session.collaborators.length} colaboradores</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${session.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-600">
                    {session.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Collaborators */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Colaboradores</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<UserPlus className="h-4 w-4" />}
                    onClick={() => handleInviteCollaborator(session.id)}
                  >
                    Invitar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {session.collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="relative">
                        <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {collaborator.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {collaborator.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {collaborator.name}
                          </p>
                          {getRoleIcon(collaborator.role)}
                        </div>
                        <p className="text-xs text-gray-600 truncate">
                          {collaborator.email}
                        </p>
                        {collaborator.isOnline && collaborator.currentActivity && (
                          <p className="text-xs text-primary-600 truncate">
                            {collaborator.currentActivity}
                          </p>
                        )}
                        {!collaborator.isOnline && collaborator.lastSeen && (
                          <p className="text-xs text-gray-500">
                            Visto {formatLastSeen(collaborator.lastSeen)}
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(collaborator.role)}`}>
                          {collaborator.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Invitar Colaborador</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email del colaborador
                  </label>
                  <input
                    type="email"
                    placeholder="colaborador@empresa.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="viewer">Solo lectura</option>
                    <option value="editor">Editor</option>
                    <option value="owner">Propietario</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje personalizado (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Hola, te invito a colaborar en este proyecto..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancelar
                </Button>
                <Button>
                  Enviar Invitación
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
