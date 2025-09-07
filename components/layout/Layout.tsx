import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
  className?: string;
}

/**
 * Layout Component
 * 
 * Features:
 * - Professional layout structure
 * - Responsive sidebar
 * - Mobile-friendly navigation
 * - Consistent with AIAIAI Consulting design system
 */
export function Layout({
  children,
  title = 'Dashboard',
  subtitle = 'Bienvenido a AIAIAI Consulting',
  showHeader = true,
  showSidebar = true,
  className = ''
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}

      {/* Main Content */}
      <div className={showSidebar ? 'lg:pl-64' : ''}>
        {/* Header */}
        {showHeader && (
          <Header 
            title={title}
            subtitle={subtitle}
            showActions={true}
          />
        )}

        {/* Mobile Menu Button */}
        {showSidebar && (
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}


