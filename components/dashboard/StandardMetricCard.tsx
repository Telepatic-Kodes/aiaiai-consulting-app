"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StandardMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  className?: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    value: 'text-blue-600 dark:text-blue-400',
    change: 'text-green-600 dark:text-green-400'
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    value: 'text-green-600 dark:text-green-400',
    change: 'text-green-600 dark:text-green-400'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    value: 'text-purple-600 dark:text-purple-400',
    change: 'text-green-600 dark:text-green-400'
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-600 dark:text-yellow-400',
    value: 'text-yellow-600 dark:text-yellow-400',
    change: 'text-green-600 dark:text-green-400'
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    value: 'text-red-600 dark:text-red-400',
    change: 'text-red-600 dark:text-red-400'
  }
};

export function StandardMetricCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  description,
  color = 'blue',
  className
}: StandardMetricCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <p className={cn("text-3xl font-bold mt-2", colors.value)}>
            {value}
          </p>
          {change && (
            <p className={cn(
              "text-sm mt-1",
              changeType === 'positive' ? colors.change : 
              changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            )}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg)}>
          <Icon className={cn("w-6 h-6", colors.text)} />
        </div>
      </div>
    </div>
  );
}
