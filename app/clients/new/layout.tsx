import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface NewClientLayoutProps {
  children: React.ReactNode;
}

/**
 * New Client Layout Component
 * 
 * Features:
 * - Professional new client layout
 * - Sidebar navigation
 * - Header with actions
 * - Responsive design
 * - Consistent with AIAIAI Consulting design system
 */
export default function NewClientLayout({ children }: NewClientLayoutProps) {
  return (
    <Layout
      title="Nuevo Cliente"
      subtitle="Agrega un nuevo cliente a tu cartera"
      showHeader={true}
      showSidebar={true}
    >
      {children}
    </Layout>
  );
}


