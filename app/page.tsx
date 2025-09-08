"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Home Page Component
 * 
 * Features:
 * - Automatic redirect based on authentication status
 * - Landing page for unauthenticated users
 * - Dashboard redirect for authenticated users
 * - Consistent with AIAIAI Consulting design system
 */
export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard-simple');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Don't render landing page if user is authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AIAIAI Consulting
                </h1>
                <p className="text-sm text-gray-600">
                  Plataforma de Agentes de IA
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar Sesión
              </a>
              <a
                href="/register"
                className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Agentes de IA para
            <span className="text-primary-600"> Emprendedores LATAM</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tú enseñas. Ellos ejecutan. Tú creces. 
            <br />
            La plataforma de agentes de IA más avanzada para emprendedores de Latinoamérica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Comenzar Gratis
            </a>
            <a
              href="/demo"
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-semibold border border-primary-600"
            >
              Ver Demo
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Agentes Inteligentes
            </h3>
            <p className="text-gray-600">
              Agentes de IA especializados que ejecutan tareas complejas de manera autónoma.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics Avanzados
            </h3>
            <p className="text-gray-600">
              Dashboard completo con métricas en tiempo real y análisis predictivo.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Escalabilidad
            </h3>
            <p className="text-gray-600">
              Infraestructura robusta que crece con tu negocio y se adapta a tus necesidades.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para revolucionar tu negocio?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Únete a cientos de emprendedores que ya están usando AIAIAI Consulting
          </p>
          <a
            href="/register"
            className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Comenzar Ahora
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
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
    </div>
  );
}