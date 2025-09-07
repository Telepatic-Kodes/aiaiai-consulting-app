import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

/**
 * Projects Layout Component
 * 
 * Features:
 * - Professional projects layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <Layout
      title="Proyectos"
      subtitle="Gestiona y monitorea tus proyectos"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


