import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

/**
 * Settings Layout Component
 * 
 * Features:
 * - Professional settings layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Layout
      title="Configuración"
      subtitle="Gestiona tu cuenta y preferencias"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


