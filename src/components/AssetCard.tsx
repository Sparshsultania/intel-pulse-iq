import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AssetCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  iqScore: number;
  volume?: number;
  rsi?: number;
  narrativeSignal?: string;
  type: 'crypto' | 'stock';
}

export const AssetCard = ({ 
  symbol, 
  name, 
  price, 
  change, 
  changePercent, 
  iqScore, 
  volume, 
  rsi,
  narrativeSignal,
  type 
}: AssetCardProps) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const getIQColor = (score: number) => {
    if (score >= 80) return "iq-excellent";
    if (score >= 60) return "iq-high";
    if (score >= 40) return "iq-medium";
    return "iq-low";
  };

  const getIQLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  const getTrendIcon = () => {
    if (isPositive) return <TrendingUp className="w-4 h-4" />;
    if (isNegative) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group cursor-pointer">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">{symbol}</h3>
              <Badge variant="outline" className="text-xs">
                {type.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          
          {/* IQ Score */}
          <div className="text-right">
            <div className={`text-2xl font-bold text-${getIQColor(iqScore)}`}>
              {iqScore}
            </div>
            <p className="text-xs text-muted-foreground">{getIQLabel(iqScore)} IQ</p>
          </div>
        </div>

        {/* Price & Change */}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </div>
          
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-bullish' : isNegative ? 'text-bearish' : 'text-neutral'
          }`}>
            {getTrendIcon()}
            <span>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
          {rsi && (
            <div>
              <p className="text-xs text-muted-foreground">RSI</p>
              <p className="text-sm font-medium">{rsi.toFixed(1)}</p>
            </div>
          )}
          
          {volume && (
            <div>
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="text-sm font-medium">
                {volume >= 1000000 ? `${(volume / 1000000).toFixed(1)}M` : `${(volume / 1000).toFixed(0)}K`}
              </p>
            </div>
          )}
        </div>

        {/* Narrative Signal */}
        {narrativeSignal && (
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground">Narrative Signal</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {narrativeSignal}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};