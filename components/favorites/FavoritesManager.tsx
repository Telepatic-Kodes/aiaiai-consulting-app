'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Star, Bookmark, Tag, Plus, X, Edit3, Trash2, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Favorite {
  id: string;
  type: 'project' | 'client' | 'agent' | 'report' | 'document' | 'dashboard';
  title: string;
  description: string;
  url: string;
  icon: string;
  tags: string[];
  category: string;
  addedAt: Date;
  isStarred: boolean;
  notes?: string;
}

interface FavoritesManagerProps {
  className?: string;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ className }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFavorite, setEditingFavorite] = useState<Favorite | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data inicial
  const mockFavorites: Favorite[] = [
    {
      id: '1',
      type: 'project',
      title: 'Estrategia Digital 2024',
      description: 'Proyecto de transformación digital',
      url: '/projects/1',
      icon: '📊',
      tags: ['digital', 'estrategia', '2024'],
      category: 'Proyectos',
      addedAt: new Date('2024-01-15'),
      isStarred: true,
      notes: 'Proyecto prioritario para Q1'
    },
    {
      id: '2',
      type: 'client',
      title: 'TechCorp Solutions',
      description: 'Cliente corporativo principal',
      url: '/clients/2',
      icon: '🏢',
      tags: ['corporativo', 'tecnología'],
      category: 'Clientes',
      addedAt: new Date('2024-01-14'),
      isStarred: false
    },
    {
      id: '3',
      type: 'agent',
      title: 'Meeting Summarizer',
      description: 'Agente IA para resumir reuniones',
      url: '/agents/3',
      icon: '🤖',
      tags: ['ia', 'reuniones', 'automatización'],
      category: 'Agentes IA',
      addedAt: new Date('2024-01-13'),
      isStarred: true
    }
  ];

  useEffect(() => {
    // Cargar favoritos desde localStorage
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      setFavorites(mockFavorites);
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: Favorite[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }, []);

  const addToFavorites = useCallback((item: Omit<Favorite, 'id' | 'addedAt'>) => {
    const newFavorite: Favorite = {
      ...item,
      id: `fav-${Date.now()}`,
      addedAt: new Date()
    };
    
    saveFavorites([newFavorite, ...favorites]);
  }, [favorites, saveFavorites]);

  const removeFromFavorites = useCallback((id: string) => {
    saveFavorites(favorites.filter(fav => fav.id !== id));
  }, [favorites, saveFavorites]);

  const toggleStar = useCallback((id: string) => {
    saveFavorites(favorites.map(fav => 
      fav.id === id ? { ...fav, isStarred: !fav.isStarred } : fav
    ));
  }, [favorites, saveFavorites]);

  const updateFavorite = useCallback((updatedFavorite: Favorite) => {
    saveFavorites(favorites.map(fav => 
      fav.id === updatedFavorite.id ? updatedFavorite : fav
    ));
    setEditingFavorite(null);
  }, [favorites, saveFavorites]);

  const categories = ['all', ...Array.from(new Set(favorites.map(f => f.category)))];

  const filteredFavorites = favorites.filter(fav => {
    const matchesCategory = selectedCategory === 'all' || fav.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: Favorite['type']) => {
    switch (type) {
      case 'project': return '📊';
      case 'client': return '🏢';
      case 'agent': return '🤖';
      case 'report': return '📈';
      case 'document': return '📄';
      case 'dashboard': return '📊';
      default: return '⭐';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={cn('relative', className)}>
      {/* Favorites Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bookmark className="w-6 h-6" />
        {favorites.filter(f => f.isStarred).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favorites.filter(f => f.isStarred).length}
          </span>
        )}
      </button>

      {/* Favorites Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Favoritos</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Buscar favoritos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Categories */}
            <div className="flex items-center space-x-2 mt-3 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors',
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {category === 'all' ? 'Todos' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Favorites List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredFavorites.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No hay favoritos</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Agregar favorito
                </button>
              </div>
            ) : (
              filteredFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getTypeIcon(favorite.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {favorite.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleStar(favorite.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Star 
                              className={cn(
                                'w-4 h-4',
                                favorite.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'
                              )} 
                            />
                          </button>
                          <button
                            onClick={() => setEditingFavorite(favorite)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit3 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => removeFromFavorites(favorite.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {favorite.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(favorite.addedAt)}
                        </span>
                        <div className="flex items-center space-x-1">
                          {favorite.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {favorite.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{favorite.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Gestionar todos los favoritos
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingFavorite) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingFavorite ? 'Editar Favorito' : 'Agregar Favorito'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newFavorite = {
                  type: formData.get('type') as Favorite['type'],
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  url: formData.get('url') as string,
                  icon: formData.get('icon') as string,
                  tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
                  category: formData.get('category') as string,
                  isStarred: formData.get('isStarred') === 'on',
                  notes: formData.get('notes') as string
                };

                if (editingFavorite) {
                  updateFavorite({ ...editingFavorite, ...newFavorite });
                } else {
                  addToFavorites(newFavorite);
                }
                setShowAddForm(false);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      name="type"
                      defaultValue={editingFavorite?.type || 'project'}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="project">Proyecto</option>
                      <option value="client">Cliente</option>
                      <option value="agent">Agente</option>
                      <option value="report">Reporte</option>
                      <option value="document">Documento</option>
                      <option value="dashboard">Dashboard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingFavorite?.title || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editingFavorite?.description || ''}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      name="url"
                      defaultValue={editingFavorite?.url || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (separados por comas)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={editingFavorite?.tags.join(', ') || ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isStarred"
                      defaultChecked={editingFavorite?.isStarred || false}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Marcar como favorito</label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingFavorite(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingFavorite ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesManager;
