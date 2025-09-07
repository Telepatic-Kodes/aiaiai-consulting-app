import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
  onFilterClick?: () => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

/**
 * Advanced Search Bar Component
 * 
 * Features:
 * - Real-time search
 * - Filter integration
 * - Search suggestions
 * - Clear functionality
 * - Professional styling
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
  showFilters = false,
  onFilterClick,
  suggestions = [],
  onSuggestionClick
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSuggestionClick(suggestions[focusedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setFocusedIndex(-1);
    onSuggestionClick?.(suggestion);
  };

  const handleClear = () => {
    onChange('');
    setShowSuggestions(false);
    setFocusedIndex(-1);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(value.length > 0)}
          onBlur={() => {
            // Delay hiding suggestions to allow clicks
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          className="block w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {value && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {showFilters && (
            <button
              onClick={onFilterClick}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={cn(
                'cursor-pointer select-none relative py-2 pl-3 pr-9',
                index === focusedIndex
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="block truncate">
                {suggestion}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
