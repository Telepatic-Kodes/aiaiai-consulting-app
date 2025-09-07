import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Home,
  Bot,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar Component
 * 
 * Features:
 * - Responsive navigation
 * - Active state management
 * - Mobile-friendly
 * - Professional styling
 * - Consistent with AIAIAI Consulting design system
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: activeItem === 'dashboard'
    },
    {
      name: 'Funcionalidades',
      href: '/features',
      icon: Zap,
      current: activeItem === 'features'
    },
    {
      name: 'Agentes',
      href: '/agents',
      icon: Bot,
      current: activeItem === 'agents',
      children: [
        { name: 'Todos los Agentes', href: '/agents' },
        { name: 'Crear Agente', href: '/agents/new' }
      ]
    },
    {
      name: 'Clientes',
      href: '/clients',
      icon: Users,
      current: activeItem === 'clients',
      children: [
        { name: 'Todos los Clientes', href: '/clients' },
        { name: 'Nuevo Cliente', href: '/clients/new' }
      ]
    },
    {
      name: 'Proyectos',
      href: '/projects',
      icon: Briefcase,
      current: activeItem === 'projects',
      children: [
        { name: 'Todos los Proyectos', href: '/projects' },
        { name: 'Nuevo Proyecto', href: '/projects/new' }
      ]
    },
    {
      name: 'Reportes',
      href: '/reports',
      icon: FileText,
      current: activeItem === 'reports',
      children: [
        { name: 'Analytics', href: '/reports' },
        { name: 'Generar Reporte', href: '/reports/new' }
      ]
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      current: activeItem === 'analytics'
    },
    {
      name: 'Administración',
      href: '/admin',
      icon: Settings,
      current: activeItem === 'admin'
    },
    {
      name: 'Configuración',
      href: '/settings',
      icon: Settings,
      current: activeItem === 'settings'
    }
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.name.toLowerCase().replace(' ', '_'));
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  AIAIAI
                </h1>
                <p className="text-xs text-gray-600">
                  Consulting
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    item.current
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                    )}
                  />
                  {item.name}
                  {item.children && (
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                  )}
                </a>

                {/* Submenu */}
                {item.children && item.current && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Nuestro equipo está aquí para ayudarte con cualquier pregunta.
              </p>
              <button className="w-full bg-primary-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Contactar Soporte
              </button>
            </div>
            
            {/* AIAIAI Consulting Branding */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-1 text-gray-500">
                <span className="text-xs">Powered by</span>
                <span className="text-xs font-semibold text-primary-600">AIAIAI Consulting</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tú enseñas. Ellos ejecutan. Tú creces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}