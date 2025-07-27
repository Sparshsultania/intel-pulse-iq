import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changePercent?: number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  changePercent, 
  icon: Icon, 
  trend,
  className = ""
}: MetricCardProps) => {
  const getTrendColor = () => {
    if (trend === 'up' || (change && change > 0)) return 'text-bullish';
    if (trend === 'down' || (change && change < 0)) return 'text-bearish';
    return 'text-neutral';
  };

  return (
    <Card className={`p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow ${className}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {(change !== undefined || changePercent !== undefined) && (
          <div className={`text-sm font-medium ${getTrendColor()}`}>
            {change !== undefined && (
              <span>
                {change > 0 ? '+' : ''}{change.toFixed(2)}
              </span>
            )}
            {changePercent !== undefined && (
              <span className="ml-1">
                ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%)
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};