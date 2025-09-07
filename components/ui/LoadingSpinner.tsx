import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
  text?: string;
}

/**
 * Professional Loading Spinner Component
 * 
 * Features:
 * - Multiple sizes
 * - Color variants
 * - Optional text
 * - Smooth animations
 * - Consistent with AIAIAI Consulting design system
 */
export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'text-primary-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-gray-200 border-t-current',
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        {text && (
          <p className={cn('text-sm font-medium', colorClasses[color])}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
