"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  Users,
  Briefcase,
  Bot,
  Star,
  MessageSquare,
  Bell
} from 'lucide-react';
import { demoUser } from '@/lib/demo-user';

/**
 * Demo User Card Component
 * 
 * Displays comprehensive demo user information for testing
 * all functionalities of the AIAIAI Consulting platform.
 */
export default function DemoUserCard() {
  const { personal, company, account, analytics } = demoUser;

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary-600" />
            <span>Usuario Demo - {personal.firstName} {personal.lastName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{personal.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{personal.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{personal.position}</span>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información de Empresa</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{company.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{company.industry}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{company.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">
                  Cuenta {account.status} - Plan {account.plan}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Calendar className="h-4 w-4" />
                <span>Miembro desde {new Date(account.joinDate).toLocaleDateString('es-CL')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.clients.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Proyectos</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.projects.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Agentes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.agents.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.revenue.monthly.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Datos Demo Disponibles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Clientes Demo</p>
                <p className="text-xs text-blue-700">{demoUser.clients.length} clientes con datos completos</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Briefcase className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Proyectos Demo</p>
                <p className="text-xs text-green-700">{demoUser.projects.length} proyectos en diferentes estados</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Bot className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">Agentes Demo</p>
                <p className="text-xs text-purple-700">{demoUser.agents.length} agentes con métricas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Bell className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Notificaciones</p>
                <p className="text-xs text-yellow-700">{demoUser.notifications.length} notificaciones demo</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <Star className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-900">Favoritos</p>
                <p className="text-xs text-red-700">{demoUser.favorites.length} elementos marcados</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-indigo-900">Comentarios</p>
                <p className="text-xs text-indigo-700">{demoUser.comments.length} comentarios demo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas para Probar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/clients'}
            >
              <Users className="h-4 w-4 mr-2" />
              Ver Clientes Demo
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/projects'}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Ver Proyectos Demo
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/agents'}
            >
              <Bot className="h-4 w-4 mr-2" />
              Ver Agentes Demo
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/features'}
            >
              <Star className="h-4 w-4 mr-2" />
              Funcionalidades Avanzadas
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/reports'}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Reportes
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin'}
            >
              <Building className="h-4 w-4 mr-2" />
              Panel de Administración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
