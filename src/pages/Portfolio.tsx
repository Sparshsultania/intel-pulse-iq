import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, TrendingDown, Shield, PieChart, Calendar, DollarSign } from "lucide-react";

interface PortfolioAsset {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  type: 'stock' | 'crypto';
  riskScore: number;
  lastNews: string;
  nextEarnings?: string;
  dividendYield?: number;
}

export default function Portfolio() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      quantity: 10,
      avgPrice: 720.50,
      currentPrice: 789.45,
      type: 'stock',
      riskScore: 75,
      lastNews: "NVIDIA announces new AI chip breakthrough",
      nextEarnings: "2024-02-21",
      dividendYield: 0.8
    },
    {
      symbol: "SOL",
      name: "Solana",
      quantity: 50,
      avgPrice: 220.00,
      currentPrice: 245.67,
      type: 'crypto',
      riskScore: 85,
      lastNews: "Solana DePIN ecosystem expanding rapidly"
    }
  ]);

  const [newAsset, setNewAsset] = useState({ symbol: "", quantity: "" });

  const totalValue = assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0);
  const totalGainLoss = assets.reduce((sum, asset) => sum + (asset.quantity * (asset.currentPrice - asset.avgPrice)), 0);
  const diversityScore = Math.min(100, assets.length * 15 + (new Set(assets.map(a => a.type)).size * 20));
  const avgRiskScore = assets.reduce((sum, asset) => sum + asset.riskScore, 0) / assets.length || 0;

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive";
    if (score >= 60) return "text-warning";
    return "text-success";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "High Risk";
    if (score >= 60) return "Medium Risk";
    return "Low Risk";
  };

  const handleAddAsset = () => {
    if (!newAsset.symbol || !newAsset.quantity) return;
    
    // Mock data for new assets
    const mockAsset: PortfolioAsset = {
      symbol: newAsset.symbol.toUpperCase(),
      name: `${newAsset.symbol.toUpperCase()} Asset`,
      quantity: parseFloat(newAsset.quantity),
      avgPrice: Math.random() * 500 + 50,
      currentPrice: Math.random() * 500 + 50,
      type: Math.random() > 0.5 ? 'stock' : 'crypto',
      riskScore: Math.floor(Math.random() * 40) + 40,
      lastNews: "Recent market activity showing positive trends"
    };

    setAssets(prev => [...prev, mockAsset]);
    setNewAsset({ symbol: "", quantity: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground">
            Track your investments, risk metrics, and get insights on your holdings
          </p>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
        </Card>

        <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
          <div className="flex items-center gap-2 mb-2">
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm font-medium text-muted-foreground">P&L</span>
          </div>
          <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Diversity Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{diversityScore}/100</p>
        </Card>

        <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Avg Risk</span>
          </div>
          <p className={`text-2xl font-bold ${getRiskColor(avgRiskScore)}`}>
            {avgRiskScore.toFixed(0)}/100
          </p>
        </Card>
      </div>

      {/* Add New Asset */}
      <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add Asset to Portfolio
        </h3>
        <div className="flex gap-4">
          <Input
            placeholder="Symbol (e.g., AAPL, BTC)"
            value={newAsset.symbol}
            onChange={(e) => setNewAsset(prev => ({ ...prev, symbol: e.target.value }))}
            className="flex-1"
          />
          <Input
            placeholder="Quantity"
            type="number"
            value={newAsset.quantity}
            onChange={(e) => setNewAsset(prev => ({ ...prev, quantity: e.target.value }))}
            className="w-32"
          />
          <Button onClick={handleAddAsset} className="px-6">
            Add Asset
          </Button>
        </div>
      </Card>

      {/* Portfolio Holdings */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Your Holdings</h3>
        {assets.map((asset, index) => (
          <Card key={index} className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={asset.type === 'stock' ? 'default' : 'secondary'}>
                    {asset.type.toUpperCase()}
                  </Badge>
                  <h4 className="font-semibold text-foreground">{asset.symbol}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{asset.name}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-semibold text-foreground">{asset.quantity}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="font-semibold text-foreground">${asset.currentPrice.toLocaleString()}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="font-semibold text-foreground">
                  ${(asset.quantity * asset.currentPrice).toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className={`font-semibold ${getRiskColor(asset.riskScore)}`}>
                  {asset.riskScore}/100
                </p>
                <p className={`text-xs ${getRiskColor(asset.riskScore)}`}>
                  {getRiskLabel(asset.riskScore)}
                </p>
              </div>

              <div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {asset.nextEarnings ? `Earnings: ${asset.nextEarnings}` : 'No earnings scheduled'}
                    </span>
                  </div>
                  {asset.dividendYield && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Dividend: {asset.dividendYield}%
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground truncate">
                    {asset.lastNews}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}