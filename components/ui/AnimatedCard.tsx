import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * 🚀 OPTIMIZED Animated Card Component
 * 
 * Features:
 * - GPU-accelerated animations
 * - Memoized for performance
 * - Smooth entrance animations
 * - Hover effects
 * - Directional animations
 * - Staggered delays
 * - Professional micro-interactions
 */
export const AnimatedCard = memo<AnimatedCardProps>(({ 
  children, 
  className, 
  hover = true, 
  delay = 0,
  direction = 'up',
  ...props 
}) => {
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
});

AnimatedCard.displayName = 'AnimatedCard';
