'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CommentsSystem from '@/components/comments/CommentsSystem';
import { 
  Zap, 
  Search, 
  Heart, 
  MessageCircle, 
  Bell, 
  Bookmark,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'notifications',
      title: 'Sistema de Notificaciones Push',
      description: 'Notificaciones en tiempo real con diferentes tipos y acciones personalizables',
      icon: Bell,
      status: 'active',
      features: [
        'Notificaciones push en tiempo real',
        'Diferentes tipos (success, error, warning, info)',
        'Acciones personalizables',
        'Historial de notificaciones',
        'Marcar como leído/no leído'
      ]
    },
    {
      id: 'search',
      title: 'Búsqueda Global Avanzada',
      description: 'Búsqueda inteligente con filtros, historial y acciones rápidas',
      icon: Search,
      status: 'active',
      features: [
        'Búsqueda global con Ctrl+K',
        'Filtros por tipo de contenido',
        'Historial de búsquedas',
        'Acciones rápidas',
        'Resultados con relevancia'
      ]
    },
    {
      id: 'favorites',
      title: 'Sistema de Favoritos',
      description: 'Gestiona tus elementos favoritos con categorías y etiquetas',
      icon: Heart,
      status: 'active',
      features: [
        'Marcar elementos como favoritos',
        'Categorización automática',
        'Sistema de etiquetas',
        'Búsqueda en favoritos',
        'Notas personalizadas'
      ]
    },
    {
      id: 'comments',
      title: 'Sistema de Comentarios',
      description: 'Comentarios colaborativos con respuestas, likes y resolución',
      icon: MessageCircle,
      status: 'active',
      features: [
        'Comentarios anidados',
        'Sistema de likes/dislikes',
        'Marcar como resuelto',
        'Adjuntos de archivos',
        'Menciones de usuarios'
      ]
    },
    {
      id: 'integrations',
      title: 'Integraciones Externas',
      description: 'Conecta con servicios externos como Slack, Google Calendar, Salesforce',
      icon: ExternalLink,
      status: 'active',
      features: [
        'Slack para notificaciones',
        'Google Calendar para eventos',
        'Salesforce CRM',
        'HubSpot marketing',
        'Google Analytics'
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Star },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'search', label: 'Búsqueda', icon: Search },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'comments', label: 'Comentarios', icon: MessageCircle },
    { id: 'integrations', label: 'Integraciones', icon: ExternalLink }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🚀 Nuevas Funcionalidades Avanzadas
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Descubre las últimas mejoras implementadas en AIAIAI Consulting para 
          llevar tu experiencia de consultoría al siguiente nivel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Activo</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab(feature.id)}
                className="w-full"
              >
                Ver Detalles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Beneficios Clave
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Productividad Mejorada</h4>
              <p className="text-sm text-gray-600">Acceso rápido a información y herramientas</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Colaboración Efectiva</h4>
              <p className="text-sm text-gray-600">Comunicación fluida entre equipos</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Integración Completa</h4>
              <p className="text-sm text-gray-600">Conecta con tus herramientas favoritas</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Experiencia Personalizada</h4>
              <p className="text-sm text-gray-600">Adapta la plataforma a tu flujo de trabajo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatureDetail = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (!feature) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <feature.icon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.features.map((feat, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estado</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Activo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Última actualización</span>
                  <span className="text-sm text-gray-900">Hace 2 horas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Usuarios activos</span>
                  <span className="text-sm text-gray-900">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="text-sm text-gray-900">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {featureId === 'comments' && (
          <Card>
            <CardHeader>
              <CardTitle>Demo en Vivo</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentsSystem 
                resourceId="demo-project-1"
                resourceType="project"
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Funcionalidades Avanzadas
          </h1>
          <p className="text-gray-600">
            Explora las nuevas características implementadas en AIAIAI Consulting
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab !== 'overview' && renderFeatureDetail(activeTab)}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Probar Funcionalidades</h3>
              <p className="text-sm text-gray-600 mb-4">
                Explora todas las nuevas características en acción
              </p>
              <Button size="sm" className="w-full">
                Comenzar Demo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Bookmark className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Configurar Favoritos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Personaliza tu experiencia con favoritos
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <ExternalLink className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Conectar Integraciones</h3>
              <p className="text-sm text-gray-600 mb-4">
                Conecta con tus herramientas favoritas
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Conectar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
