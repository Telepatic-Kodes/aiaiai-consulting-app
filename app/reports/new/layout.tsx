import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface NewReportLayoutProps {
  children: React.ReactNode;
}

/**
 * New Report Layout Component
 * 
 * Features:
 * - Professional new report layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewReportLayout({ children }: NewReportLayoutProps) {
  return (
    <Layout
      title="Nuevo Reporte"
      subtitle="Genera un reporte personalizado"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}