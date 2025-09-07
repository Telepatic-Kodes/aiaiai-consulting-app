import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

/**
 * Dashboard Layout
 * 
 * Features:
 * - Wraps dashboard pages with main layout
 * - Includes sidebar and header
 * - Consistent navigation
 * - Professional UI/UX
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}