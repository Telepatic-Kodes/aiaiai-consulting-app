"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  Bot, 
  Save, 
  X,
  Plus,
  Settings,
  Brain,
  Zap,
  Target,
  Database,
  BarChart3
} from 'lucide-react';

interface AgentConfig {
  name: string;
  type: string;
  description: string;
  capabilities: string[];
  trainingData: string;
  performanceTarget: number;
  status: 'active' | 'inactive' | 'training';
}

const agentTypes = [
  { id: 'analisis', name: 'Análisis', icon: BarChart3, description: 'Análisis de datos y reportes' },
  { id: 'estrategia', name: 'Estrategia', icon: Target, description: 'Consultoría estratégica' },
  { id: 'datos', name: 'Datos', icon: Database, description: 'Procesamiento de datos' },
  { id: 'operaciones', name: 'Operaciones', icon: Settings, description: 'Optimización operacional' },
  { id: 'ia', name: 'IA', icon: Brain, description: 'Inteligencia artificial avanzada' },
  { id: 'mercado', name: 'Mercado', icon: Zap, description: 'Análisis de mercado' }
];

const predefinedCapabilities = [
  'Análisis de datos',
  'Generación de reportes',
  'Predicción de tendencias',
  'Optimización de procesos',
  'Análisis de mercado',
  'Consultoría estratégica',
  'Automatización de tareas',
  'Procesamiento de lenguaje natural',
  'Análisis financiero',
  'Gestión de proyectos'
];

export default function NewAgentPage() {
  const router = useRouter();
  const [config, setConfig] = useState<AgentConfig>({
    name: '',
    type: '',
    description: '',
    capabilities: [],
    trainingData: '',
    performanceTarget: 85,
    status: 'training'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleCapabilityToggle = (capability: string) => {
    setConfig(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter(c => c !== capability)
        : [...prev.capabilities, capability]
    }));
  };

  const handleCreateAgent = async () => {
    setIsCreating(true);
    
    // Simular creación del agente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirigir a la página de agentes
    router.push('/agents');
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return config.name.trim() !== '' && config.type !== '';
      case 2:
        return config.description.trim() !== '' && config.capabilities.length > 0;
      case 3:
        return config.trainingData.trim() !== '';
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, title: 'Información Básica', description: 'Nombre y tipo del agente' },
    { number: 2, title: 'Configuración', description: 'Descripción y capacidades' },
    { number: 3, title: 'Entrenamiento', description: 'Datos de entrenamiento' },
    { number: 4, title: 'Revisión', description: 'Confirmar configuración' }
  ];

  return (
    <ProtectedRoute>
      <StandardLayout
        title="Crear Nuevo Agente"
        subtitle="Configura un nuevo agente de IA para tu organización"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        }
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Crear Nuevo Agente</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Configura un nuevo agente de IA para tu equipo</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  currentStep >= step.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                )}>
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.number
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-4 transition-all duration-200",
                    currentStep > step.number
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Información Básica</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre del Agente
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ej: Analista Financiero Senior"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Tipo de Agente
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleInputChange('type', type.id)}
                        className={cn(
                          "p-4 border-2 rounded-lg text-left transition-all duration-200 hover:shadow-md",
                          config.type === type.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <type.icon className={cn(
                            "w-6 h-6",
                            config.type === type.id
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400"
                          )} />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">{type.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configuración</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción del Agente
                  </label>
                  <textarea
                    value={config.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe las funciones principales y objetivos del agente..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Capacidades del Agente
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {predefinedCapabilities.map((capability) => (
                      <button
                        key={capability}
                        onClick={() => handleCapabilityToggle(capability)}
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg transition-all duration-200",
                          config.capabilities.includes(capability)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <span className="text-sm font-medium">{capability}</span>
                        {config.capabilities.includes(capability) ? (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Objetivo de Rendimiento (%)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={config.performanceTarget}
                    onChange={(e) => handleInputChange('performanceTarget', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>60%</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{config.performanceTarget}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Datos de Entrenamiento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Datos de Entrenamiento
                  </label>
                  <textarea
                    value={config.trainingData}
                    onChange={(e) => handleInputChange('trainingData', e.target.value)}
                    placeholder="Proporciona ejemplos, documentos, o datos específicos para entrenar al agente..."
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Consejos para Datos de Entrenamiento</h4>
                      <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Incluye ejemplos específicos de tareas que realizará el agente</li>
                        <li>• Proporciona documentos de referencia y guías de procedimientos</li>
                        <li>• Incluye casos de uso reales y sus soluciones esperadas</li>
                        <li>• Especifica el tono y estilo de comunicación deseado</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Revisión Final</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Configuración del Agente</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre:</span>
                        <p className="text-gray-900 dark:text-gray-100">{config.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo:</span>
                        <p className="text-gray-900 dark:text-gray-100">
                          {agentTypes.find(t => t.id === config.type)?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Objetivo de Rendimiento:</span>
                        <p className="text-gray-900 dark:text-gray-100">{config.performanceTarget}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Capacidades</h3>
                    <div className="space-y-2">
                      {config.capabilities.map((capability) => (
                        <div key={capability} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Descripción</h3>
                  <p className="text-gray-700 dark:text-gray-300">{config.description}</p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Proceso de Entrenamiento</h4>
                      <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-200">
                        El agente será creado y comenzará su proceso de entrenamiento. Este proceso puede tomar entre 15-30 minutos dependiendo de la complejidad de los datos proporcionados.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            
            <div className="flex space-x-3">
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid(currentStep)}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleCreateAgent}
                  disabled={isCreating}
                  className="flex items-center space-x-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creando Agente...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Crear Agente</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </StandardLayout>
    </ProtectedRoute>
  );
}