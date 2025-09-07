import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface ClientsLayoutProps {
  children: React.ReactNode;
}

/**
 * Clients Layout Component
 * 
 * Features:
 * - Professional clients layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function ClientsLayout({ children }: ClientsLayoutProps) {
  return (
    <Layout
      title="Clientes"
      subtitle="Gestiona tu cartera de clientes"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


