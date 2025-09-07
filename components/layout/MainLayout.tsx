import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { ToastContainer } from '@/components/ui/Toast';
import { notifications } from '@/lib/notifications';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main Layout Component
 * 
 * Features:
 * - Responsive layout
 * - Header with navigation
 * - Sidebar navigation
 * - Chat widget
 * - Toast notifications
 * - Professional design
 */
export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [toasts, setToasts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const unsubscribe = notifications.subscribe((newToasts) => {
      setToasts(newToasts);
    });

    return unsubscribe;
  }, []);

  const handleToastClose = (id: string) => {
    notifications.remove(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page content */}
        <main className="py-8">
          {children}
        </main>
      </div>

      {/* Chat Widget */}
      <ChatWidget
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onClose={handleToastClose}
      />
    </div>
  );
}
