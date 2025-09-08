import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Professional Button Component
 * 
 * Features:
 * - Multiple variants and sizes
 * - Loading state with spinner
 * - Icon support (left and right)
 * - Full width option
 * - Accessibility compliant
 * - Consistent with AIAIAI Consulting design system
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden',
    ];

    const variantClasses = {
      primary: [
        'bg-blue-600 text-white dark:bg-blue-700',
        'hover:bg-blue-700 dark:hover:bg-blue-800 focus:ring-blue-500',
        'shadow-sm hover:shadow-md transition-all duration-200',
      ],
      secondary: [
        'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
        'hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
        'border border-gray-300 dark:border-gray-600',
      ],
      outline: [
        'border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400',
        'hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
        'bg-transparent',
      ],
      ghost: [
        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:ring-gray-500',
        'bg-transparent',
      ],
      destructive: [
        'bg-red-600 text-white dark:bg-red-700',
        'hover:bg-red-700 dark:hover:bg-red-800 focus:ring-red-500',
        'shadow-sm hover:shadow-md transition-all duration-200',
      ],
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClasses,
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        
        {children}
        
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Button variants for easy access
export const ButtonVariants = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
} as const;

export const ButtonSizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;