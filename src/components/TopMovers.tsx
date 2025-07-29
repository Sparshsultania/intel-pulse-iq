import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTopMovers } from "@/hooks/useApiData";

export function TopMovers() {
  const { data: topMoversData, loading, error } = useTopMovers(4);
  
  // Separate crypto and stocks
  const topCrypto = topMoversData.filter(asset => asset.type === 'crypto').slice(0, 2);
  const topStocks = topMoversData.filter(asset => asset.type === 'stock').slice(0, 2);

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Top Movers
          </h2>
        </div>
        <p className="text-muted-foreground">Loading market data...</p>
      </div>
    );
  }

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "BTC" || symbol === "ETH" || price > 10) {
      return `$${price.toLocaleString()}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = changePercent > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
        <Icon className="h-3 w-3" />
        <span className="text-sm font-medium">
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      </div>
    );
  };

  const renderAssetCard = (asset: any, type: 'crypto' | 'stock') => (
    <Card key={asset.symbol} className="p-3 bg-card/40 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">{asset.symbol}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{asset.symbol}</p>
            <p className="text-xs text-muted-foreground">{asset.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-foreground">
            {formatPrice(asset.price, asset.symbol)}
          </p>
          {formatChange(asset.change, asset.changePercent)}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Top Movers
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Crypto
          </h3>
          <div className="space-y-2">
            {topCrypto.map(asset => renderAssetCard(asset, 'crypto'))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Stocks
          </h3>
          <div className="space-y-2">
            {topStocks.map(asset => renderAssetCard(asset, 'stock'))}
          </div>
        </div>
      </div>
    </div>
  );
}