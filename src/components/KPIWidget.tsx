import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // For trend icons

interface KPIWidgetProps {
  title: string;
  value: string | number;
  metricUnit?: string; // e.g., "$", "%"
  trend?: 'up' | 'down' | 'neutral' | number; // Can be a direction or a percentage change
  trendDescription?: string; // e.g., "vs last period"
  icon?: LucideIcon; // Optional icon for the KPI
  className?: string;
}

const TrendIcon: React.FC<{ trend?: 'up' | 'down' | 'neutral' | number }> = ({ trend }) => {
  if (typeof trend === 'number') {
    if (trend > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
  switch (trend) {
    case 'up':
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    case 'down':
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  metricUnit = '',
  trend,
  trendDescription,
  icon: Icon,
  className,
}) => {
  console.log("Rendering KPIWidget:", title, value);
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metricUnit === '$' && metricUnit}
          {displayValue}
          {metricUnit !== '$' && metricUnit && metricUnit !== '%' && ` ${metricUnit}`}
          {metricUnit === '%' && metricUnit}
        </div>
        {trend !== undefined && (
          <div className="text-xs text-muted-foreground flex items-center">
            <TrendIcon trend={trend} />
            <span className="ml-1">
                {typeof trend === 'number' ? `${trend.toFixed(1)}%` : ''} {trendDescription}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default KPIWidget;