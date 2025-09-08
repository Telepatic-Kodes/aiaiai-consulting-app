"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  Calendar, 
  Video, 
  Brain, 
  FileText, 
  Search, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  details?: string;
}

export function ProcessSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: 'Agendamiento de Reunión',
      description: 'Se agenda una reunión entre Sueño Andino y AIAIAI Consulting',
      icon: <Calendar className="w-6 h-6" />,
      status: currentStep >= 1 ? 'completed' : currentStep === 0 ? 'active' : 'pending',
      details: `
**Cliente**: Sueño Andino - Agencia de Turismo Sostenible
**Objetivo**: Implementar agentes de IA para automatizar la atención al cliente
**Fecha**: 15 de Enero, 2025 - 10:00 AM
**Duración**: 45 minutos
**Plataforma**: Google Meet
**Participantes**: 
- María González (CEO, Sueño Andino)
- Carlos Mendoza (CTO, Sueño Andino)
- Tomás (Consultor Senior, AIAIAI)
      `
    },
    {
      id: 2,
      title: 'Reunión y Transcripción',
      description: 'La reunión se realiza vía Google Meet y se transcribe automáticamente',
      icon: <Video className="w-6 h-6" />,
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'active' : 'pending',
      details: `
**Transcripción Completa**: 38 minutos de conversación
**Puntos Clave Identificados**:
- 200-300 clientes al mes
- 70% contactan por WhatsApp
- Presupuesto: $2-5M CLP anuales
- Timeline: Antes de octubre 2025
- Necesidades: Automatización, respuesta rápida, escalabilidad

**Minuta Generada**: Documento estructurado con objetivos y próximos pasos
      `
    },
    {
      id: 3,
      title: 'Análisis con Meetintel Agent',
      description: 'Se sube la minuta al Meetintel Agent y se obtienen insights para la propuesta',
      icon: <Brain className="w-6 h-6" />,
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'active' : 'pending',
      details: `
**Insights Generados por IA**:
- **Necesidades**: Automatización de atención, respuesta rápida, sistema integrado
- **Pain Points**: No pueden responder en terreno, pérdida de ventas, sistema básico
- **Objetivos**: Reducir tiempo de respuesta, aumentar conversión, disponibilidad 24/7
- **Tecnología**: WhatsApp Business API, IA conversacional, sistema de reservas
- **Canales**: WhatsApp (70%), Email (20%), Teléfono (10%)
- **Competidores**: ReservasPro, Booking.com, sistemas locales
      `
    },
    {
      id: 4,
      title: 'Generación de Propuesta Técnica',
      description: 'Se genera la propuesta técnica basada en toda la información recopilada',
      icon: <FileText className="w-6 h-6" />,
      status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'active' : 'pending',
      details: `
**Propuesta Técnica Generada**:

**Solución Propuesta**:
- Agente de WhatsApp con IA
- Agente de Email automatizado
- Sistema de reservas integrado
- Panel de administración
- Integración con ReservasPro

**Beneficios Esperados**:
- Reducción del 80% en tiempo de respuesta
- Aumento del 40% en conversión de ventas
- Disponibilidad 24/7 para clientes
- Escalabilidad para crecimiento futuro

**Timeline**: 8 semanas de implementación
      `
    },
    {
      id: 5,
      title: 'Deep Research y Benchmark',
      description: 'Se realiza investigación profunda del mercado chileno y competencia',
      icon: <Search className="w-6 h-6" />,
      status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'active' : 'pending',
      details: `
**Análisis de Mercado en Chile**:

**Precios por Freelancer**:
- Desarrollador Junior: $800K - $1.2M CLP/mes
- Desarrollador Senior: $1.5M - $2.5M CLP/mes
- Consultor IA: $2M - $3.5M CLP/mes
- Proyecto completo: $8M - $15M CLP

**Precios por Agencia**:
- Agencia pequeña: $15M - $25M CLP
- Agencia mediana: $25M - $40M CLP
- Agencia grande: $40M - $80M CLP

**Competidores Identificados**:
- TecnoSoluciones: $20M CLP (6 meses)
- DigitalPro: $35M CLP (4 meses)
- IAChile: $45M CLP (3 meses)
- TechCorp: $60M CLP (2 meses)
      `
    },
    {
      id: 6,
      title: 'Propuesta Comercial Final',
      description: 'Se genera la propuesta comercial competitiva y atractiva',
      icon: <DollarSign className="w-6 h-6" />,
      status: currentStep >= 6 ? 'completed' : currentStep === 5 ? 'active' : 'pending',
      details: `
**Propuesta Comercial Final**:

**Inversión Total**: $18.500.000 CLP

**Incluye**:
- Desarrollo completo del sistema
- Implementación y configuración
- Capacitación del equipo (8 horas)
- Documentación técnica
- 3 meses de soporte gratuito
- Mantenimiento mensual: $800K CLP

**Formas de Pago**:
- Opción 1: 50% al inicio, 50% al final
- Opción 2: 30% al inicio, 40% a la mitad, 30% al final
- Opción 3: 12 cuotas de $1.541.667 CLP

**ROI Esperado**: 300% en el primer año
**Garantías**: 100% de satisfacción garantizada
      `
    }
  ];

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setShowDetails(false);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // 3 segundos por paso
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setShowDetails(false);
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <ContentLayout 
      title="Simulador de Proceso de Consultoría" 
      subtitle="Simula el flujo completo de consultoría AIAIAI"
    >
      {/* Controles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={startSimulation}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Ejecutando...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Simulación
                </>
              )}
            </Button>
            
            <Button 
              onClick={resetSimulation}
              variant="outline"
              disabled={isRunning}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pasos del Proceso */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-500 ${
              step.status === 'active' ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${getStepColor(step.status)}`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    {step.status === 'active' && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">En progreso...</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {step.description}
                  </p>
                  
                  {step.status === 'completed' && step.details && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {step.details}
                      </pre>
                    </div>
                  )}
                </div>
                
                {step.status === 'active' && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen Final */}
      {currentStep >= steps.length - 1 && (
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                ¡Simulación Completada!
              </h3>
            </div>
            
            <p className="text-green-700 dark:text-green-300 mb-4">
              Has completado exitosamente el proceso de consultoría AIAIAI. 
              Este es exactamente el flujo que seguirías con cualquier cliente real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tiempo Total</h4>
                <p className="text-2xl font-bold text-blue-600">2-3 semanas</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Desde el primer contacto hasta la propuesta</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Valor Promedio</h4>
                <p className="text-2xl font-bold text-green-600">$18.5M CLP</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Propuesta típica para PYME</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">ROI Esperado</h4>
                <p className="text-2xl font-bold text-purple-600">300%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Retorno de inversión en el primer año</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </ContentLayout>
  );
}
