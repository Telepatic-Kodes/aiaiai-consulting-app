import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface ReportsLayoutProps {
  children: React.ReactNode;
}

/**
 * Reports Layout Component
 * 
 * Features:
 * - Professional reports layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function ReportsLayout({ children }: ReportsLayoutProps) {
  return (
    <Layout
      title="Reportes"
      subtitle="Genera y gestiona reportes de rendimiento"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


