import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart } from 'lucide-react';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  change?: number;
}

export interface ChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type?: 'line' | 'bar' | 'pie' | 'area';
  height?: number;
  className?: string;
  loading?: boolean;
  showLegend?: boolean;
  showTrend?: boolean;
  format?: 'currency' | 'number' | 'percentage';
}

/**
 * Professional Chart Component
 * 
 * Features:
 * - Multiple chart types (line, bar, pie, area)
 * - Responsive design
 * - Loading states
 * - Trend indicators
 * - Legend support
 * - Consistent with AIAIAI Consulting design system
 */
export const Chart: React.FC<ChartProps> = ({
  title,
  subtitle,
  data,
  type = 'line',
  height = 300,
  className,
  loading = false,
  showLegend = true,
  showTrend = true,
  format = 'number',
}) => {
  const totalValue = data.reduce((sum, point) => sum + point.value, 0);
  const previousTotal = data.reduce((sum, point) => sum + (point.change || 0), 0);
  const trend = totalValue > previousTotal ? 'up' : totalValue < previousTotal ? 'down' : 'neutral';
  const trendPercentage = previousTotal > 0 ? ((totalValue - previousTotal) / previousTotal) * 100 : 0;

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('es-CL').format(value);
    }
  };

  const getChartIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-5 w-5" />;
      case 'pie':
        return <PieChart className="h-5 w-5" />;
      case 'line':
      case 'area':
        return <LineChart className="h-5 w-5" />;
      default:
        return <LineChart className="h-5 w-5" />;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardHeader
          title={title}
          subtitle={subtitle}
        />
        <CardContent>
          <div 
            className="bg-gray-200 rounded-lg flex items-center justify-center"
            style={{ height }}
          >
            <div className="text-gray-400">Cargando gráfico...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader
        title={title}
        subtitle={subtitle}
        action={
          <div className="flex items-center space-x-2">
            {getChartIcon()}
            {showTrend && (
              <div className={cn('flex items-center space-x-1', getTrendColor())}>
                {getTrendIcon()}
                <span className="text-sm font-medium">
                  {trendPercentage > 0 ? '+' : ''}{trendPercentage.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        }
      />
      <CardContent>
        <div 
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg flex items-center justify-center relative overflow-hidden"
          style={{ height }}
        >
          {/* Chart placeholder - In a real implementation, you would use a charting library like Chart.js, Recharts, or D3 */}
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600 font-medium">Gráfico {type}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: {formatValue(totalValue)}
            </p>
          </div>
          
          {/* Simulated chart bars for demo */}
          {type === 'bar' && (
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between space-x-2">
              {data.slice(0, 6).map((point, index) => (
                <div
                  key={index}
                  className="bg-primary-500 rounded-t"
                  style={{
                    height: `${(point.value / Math.max(...data.map(d => d.value))) * 100}%`,
                    width: '12%',
                    minHeight: '20px',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {showLegend && data.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.slice(0, 4).map((point, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: point.color || `hsl(${index * 60}, 70%, 50%)` }}
                />
                <span className="text-sm text-gray-600 truncate">{point.label}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">
                  {formatValue(point.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Specialized chart components
export const RevenueChart: React.FC<Omit<ChartProps, 'format'>> = (props) => (
  <Chart
    {...props}
    format="currency"
    type="line"
  />
);

export const PerformanceChart: React.FC<Omit<ChartProps, 'format'>> = (props) => (
  <Chart
    {...props}
    format="percentage"
    type="bar"
  />
);

export const DistributionChart: React.FC<Omit<ChartProps, 'format'>> = (props) => (
  <Chart
    {...props}
    format="number"
    type="pie"
  />
);