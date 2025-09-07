'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Clock, FileText, Users, BarChart3, Settings, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchResult {
  id: string;
  type: 'project' | 'client' | 'agent' | 'report' | 'document' | 'user';
  title: string;
  description: string;
  url: string;
  category: string;
  lastModified: Date;
  relevance: number;
}

interface GlobalSearchProps {
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data para búsqueda
  const mockData: SearchResult[] = [
    {
      id: '1',
      type: 'project',
      title: 'Estrategia Digital 2024',
      description: 'Proyecto de transformación digital para empresa retail',
      url: '/projects/1',
      category: 'Proyectos',
      lastModified: new Date('2024-01-15'),
      relevance: 0.95
    },
    {
      id: '2',
      type: 'client',
      title: 'TechCorp Solutions',
      description: 'Cliente corporativo especializado en tecnología',
      url: '/clients/2',
      category: 'Clientes',
      lastModified: new Date('2024-01-14'),
      relevance: 0.88
    },
    {
      id: '3',
      type: 'agent',
      title: 'Meeting Summarizer',
      description: 'Agente IA para resumir reuniones automáticamente',
      url: '/agents/3',
      category: 'Agentes IA',
      lastModified: new Date('2024-01-13'),
      relevance: 0.82
    },
    {
      id: '4',
      type: 'report',
      title: 'Análisis de Mercado Q1 2024',
      description: 'Reporte completo del análisis de mercado del primer trimestre',
      url: '/reports/4',
      category: 'Reportes',
      lastModified: new Date('2024-01-12'),
      relevance: 0.75
    },
    {
      id: '5',
      type: 'document',
      title: 'Propuesta Comercial Template',
      description: 'Plantilla estándar para propuestas comerciales',
      url: '/documents/5',
      category: 'Documentos',
      lastModified: new Date('2024-01-11'),
      relevance: 0.70
    }
  ];

  // Abrir búsqueda con Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Búsqueda con debounce
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simular delay de búsqueda
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filteredResults = mockData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => b.relevance - a.relevance);

    setResults(filteredResults);
    setIsLoading(false);
  }, []);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Agregar a búsquedas recientes
    setRecentSearches(prev => {
      const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
    
    // Navegar al resultado
    window.location.href = result.url;
    setIsOpen(false);
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'client': return <Users className="w-4 h-4 text-green-500" />;
      case 'agent': return <Settings className="w-4 h-4 text-purple-500" />;
      case 'report': return <BarChart3 className="w-4 h-4 text-orange-500" />;
      case 'document': return <FileText className="w-4 h-4 text-gray-500" />;
      case 'user': return <Users className="w-4 h-4 text-indigo-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString();
  };

  // Cargar búsquedas recientes
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  return (
    <div className={cn('relative', className)} ref={searchRef}>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Buscar...</span>
        <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-gray-200 text-xs rounded">
          Ctrl+K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar proyectos, clientes, agentes, reportes..."
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Buscando...</p>
                </div>
              ) : query ? (
                results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={cn(
                          'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3',
                          selectedIndex === index && 'bg-blue-50'
                        )}
                      >
                        {getTypeIcon(result.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {result.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTime(result.lastModified)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {result.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {result.category}
                            </span>
                            <span className="text-xs text-blue-600">
                              {Math.round(result.relevance * 100)}% relevancia
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No se encontraron resultados para "{query}"</p>
                  </div>
                )
              ) : (
                <div className="py-2">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="px-4 py-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Búsquedas recientes</h3>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="w-full px-2 py-2 text-left hover:bg-gray-50 rounded flex items-center space-x-2"
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Acciones rápidas</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="p-3 text-left hover:bg-gray-50 rounded border border-gray-200">
                        <FileText className="w-5 h-5 text-blue-500 mb-2" />
                        <div className="text-sm font-medium">Nuevo Proyecto</div>
                        <div className="text-xs text-gray-500">Crear proyecto</div>
                      </button>
                      <button className="p-3 text-left hover:bg-gray-50 rounded border border-gray-200">
                        <Users className="w-5 h-5 text-green-500 mb-2" />
                        <div className="text-sm font-medium">Nuevo Cliente</div>
                        <div className="text-xs text-gray-500">Agregar cliente</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
