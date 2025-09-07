import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Animated Card Component
 * 
 * Features:
 * - Smooth entrance animations
 * - Hover effects
 * - Directional animations
 * - Staggered delays
 * - Professional micro-interactions
 */
export function AnimatedCard({ 
  children, 
  className, 
  hover = true, 
  delay = 0,
  direction = 'up',
  ...props 
}: AnimatedCardProps) {
  const directionClasses = {
    up: 'animate-slide-up',
    down: 'animate-slide-down',
    left: 'animate-slide-left',
    right: 'animate-slide-right'
  };

  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        directionClasses[direction],
        hoverClasses,
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
