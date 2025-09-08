"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Database, 
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Globe,
  Shield,
  Zap,
  BarChart3,
  MessageCircle,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const agents = [
    {
      name: 'Lead Scorer',
      description: 'Califica y prioriza leads automáticamente',
      icon: TrendingUp,
      price: '$49/mes',
      features: ['1,000 leads/mes', 'Análisis automático', 'Integración CRM']
    },
    {
      name: 'Proposal Builder',
      description: 'Genera propuestas en minutos',
      icon: FileText,
      price: '$79/mes',
      features: ['50 propuestas/mes', 'Templates personalizados', 'Exportación PDF']
    },
    {
      name: 'Meeting Summarizer',
      description: 'Resume reuniones automáticamente',
      icon: Users,
      price: '$39/mes',
      features: ['300 min/mes', 'Extracción de tareas', 'Análisis de sentimientos']
    },
    {
      name: 'CRM Updater',
      description: 'Sincroniza datos automáticamente',
      icon: Database,
      price: '$59/mes',
      features: ['10,000 registros/mes', 'Detección duplicados', 'Validación datos']
    },
    {
      name: 'Follow-up Scheduler',
      description: 'Automatiza seguimientos',
      icon: Calendar,
      price: '$49/mes',
      features: ['500 seguimientos/mes', 'Multi-canal', 'Programación inteligente']
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      company: 'TechStart Chile',
      role: 'CEO',
      content: 'AIAIAI nos ayudó a automatizar nuestro proceso de ventas. Ahora generamos 3x más propuestas en la mitad del tiempo.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Consultoría LATAM',
      role: 'Fundador',
      content: 'El Meeting Summarizer es increíble. Mis equipos son 40% más productivos desde que lo implementamos.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Ana Silva',
      company: 'Digital Agency MX',
      role: 'Directora de Operaciones',
      content: 'La integración con WhatsApp Business fue clave para nuestro mercado. Los clientes responden mucho mejor.',
      rating: 5,
      avatar: '👩‍💻'
    }
  ];

  const stats = [
    { number: '500+', label: 'Emprendedores LATAM' },
    { number: '95%', label: 'Satisfacción del cliente' },
    { number: '3x', label: 'Aumento en productividad' },
    { number: '24/7', label: 'Soporte en español' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AIAIAI Consulting</h1>
                <p className="text-sm text-gray-600">Agentes de IA para LATAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Iniciar Sesión
              </a>
              <a href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium rounded-lg">
                Comenzar Gratis
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Agentes de IA para
              <span className="text-blue-600"> Emprendedores LATAM</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <strong>Tú enseñas. Ellos ejecutan. Tú creces.</strong>
              <br />
              La plataforma de agentes de IA más avanzada para emprendedores de Latinoamérica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="primary"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/register'}
              >
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Sigues perdiendo tiempo en tareas repetitivas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los emprendedores LATAM pierden horas valiosas en procesos manuales que podrían estar automatizados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pérdida de Tiempo</h3>
              <p className="text-gray-600">2-3 horas diarias en tareas que podrían automatizarse</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Oportunidades Perdidas</h3>
              <p className="text-gray-600">Leads que se enfrían por falta de seguimiento oportuno</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipos Sobrecargados</h3>
              <p className="text-gray-600">Personal valioso enfocado en tareas de bajo valor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestra Solución: Agentes de IA Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agentes inteligentes que funcionan como "trabajadores digitales" para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ¿Qué hace diferente a AIAIAI?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Enfoque LATAM</h4>
                    <p className="text-gray-600">Diseñado específicamente para emprendedores latinoamericanos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Integración WhatsApp</h4>
                    <p className="text-gray-600">Comunicación directa con tus clientes en su canal preferido</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Consultoría Incluida</h4>
                    <p className="text-gray-600">No solo software, te acompañamos en la implementación</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Transparencia Total</h4>
                    <p className="text-gray-600">Cada acción queda registrada y es auditable</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Resultados Comprobados</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tiempo ahorrado</span>
                  <span className="font-bold text-green-600">+70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Leads calificados</span>
                  <span className="font-bold text-green-600">+150%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Propuestas generadas</span>
                  <span className="font-bold text-green-600">+300%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Satisfacción cliente</span>
                  <span className="font-bold text-green-600">95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Agentes Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada agente está diseñado para automatizar procesos específicos de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4">
                    <agent.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-500">{agent.price}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{agent.description}</p>
                <ul className="space-y-2 mb-6">
                  {agent.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Detalles
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600">
              Emprendedores LATAM que ya transformaron su negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para revolucionar tu negocio?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Únete a cientos de emprendedores LATAM que ya están usando AIAIAI Consulting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/register'}
            >
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Hablar con un Experto
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
              <span className="text-xl font-bold">AIAIAI Consulting</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tú enseñas. Ellos ejecutan. Tú creces.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 AIAIAI Consulting. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Demo de AIAIAI Consulting</h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Video demo próximamente</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
