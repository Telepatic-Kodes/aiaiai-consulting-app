"use client";

import React from 'react';
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { ThemeToggleWithIcon } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

interface ContentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function ContentLayout({ children, title, subtitle, actions, className }: ContentLayoutProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
              {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggleWithIcon />
            <NotificationSystem />
            {actions}
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className={cn("p-6", className)}>
          {children}
        </div>
      </main>
    </div>
  );
}
