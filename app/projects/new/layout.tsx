import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface NewProjectLayoutProps {
  children: React.ReactNode;
}

/**
 * New Project Layout Component
 * 
 * Features:
 * - Professional new project layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewProjectLayout({ children }: NewProjectLayoutProps) {
  return (
    <Layout
      title="Nuevo Proyecto"
      subtitle="Crea un nuevo proyecto para tu cliente"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


