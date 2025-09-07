import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface NewAgentLayoutProps {
  children: React.ReactNode;
}

/**
 * New Agent Layout Component
 * 
 * Features:
 * - Professional new agent layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewAgentLayout({ children }: NewAgentLayoutProps) {
  return (
    <Layout
      title="Nuevo Agente"
      subtitle="Crea un nuevo agente personalizado para tu negocio"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


