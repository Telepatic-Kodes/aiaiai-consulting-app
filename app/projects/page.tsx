"use client";

import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function ProjectsPage() {
  return (
    <StandardLayout
      title="Gestión de Proyectos"
      subtitle="Administra y monitorea tus proyectos de IA"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Página de Proyectos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Esta página está funcionando correctamente con el sistema unificado.
        </p>
      </div>
    </StandardLayout>
  );
}