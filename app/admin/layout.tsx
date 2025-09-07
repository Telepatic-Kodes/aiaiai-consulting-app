import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

/**
 * Admin Layout
 * 
 * Features:
 * - Wraps admin pages with main layout
 * - Includes sidebar and header
 * - Admin-specific navigation
 * - Professional UI/UX
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
