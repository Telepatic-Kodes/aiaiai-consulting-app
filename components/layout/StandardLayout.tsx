"use client";

import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { ThemeToggleWithIcon } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

interface StandardLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function StandardLayout({ 
  children, 
  className,
  title,
  subtitle,
  showSearch = true,
  actions
}: StandardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                {title && (
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            
            {/* Top Bar Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggleWithIcon />
              
              {/* Notifications */}
              <NotificationSystem />
              
              {/* Search */}
              {showSearch && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              )}

              {/* Custom Actions */}
              {actions}
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className={cn("p-6", className)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
