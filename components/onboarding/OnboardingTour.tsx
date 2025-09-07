import React from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CheckCircle,
  Bot,
  Users,
  Briefcase,
  BarChart3
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ComponentType<any>;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

/**
 * Onboarding Tour Component
 * 
 * Features:
 * - Step-by-step introduction
 * - Interactive tour
 * - Progress indication
 * - Professional design
 * - Skip functionality
 */
export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: '¡Bienvenido a AIAIAI Consulting!',
      description: 'Tu plataforma de agentes de IA para emprendedores LATAM',
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-primary-600">AI</span>
          </div>
          <p className="text-gray-600">
            Estás a punto de descubrir cómo los agentes de IA pueden revolucionar tu negocio.
            <br />
            <strong>Tú enseñas. Ellos ejecutan. Tú creces.</strong>
          </p>
        </div>
      )
    },
    {
      id: 'agents',
      title: 'Gestión de Agentes',
      description: 'Administra tus agentes de IA especializados',
      icon: Bot,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h4 className="font-semibold text-primary-900 mb-2">Meeting Summarizer</h4>
              <p className="text-sm text-primary-700">Resúmenes automáticos de reuniones</p>
            </div>
            <div className="p-4 bg-accent-50 rounded-lg">
              <h4 className="font-semibold text-accent-900 mb-2">Proposal Builder</h4>
              <p className="text-sm text-accent-700">Generación de propuestas comerciales</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Cada agente está especializado en una tarea específica y puede ejecutarla de manera autónoma.
          </p>
        </div>
      )
    },
    {
      id: 'clients',
      title: 'Gestión de Clientes',
      description: 'Organiza y monitorea tus clientes',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Base de Datos Centralizada</h4>
              <p className="text-sm text-gray-600">Toda la información de tus clientes en un solo lugar</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Mantén un registro completo de tus clientes, sus proyectos y el historial de interacciones.
          </p>
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Seguimiento de Proyectos',
      description: 'Monitorea el progreso de tus proyectos',
      icon: Briefcase,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Implementación Lead Scorer</span>
              <span className="text-sm text-green-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Visualiza el progreso de tus proyectos en tiempo real y mantén a tus clientes informados.
          </p>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics y Reportes',
      description: 'Toma decisiones basadas en datos',
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$47,500</div>
              <div className="text-sm text-green-700">Ingresos del mes</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">32</div>
              <div className="text-sm text-blue-700">Clientes activos</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Accede a métricas detalladas y genera reportes profesionales para tus clientes.
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="lg"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Paso {currentStep + 1} de {steps.length}</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <currentStepData.icon className="h-8 w-8 text-primary-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">
              {currentStepData.description}
            </p>
          </div>

          <div className="py-4">
            {currentStepData.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500"
          >
            Omitir tour
          </Button>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              rightIcon={currentStep === steps.length - 1 ? <CheckCircle className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            >
              {currentStep === steps.length - 1 ? 'Comenzar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
