'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Zap, 
  Settings, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ExternalLink,
  Calendar,
  Mail,
  FileText,
  BarChart3,
  Users,
  Globe,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'analytics' | 'communication' | 'storage' | 'crm';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync?: Date;
  config: IntegrationConfig;
  features: string[];
  webhookUrl?: string;
}

export interface IntegrationConfig {
  apiKey?: string;
  webhookSecret?: string;
  syncInterval?: number;
  autoSync?: boolean;
  customFields?: Record<string, any>;
}

interface ExternalIntegrationsProps {
  className?: string;
}

const ExternalIntegrations: React.FC<ExternalIntegrationsProps> = ({ className }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);

  // Mock data de integraciones disponibles
  const availableIntegrations: Integration[] = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Integración con Slack para notificaciones y colaboración',
      icon: '💬',
      category: 'communication',
      status: 'connected',
      lastSync: new Date('2024-01-15T10:30:00'),
      config: {
        apiKey: 'xoxb-***',
        webhookSecret: '***',
        syncInterval: 300,
        autoSync: true
      },
      features: ['Notificaciones', 'Canales', 'Mensajes', 'Usuarios']
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sincronización con Google Calendar para reuniones y eventos',
      icon: '📅',
      category: 'productivity',
      status: 'connected',
      lastSync: new Date('2024-01-15T09:15:00'),
      config: {
        apiKey: 'AIza***',
        syncInterval: 600,
        autoSync: true
      },
      features: ['Eventos', 'Reuniones', 'Recordatorios', 'Sincronización']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Integración con Salesforce CRM para gestión de clientes',
      icon: '☁️',
      category: 'crm',
      status: 'disconnected',
      config: {},
      features: ['Leads', 'Oportunidades', 'Contactos', 'Reportes']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Integración con HubSpot para marketing y ventas',
      icon: '🎯',
      category: 'crm',
      status: 'error',
      lastSync: new Date('2024-01-14T16:45:00'),
      config: {
        apiKey: 'pat-***',
        syncInterval: 900
      },
      features: ['Contactos', 'Empresas', 'Deals', 'Actividades']
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Integración con Google Analytics para métricas web',
      icon: '📊',
      category: 'analytics',
      status: 'connected',
      lastSync: new Date('2024-01-15T08:00:00'),
      config: {
        apiKey: 'UA-***',
        syncInterval: 3600,
        autoSync: true
      },
      features: ['Métricas', 'Audiencias', 'Conversiones', 'Reportes']
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Integración con Dropbox para almacenamiento de archivos',
      icon: '📁',
      category: 'storage',
      status: 'pending',
      config: {},
      features: ['Archivos', 'Carpetas', 'Sincronización', 'Compartir']
    }
  ];

  useEffect(() => {
    // Cargar integraciones desde localStorage
    const saved = localStorage.getItem('integrations');
    if (saved) {
      setIntegrations(JSON.parse(saved));
    } else {
      setIntegrations(availableIntegrations);
    }
  }, []);

  const saveIntegrations = useCallback((newIntegrations: Integration[]) => {
    setIntegrations(newIntegrations);
    localStorage.setItem('integrations', JSON.stringify(newIntegrations));
  }, []);

  const connectIntegration = useCallback(async (integrationId: string) => {
    setIsLoading(true);
    
    // Simular proceso de conexión
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedIntegrations = integrations.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'connected' as const,
            lastSync: new Date(),
            config: {
              ...integration.config,
              apiKey: '***',
              webhookSecret: '***',
              syncInterval: 300,
              autoSync: true
            }
          }
        : integration
    );
    
    saveIntegrations(updatedIntegrations);
    setIsLoading(false);
  }, [integrations, saveIntegrations]);

  const disconnectIntegration = useCallback(async (integrationId: string) => {
    if (!confirm('¿Estás seguro de que quieres desconectar esta integración?')) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedIntegrations = integrations.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'disconnected' as const,
            config: {},
            lastSync: undefined
          }
        : integration
    );
    
    saveIntegrations(updatedIntegrations);
    setIsLoading(false);
  }, [integrations, saveIntegrations]);

  const syncIntegration = useCallback(async (integrationId: string) => {
    setIsLoading(true);
    
    // Simular sincronización
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedIntegrations = integrations.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            lastSync: new Date()
          }
        : integration
    );
    
    saveIntegrations(updatedIntegrations);
    setIsLoading(false);
  }, [integrations, saveIntegrations]);

  const updateIntegrationConfig = useCallback((integrationId: string, config: IntegrationConfig) => {
    const updatedIntegrations = integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, config: { ...integration.config, ...config } }
        : integration
    );
    
    saveIntegrations(updatedIntegrations);
    setEditingIntegration(null);
  }, [integrations, saveIntegrations]);

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected': return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusText = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'disconnected': return 'Desconectado';
      case 'error': return 'Error';
      case 'pending': return 'Conectando...';
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (minutes < 1440) return `Hace ${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString();
  };

  const categories = ['all', 'productivity', 'analytics', 'communication', 'storage', 'crm'];
  const categoryNames = {
    all: 'Todas',
    productivity: 'Productividad',
    analytics: 'Analytics',
    communication: 'Comunicación',
    storage: 'Almacenamiento',
    crm: 'CRM'
  };

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  return (
    <div className={cn('relative', className)}>
      {/* Integrations Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Zap className="w-6 h-6" />
        {integrations.filter(i => i.status === 'connected').length > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {integrations.filter(i => i.status === 'connected').length}
          </span>
        )}
      </button>

      {/* Integrations Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Integraciones</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors',
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {categoryNames[category as keyof typeof categoryNames]}
                </button>
              ))}
            </div>
          </div>

          {/* Integrations List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredIntegrations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No hay integraciones</p>
              </div>
            ) : (
              filteredIntegrations.map((integration) => (
                <div
                  key={integration.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{integration.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {integration.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={cn(
                            'px-2 py-1 text-xs rounded-full',
                            getStatusColor(integration.status)
                          )}>
                            {getStatusText(integration.status)}
                          </span>
                          {getStatusIcon(integration.status)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {integration.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {integration.features.slice(0, 3).map(feature => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {integration.features.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{integration.features.length - 3} más
                          </span>
                        )}
                      </div>

                      {/* Last Sync */}
                      {integration.lastSync && (
                        <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                          <RefreshCw className="w-3 h-3" />
                          <span>Última sincronización: {formatTime(integration.lastSync)}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-2 mt-3">
                        {integration.status === 'connected' ? (
                          <>
                            <button
                              onClick={() => syncIntegration(integration.id)}
                              disabled={isLoading}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 disabled:opacity-50"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Sincronizar</span>
                            </button>
                            <button
                              onClick={() => setEditingIntegration(integration)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Settings className="w-3 h-3 text-gray-400" />
                            </button>
                            <button
                              onClick={() => disconnectIntegration(integration.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                            >
                              Desconectar
                            </button>
                          </>
                        ) : integration.status === 'disconnected' ? (
                          <button
                            onClick={() => connectIntegration(integration.id)}
                            disabled={isLoading}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Conectar</span>
                          </button>
                        ) : integration.status === 'error' ? (
                          <>
                            <button
                              onClick={() => connectIntegration(integration.id)}
                              disabled={isLoading}
                              className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200 disabled:opacity-50"
                            >
                              Reintentar
                            </button>
                            <button
                              onClick={() => setEditingIntegration(integration)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Settings className="w-3 h-3 text-gray-400" />
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todas las integraciones
            </button>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {editingIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Configurar {editingIntegration.name}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const config: IntegrationConfig = {
                  syncInterval: parseInt(formData.get('syncInterval') as string) || 300,
                  autoSync: formData.get('autoSync') === 'on',
                  customFields: {
                    webhookUrl: formData.get('webhookUrl') as string
                  }
                };
                updateIntegrationConfig(editingIntegration.id, config);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Intervalo de sincronización (segundos)
                    </label>
                    <input
                      type="number"
                      name="syncInterval"
                      defaultValue={editingIntegration.config.syncInterval || 300}
                      min="60"
                      max="3600"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL del Webhook
                    </label>
                    <input
                      type="url"
                      name="webhookUrl"
                      defaultValue={editingIntegration.config.customFields?.webhookUrl || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="autoSync"
                      defaultChecked={editingIntegration.config.autoSync || false}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Sincronización automática</label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingIntegration(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalIntegrations;
