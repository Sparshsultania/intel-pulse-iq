import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Volume2, Target, Building, Calendar, DollarSign, BarChart3, Heart } from "lucide-react";
import { mockCryptoData, mockStockData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SentimentGauge } from "@/components/SentimentGauge";

type AssetData = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  iqScore: number;
  volume: number;
  rsi: number;
  narrativeSignal: string;
  narrativeStrength: number;
  type: 'crypto' | 'stock';
  marketCap?: number;
  ebitda?: number;
  peRatio?: number;
  dividendYield?: number;
  eps?: number;
  revenue?: number;
  sentiment?: number;
};

export default function AssetProfiling() {
  const [searchSymbol, setSearchSymbol] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);

  const allAssets = [...mockCryptoData, ...mockStockData];

  const handleSearch = () => {
    if (!searchSymbol.trim()) return;
    
    const asset = allAssets.find(a => 
      a.symbol.toLowerCase() === searchSymbol.toLowerCase()
    );
    
    if (asset) {
      // Add additional data for stocks
      const enhancedAsset: AssetData = {
        ...asset,
        marketCap: asset.type === 'stock' ? asset.price * 1000000000 : asset.volume * 50,
        sentiment: Math.floor(Math.random() * 100) + 1,
        ...(asset.type === 'stock' && {
          ebitda: Math.random() * 50000000000 + 10000000000,
          peRatio: Math.random() * 30 + 10,
          dividendYield: Math.random() * 5,
          eps: Math.random() * 50 + 5,
          revenue: Math.random() * 100000000000 + 20000000000
        })
      };
      setSelectedAsset(enhancedAsset);
    } else {
      setSelectedAsset(null);
    }
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const getIQScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  const getNewsItems = (symbol: string) => [
    `${symbol} shows strong technical momentum amid market volatility`,
    `Analysts upgrade ${symbol} target price following strong fundamentals`,
    `${symbol} institutional buying increases by 15% this quarter`,
    `Market sentiment for ${symbol} remains bullish despite sector headwinds`
  ];

  const generatePriceData = (currentPrice: number) => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1;
      const price = currentPrice * (1 + variation * (i / 30));
      data.push({
        day: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round(price * 100) / 100
      });
    }
    return data;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Asset Profiling</h1>
        <p className="text-muted-foreground">
          Deep dive into any asset with comprehensive analytics, technical indicators, and market insights
        </p>
      </div>

      {/* Search Section */}
      <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Search Asset
        </h3>
        <div className="flex gap-4">
          <Input
            placeholder="Enter symbol (e.g., NVDA, SOL, AAPL)"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} className="px-6">
            <Search className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
      </Card>

      {/* Asset Analysis Results */}
      {selectedAsset && (
        <div className="space-y-6">
          {/* Price Chart */}
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{selectedAsset.symbol}</h2>
                    <Badge variant={selectedAsset.type === 'stock' ? 'default' : 'secondary'}>
                      {selectedAsset.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{selectedAsset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  ${selectedAsset.price.toLocaleString()}
                </p>
                <div className={`flex items-center gap-1 justify-end ${
                  selectedAsset.changePercent > 0 ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <span>{selectedAsset.changePercent > 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generatePriceData(selectedAsset.price)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">IQ Score</p>
                <p className={`text-2xl font-bold ${getIQScoreColor(selectedAsset.iqScore)}`}>
                  {selectedAsset.iqScore}/100
                </p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="text-xl font-bold text-foreground">
                  {formatLargeNumber(selectedAsset.marketCap || 0)}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Volume</p>
                <p className="text-xl font-bold text-foreground">
                  {formatLargeNumber(selectedAsset.volume)}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">RSI</p>
                <p className="text-xl font-bold text-foreground">{selectedAsset.rsi}</p>
              </div>
            </div>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Market Sentiment
            </h3>
            <div className="flex justify-center">
              <SentimentGauge sentiment={selectedAsset.sentiment || 50} />
            </div>
          </Card>

          {/* Technical & Fundamental Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Analysis */}
            <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Technical Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">RSI (14)</span>
                  <span className="font-semibold text-foreground">{selectedAsset.rsi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Narrative Signal</span>
                  <Badge variant="outline">{selectedAsset.narrativeSignal}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Signal Strength</span>
                  <span className="font-semibold text-foreground">{selectedAsset.narrativeStrength}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-semibold text-foreground">{formatLargeNumber(selectedAsset.volume)}</span>
                </div>
              </div>
            </Card>

            {/* Fundamental Analysis (for stocks) */}
            {selectedAsset.type === 'stock' && (
              <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Fundamental Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">P/E Ratio</span>
                    <span className="font-semibold text-foreground">{selectedAsset.peRatio?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">EPS</span>
                    <span className="font-semibold text-foreground">${selectedAsset.eps?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">EBITDA</span>
                    <span className="font-semibold text-foreground">{formatLargeNumber(selectedAsset.ebitda || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold text-foreground">{formatLargeNumber(selectedAsset.revenue || 0)}</span>
                  </div>
                  {selectedAsset.dividendYield && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Dividend Yield</span>
                      <span className="font-semibold text-foreground">{selectedAsset.dividendYield.toFixed(2)}%</span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Recent News */}
          <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent News & Analysis
            </h3>
            <div className="space-y-3">
              {getNewsItems(selectedAsset.symbol).map((news, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-foreground">{news}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(Date.now() - index * 86400000).toLocaleDateString()} • Market Analysis
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {searchSymbol && !selectedAsset && (
        <Card className="p-8 bg-card/30 backdrop-blur-sm border-border/40 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Asset Not Found</h3>
          <p className="text-muted-foreground">
            "{searchSymbol}" was not found in our database. Try searching for popular assets like NVDA, SOL, AAPL, or BTC.
          </p>
        </Card>
      )}
    </div>
  );
}