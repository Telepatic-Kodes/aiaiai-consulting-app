"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChartData {
  label: string;
  value: number;
  color: string;
  change?: number;
}

interface InteractiveChartProps {
  data: ChartData[];
  title: string;
  type?: 'line' | 'bar' | 'area' | 'donut';
  className?: string;
  height?: number;
}

export function InteractiveChart({ 
  data, 
  title, 
  type = 'line', 
  className,
  height = 300 
}: InteractiveChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / (maxValue - minValue)) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area under the line */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#gradient)"
            className="text-blue-500"
            style={{
              opacity: animationProgress,
              transform: `scaleY(${animationProgress})`,
              transformOrigin: 'bottom'
            }}
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-600"
            style={{
              strokeDasharray: '100',
              strokeDashoffset: `${100 - animationProgress * 100}`,
              transition: 'stroke-dashoffset 1s ease-out'
            }}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / (maxValue - minValue)) * 80;
            const isHovered = hoveredIndex === index;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={isHovered ? "2" : "1"}
                fill="currentColor"
                className={cn(
                  "text-blue-600 transition-all duration-200 cursor-pointer",
                  isHovered && "text-blue-800"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: animationProgress,
                  transform: `scale(${animationProgress})`
                }}
              />
            );
          })}
        </svg>
        
        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div 
            className="absolute bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none z-10"
            style={{
              left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
              top: '10%',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-center">
              <div className="font-semibold">{data[hoveredIndex].label}</div>
              <div className="text-blue-300 dark:text-blue-600">
                {data[hoveredIndex].value.toLocaleString()}
              </div>
              {data[hoveredIndex].change && (
                <div className={cn(
                  "text-xs",
                  data[hoveredIndex].change! > 0 ? "text-green-300 dark:text-green-600" : "text-red-300 dark:text-red-600"
                )}>
                  {data[hoveredIndex].change! > 0 ? '+' : ''}{data[hoveredIndex].change}%
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBarChart = () => {
    return (
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full flex flex-col items-center">
                <div
                  className={cn(
                    "w-full rounded-t transition-all duration-500 ease-out",
                    item.color,
                    isHovered && "opacity-80"
                  )}
                  style={{
                    height: `${height * animationProgress}%`,
                    minHeight: '4px'
                  }}
                />
                
                {/* Value label */}
                <div className={cn(
                  "text-xs font-medium mt-1 transition-opacity duration-200",
                  isHovered ? "opacity-100" : "opacity-0"
                )}>
                  {item.value.toLocaleString()}
                </div>
              </div>
              
              {/* X-axis label */}
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDonutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const startAngle = (cumulativePercentage / 100) * 360;
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
            
            const radius = 35;
            const innerRadius = 25;
            
            const startAngleRad = (startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 50 + radius * Math.cos(startAngleRad);
            const y1 = 50 + radius * Math.sin(startAngleRad);
            const x2 = 50 + radius * Math.cos(endAngleRad);
            const y2 = 50 + radius * Math.sin(endAngleRad);
            
            const x3 = 50 + innerRadius * Math.cos(endAngleRad);
            const y3 = 50 + innerRadius * Math.sin(endAngleRad);
            const x4 = 50 + innerRadius * Math.cos(startAngleRad);
            const y4 = 50 + innerRadius * Math.sin(startAngleRad);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            const pathData = [
              `M ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `L ${x3} ${y3}`,
              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
              'Z'
            ].join(' ');
            
            cumulativePercentage += percentage;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="transition-all duration-500 ease-out hover:opacity-80 cursor-pointer"
                style={{
                  opacity: animationProgress,
                  transform: `scale(${animationProgress})`,
                  transformOrigin: 'center'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute -bottom-8 left-0 right-0 flex flex-wrap justify-center gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-1 text-xs transition-opacity duration-200",
                hoveredIndex === null || hoveredIndex === index ? "opacity-100" : "opacity-50"
              )}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'donut':
        return renderDonutChart();
      case 'line':
      case 'area':
      default:
        return renderLineChart();
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {hoveredIndex !== null && data[hoveredIndex].change && (
          <div className={cn(
            "text-sm font-medium",
            data[hoveredIndex].change! > 0 ? "text-green-600" : "text-red-600"
          )}>
            {data[hoveredIndex].change! > 0 ? '+' : ''}{data[hoveredIndex].change}%
          </div>
        )}
      </div>
      
      <div 
        className="relative"
        style={{ height: `${height}px` }}
      >
        {renderChart()}
      </div>
    </div>
  );
}
