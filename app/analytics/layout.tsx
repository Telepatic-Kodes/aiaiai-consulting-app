import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

/**
 * Analytics Layout Component
 * 
 * Features:
 * - Professional analytics layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <Layout
      title="Analytics"
      subtitle="Análisis detallado del rendimiento de tus agentes"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


