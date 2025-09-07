import React from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import GlobalSearch from '@/components/search/GlobalSearch';
import NotificationSystem from '@/components/notifications/NotificationSystem';
import FavoritesManager from '@/components/favorites/FavoritesManager';
import ExternalIntegrations from '@/components/integrations/ExternalIntegrations';
import { 
  Menu, 
  Bell, 
  Search, 
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Header Component
 * 
 * Features:
 * - Mobile menu toggle
 * - Search functionality
 * - Notifications
 * - User menu
 * - Professional styling
 * - Consistent with AIAIAI Consulting design system
 */
export function Header({ onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Nuevo cliente registrado',
      message: 'María González de TechCorp Chile se ha registrado',
      time: '2 horas',
      unread: true
    },
    {
      id: '2',
      title: 'Proyecto completado',
      message: 'Implementación Lead Scorer - 100% completado',
      time: '4 horas',
      unread: true
    },
    {
      id: '3',
      title: 'Reporte mensual disponible',
      message: 'Reporte de rendimiento de enero está listo',
      time: '1 día',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Global Search */}
            <div className="hidden md:block">
              <GlobalSearch />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Favorites */}
            <FavoritesManager />
            
            {/* Integrations */}
            <ExternalIntegrations />
            
            {/* Notifications */}
            <NotificationSystem />

            {/* User menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  Admin User
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Mi Perfil
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Configuración
                    </a>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        // TODO: Implement logout
                        console.log('Logout');
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}