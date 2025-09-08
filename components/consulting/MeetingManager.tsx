"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  Calendar, 
  Plus, 
  Clock, 
  Users, 
  Video,
  FileText,
  Brain,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Download
} from 'lucide-react';
import { Meeting, MeetingInsights } from '@/types/consulting';

// Mock data para demostración
const mockMeetings: Meeting[] = [
  {
    id: '1',
    clientId: '1',
    title: 'Reunión Inicial - Sueño Andino',
    date: new Date('2025-01-15T10:00:00'),
    duration: 45,
    platform: 'google_meet',
    participants: ['María González', 'Carlos Mendoza', 'Tomás'],
    transcription: `[10:00] Tomás: Buenos días, gracias por aceptar esta reunión. ¿Cómo están?
[10:01] María: Hola Tomás, muy bien. Estamos muy interesados en conocer cómo la IA puede ayudarnos...
[10:02] Carlos: Sí, tenemos muchos clientes que nos escriben por WhatsApp y email...`,
    minutes: `## Minuta de Reunión - Sueño Andino
### Participantes
- María González (CEO, Sueño Andino)
- Carlos Mendoza (CTO, Sueño Andino)
- Tomás (Consultor Senior, AIAIAI)

### Puntos Clave
1. **Necesidades identificadas**: Automatización de atención al cliente
2. **Canales principales**: WhatsApp (70%), Email (20%), Teléfono (10%)
3. **Presupuesto**: $2-5M CLP anuales
4. **Timeline**: Implementación antes de octubre 2025
5. **Objetivos**: Reducir tiempo de respuesta, aumentar conversión`,
    insights: {
      id: '1',
      meetingId: '1',
      needs: ['Automatización de atención al cliente', 'Respuesta rápida en WhatsApp', 'Sistema de reservas integrado'],
      painPoints: ['No pueden responder rápido en terreno', 'Pérdida de ventas por demora', 'Sistema actual muy básico'],
      objectives: ['Reducir tiempo de respuesta', 'Aumentar conversión de ventas', 'Disponibilidad 24/7'],
      budget: { min: 2000000, max: 5000000, currency: 'CLP' },
      timeline: 'Antes de octubre 2025',
      technology: ['WhatsApp Business API', 'Sistema de reservas', 'IA conversacional'],
      channels: { whatsapp: 70, email: 20, phone: 10 },
      competitors: ['ReservasPro', 'Booking.com', 'Sistemas locales'],
      generatedAt: new Date('2025-01-15T11:00:00')
    },
    status: 'completed',
    createdAt: new Date('2025-01-10')
  },
  {
    id: '2',
    clientId: '2',
    title: 'Seguimiento - TechStart Chile',
    date: new Date('2025-01-20T14:00:00'),
    duration: 30,
    platform: 'zoom',
    participants: ['Carlos Mendoza', 'Tomás'],
    status: 'scheduled',
    createdAt: new Date('2025-01-12')
  }
];

export function MeetingManager() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google_meet': return '🎥';
      case 'zoom': return '📹';
      case 'teams': return '👥';
      case 'presencial': return '🏢';
      default: return '📞';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const generateInsights = (meeting: Meeting) => {
    // Simular generación de insights con IA
    const insights: MeetingInsights = {
      id: `insights-${meeting.id}`,
      meetingId: meeting.id,
      needs: ['Automatización de procesos', 'Mejora de eficiencia', 'Escalabilidad'],
      painPoints: ['Procesos manuales', 'Falta de integración', 'Tiempo de respuesta lento'],
      objectives: ['Automatizar tareas repetitivas', 'Mejorar experiencia del cliente', 'Aumentar productividad'],
      budget: { min: 3000000, max: 8000000, currency: 'CLP' },
      timeline: 'Q2 2025',
      technology: ['IA Conversacional', 'Automatización', 'Integración de sistemas'],
      channels: { whatsapp: 60, email: 30, web: 10 },
      competitors: ['Competidor A', 'Competidor B', 'Competidor C'],
      generatedAt: new Date()
    };

    setMeetings(prev => prev.map(m => 
      m.id === meeting.id ? { ...m, insights } : m
    ));
  };

  return (
    <ContentLayout 
      title="Gestión de Reuniones" 
      subtitle="Administra tus reuniones y análisis de clientes"
      actions={
        <Button onClick={() => setShowNewMeetingForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Reunión
        </Button>
      }
    >
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Reuniones Programadas"
          value={meetings.filter(m => m.status === 'scheduled').length}
          icon={Calendar}
          color="blue"
          change="+2 esta semana"
          changeType="positive"
        />
        <StandardMetricCard
          title="Reuniones Completadas"
          value={meetings.filter(m => m.status === 'completed').length}
          icon={CheckCircle}
          color="green"
          change="+5 este mes"
          changeType="positive"
        />
        <StandardMetricCard
          title="Tiempo Promedio"
          value={`${Math.round(meetings.reduce((sum, m) => sum + m.duration, 0) / meetings.length)} min`}
          icon={Clock}
          color="purple"
          change="-5 min vs mes anterior"
          changeType="positive"
        />
        <StandardMetricCard
          title="Insights Generados"
          value={meetings.filter(m => m.insights).length}
          icon={Brain}
          color="yellow"
          change="+3 esta semana"
          changeType="positive"
        />
      </div>

      {/* Lista de Reuniones */}
      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {meeting.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {getStatusText(meeting.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(meeting.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meeting.duration} minutos
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{getPlatformIcon(meeting.platform)}</span>
                      {meeting.platform.replace('_', ' ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Users className="w-4 h-4" />
                    <span>{meeting.participants.join(', ')}</span>
                  </div>
                  
                  {meeting.insights && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm font-medium">Insights generados</span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        {meeting.insights.needs.length} necesidades identificadas
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {meeting.status === 'completed' && !meeting.insights && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateInsights(meeting)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Brain className="w-4 h-4 mr-1" />
                      Generar Insights
                    </Button>
                  )}
                  
                  {meeting.transcription && (
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {meeting.status === 'scheduled' && (
                    <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {meetings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay reuniones programadas
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Comienza programando tu primera reunión con un cliente
          </p>
        </div>
      )}
    </ContentLayout>
  );
}
