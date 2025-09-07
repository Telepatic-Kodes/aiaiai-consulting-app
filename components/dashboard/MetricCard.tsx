import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn, formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeType?: 'currency' | 'number' | 'percentage';
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  loading?: boolean;
  format?: 'auto' | 'currency' | 'number' | 'percentage';
  precision?: number;
}

/**
 * Professional Metric Card Component
 * 
 * Features:
 * - Clean, minimal design
 * - Trend indicators with icons
 * - Multiple value formats
 * - Professional styling
 * - Responsive layout
 * - Loading state
 * - Consistent with AIAIAI Consulting design system
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'number',
  icon: Icon,
  trend,
  className,
  loading = false,
  format = 'auto',
  precision = 1,
}) => {
  const formatValue = (val: number | string, type: string) => {
    if (typeof val === 'string') return val;
    
    switch (type) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val, precision);
      default:
        return formatNumber(val);
    }
  };
  
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };
  
  const getTrendColor = () => {
    if (!trend) return 'text-gray-600';
    
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendBackground = () => {
    if (!trend) return 'bg-gray-50';
    
    switch (trend) {
      case 'up':
        return 'bg-green-50';
      case 'down':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn('hover:shadow-lg transition-all duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatValue(value, format === 'auto' ? changeType : format)}
            </p>
            
            {change !== undefined && (
              <div className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                getTrendBackground()
              )}>
                {getTrendIcon()}
                <span className={cn('ml-1', getTrendColor())}>
                  {change > 0 ? '+' : ''}{formatValue(change, changeType)}
                </span>
                <span className="ml-1 text-gray-500">vs mes anterior</span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Predefined metric card variants
export const RevenueMetricCard: React.FC<Omit<MetricCardProps, 'changeType' | 'format'>> = (props) => (
  <MetricCard
    {...props}
    changeType="currency"
    format="currency"
  />
);

export const PercentageMetricCard: React.FC<Omit<MetricCardProps, 'changeType' | 'format'>> = (props) => (
  <MetricCard
    {...props}
    changeType="percentage"
    format="percentage"
  />
);

export const NumberMetricCard: React.FC<Omit<MetricCardProps, 'changeType' | 'format'>> = (props) => (
  <MetricCard
    {...props}
    changeType="number"
    format="number"
  />
);