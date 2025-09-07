import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Professional Input Component
 * 
 * Features:
 * - Label and helper text support
 * - Error state handling
 * - Left and right icon support
 * - Full width option
 * - Accessibility compliant
 * - Consistent with AIAIAI Consulting design system
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    const inputClasses = cn(
      // Base styles
      'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
      'placeholder:text-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
      'transition-colors duration-200',
      
      // Error state
      hasError && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      
      // Icon padding
      hasLeftIcon && 'pl-10',
      hasRightIcon && 'pr-10',
      
      // Full width
      fullWidth && 'w-full',
      
      className
    );

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Specialized input variants
export const SearchInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    {...props}
    type="search"
    placeholder="Buscar..."
  />
);

export const EmailInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    {...props}
    type="email"
    placeholder="correo@ejemplo.com"
  />
);

export const PasswordInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    {...props}
    type="password"
    placeholder="••••••••"
  />
);

export const NumberInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    {...props}
    type="number"
    placeholder="0"
  />
);

export const UrlInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    {...props}
    type="url"
    placeholder="https://ejemplo.com"
  />
);