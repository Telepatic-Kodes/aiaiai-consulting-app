import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface AgentsLayoutProps {
  children: React.ReactNode;
}

/**
 * Agents Layout Component
 * 
 * Features:
 * - Professional agents layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function AgentsLayout({ children }: AgentsLayoutProps) {
  return (
    <Layout
      title="Agentes de IA"
      subtitle="Gestiona y monitorea tus agentes de IA"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


