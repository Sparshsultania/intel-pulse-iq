import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

interface LeaderboardItem {
  rank: number;
  symbol: string;
  name: string;
  iqScore: number;
  change: number;
  changePercent: number;
  price: number;
  narrativeStrength?: number;
}

interface LeaderboardProps {
  title: string;
  items: LeaderboardItem[];
  type: 'crypto' | 'stock';
}

export const Leaderboard = ({ title, items, type }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Trophy className={`w-4 h-4 ${
        rank === 1 ? 'text-yellow-500' : 
        rank === 2 ? 'text-gray-400' : 
        'text-amber-600'
      }`} />;
    }
    return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-muted-foreground">
      {rank}
    </span>;
  };

  const getIQColor = (score: number) => {
    if (score >= 80) return "text-iq-excellent";
    if (score >= 60) return "text-iq-high";
    if (score >= 40) return "text-iq-medium";
    return "text-iq-low";
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <Badge variant="outline">{type.toUpperCase()}</Badge>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(item.rank)}
              </div>

              {/* Asset Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{item.symbol}</span>
                  <span className="text-sm text-muted-foreground truncate">{item.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </div>
              </div>

              {/* Change */}
              <div className={`text-right ${
                item.change > 0 ? 'text-bullish' : item.change < 0 ? 'text-bearish' : 'text-neutral'
              }`}>
                <div className="flex items-center gap-1 text-sm font-medium">
                  {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : 
                   item.change < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                  {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
                </div>
              </div>

              {/* IQ Score */}
              <div className="text-right">
                <div className={`text-lg font-bold ${getIQColor(item.iqScore)}`}>
                  {item.iqScore}
                </div>
                <div className="text-xs text-muted-foreground">IQ</div>
              </div>

              {/* Narrative Strength */}
              {item.narrativeStrength && (
                <div className="text-right">
                  <div className="text-sm font-medium text-accent">
                    {item.narrativeStrength}%
                  </div>
                  <div className="text-xs text-muted-foreground">Signal</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};