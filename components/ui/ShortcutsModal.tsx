import React from 'react';
import { Modal } from './Modal';
import { keyboardShortcuts, formatShortcut } from '@/lib/keyboard-shortcuts';
import { 
  Keyboard, 
  Search, 
  Navigation, 
  Zap, 
  MessageCircle, 
  Palette,
  HelpCircle,
  X
} from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Shortcuts Modal Component
 * 
 * Features:
 * - Display all available keyboard shortcuts
 * - Categorized shortcuts
 * - Search functionality
 * - Professional design
 * - Responsive layout
 */
export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const shortcuts = keyboardShortcuts.getShortcuts();
  
  const categories = [
    { id: 'all', name: 'Todos', icon: Keyboard },
    { id: 'navigation', name: 'Navegación', icon: Navigation },
    { id: 'actions', name: 'Acciones', icon: Zap },
    { id: 'chat', name: 'Chat', icon: MessageCircle },
    { id: 'theme', name: 'Tema', icon: Palette },
    { id: 'help', name: 'Ayuda', icon: HelpCircle }
  ];

  const filteredShortcuts = shortcuts.filter(shortcut => {
    const matchesSearch = shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shortcut.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shortcut.context === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (context: string) => {
    const category = categories.find(cat => cat.id === context);
    return category ? category.icon : Keyboard;
  };

  const getCategoryName = (context: string) => {
    const category = categories.find(cat => cat.id === context);
    return category ? category.name : 'Otros';
  };

  const groupedShortcuts = filteredShortcuts.reduce((acc, shortcut) => {
    const category = shortcut.context || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Atajos de Teclado"
      size="xl"
    >
      <div className="space-y-6">
        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar atajos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-6">
          {Object.keys(groupedShortcuts).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Keyboard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No se encontraron atajos que coincidan con tu búsqueda</p>
            </div>
          ) : (
            Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => {
              const CategoryIcon = getCategoryIcon(category);
              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                    <CategoryIcon className="h-5 w-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getCategoryName(category)}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {shortcut.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          {formatShortcut(shortcut).split(' + ').map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              <kbd className="px-2 py-1 text-xs font-mono bg-white border border-gray-300 rounded shadow-sm">
                                {key}
                              </kbd>
                              {keyIndex < formatShortcut(shortcut).split(' + ').length - 1 && (
                                <span className="text-gray-400">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Presiona <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded">?</kbd> para abrir este modal
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Cerrar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
