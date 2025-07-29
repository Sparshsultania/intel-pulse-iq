import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, TrendingUp, TrendingDown, Star, Award, Target, Zap, Activity, Brain, Info, Users, ChevronRight, Plus, Scan, BarChart3, Volume2, AlertTriangle, Clock, Filter, Search } from "lucide-react";
import { useLeaderboard } from "@/hooks/useApiData";

interface StockPick {
  symbol: string;
  name: string;
  iqScore: number;
  stockRank: number;
  technicalRating: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";
  price: number;
  change: number;
  changePercent: number;
  aiConfidence: number;
  marketCap: string;
  sector: string;
  signal: string;
  ratingChange?: "Upgraded" | "Downgraded" | "New";
  aiPickerCount: number;
  methodology: "Technical" | "Fundamental" | "Sentiment" | "Hybrid" | "Momentum";
}

// Mock data for AI stock picks (replace with API calls)
const largCapPicks: StockPick[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", iqScore: 98, stockRank: 1, technicalRating: "Strong Buy", price: 789.45, change: 15.32, changePercent: 1.98, aiConfidence: 95, marketCap: "1.9T", sector: "Technology", signal: "AI momentum accelerating", ratingChange: "Upgraded", aiPickerCount: 8, methodology: "Hybrid" },
  { symbol: "MSFT", name: "Microsoft Corporation", iqScore: 94, stockRank: 2, technicalRating: "Strong Buy", price: 418.25, change: 8.45, changePercent: 2.06, aiConfidence: 92, marketCap: "3.1T", sector: "Technology", signal: "Cloud dominance expanding", aiPickerCount: 7, methodology: "Fundamental" },
  { symbol: "GOOGL", name: "Alphabet Inc", iqScore: 91, stockRank: 3, technicalRating: "Buy", price: 145.67, change: 2.15, changePercent: 1.50, aiConfidence: 88, marketCap: "1.8T", sector: "Technology", signal: "Search moat strengthening", aiPickerCount: 6, methodology: "Technical" },
];

const midCapPicks: StockPick[] = [
  { symbol: "PLTR", name: "Palantir Technologies", iqScore: 95, stockRank: 1, technicalRating: "Strong Buy", price: 28.45, change: 2.15, changePercent: 8.18, aiConfidence: 93, marketCap: "62B", sector: "Technology", signal: "Government contracts accelerating", ratingChange: "New", aiPickerCount: 6, methodology: "Hybrid" },
  { symbol: "SMCI", name: "Super Micro Computer", iqScore: 92, stockRank: 2, technicalRating: "Strong Buy", price: 845.67, change: 45.23, changePercent: 5.65, aiConfidence: 89, marketCap: "48B", sector: "Technology", signal: "AI infrastructure demand surge", aiPickerCount: 5, methodology: "Technical" },
];

export default function AIStockPicker() {
  const [selectedCategory, setSelectedCategory] = useState("large-cap");
  const [timeframe, setTimeframe] = useState("1D");
  
  // Use API data for leaderboard
  const { data: cryptoData, loading: cryptoLoading } = useLeaderboard('crypto');
  const { data: stockData, loading: stockLoading } = useLeaderboard('stock');

  const getStockPicks = (category: string): StockPick[] => {
    switch (category) {
      case "large-cap": return largCapPicks;
      case "mid-cap": return midCapPicks;
      default: return largCapPicks;
    }
  };

  const getTechnicalRatingColor = (rating: string) => {
    switch (rating) {
      case "Strong Buy": return "text-green-500 bg-green-500/10";
      case "Buy": return "text-blue-500 bg-blue-500/10";
      case "Hold": return "text-yellow-500 bg-yellow-500/10";
      case "Sell": return "text-orange-500 bg-orange-500/10";
      case "Strong Sell": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Stock Picker
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered stock analysis using machine learning to rank 9,000+ U.S. stocks daily
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">1D</SelectItem>
              <SelectItem value="1W">1W</SelectItem>
              <SelectItem value="1M">1M</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* AI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Stocks Analyzed</span>
          </div>
          <p className="text-2xl font-bold text-foreground">9,247</p>
          <p className="text-xs text-muted-foreground">Updated daily</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">AI Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-foreground">87.3%</p>
          <p className="text-xs text-muted-foreground">30-day performance</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">Top Picks</span>
          </div>
          <p className="text-2xl font-bold text-foreground">247</p>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-muted-foreground">Avg Return</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+23.8%</p>
          <p className="text-xs text-muted-foreground">YTD top picks</p>
        </Card>
      </div>

      <Tabs defaultValue="picks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="picks" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI Stock Picks
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Live Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="picks" className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="large-cap">Large Cap Stocks</SelectItem>
                <SelectItem value="mid-cap">Mid Cap Stocks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {getStockPicks(selectedCategory).map((stock, index) => (
              <Card key={index} className="p-8 bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all duration-300">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
                  {/* Stock Info */}
                  <div className="xl:col-span-2 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                        #{stock.stockRank}
                      </Badge>
                      <Badge className={getTechnicalRatingColor(stock.technicalRating)}>
                        {stock.technicalRating}
                      </Badge>
                      {stock.ratingChange && (
                        <Badge variant="outline" className="text-xs">
                          {stock.ratingChange}
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stock.sector} • {stock.marketCap}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">IQ Score: </span>
                        <span className="font-semibold text-primary">{stock.iqScore}/100</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Confidence: </span>
                        <span className="font-semibold text-primary">{stock.aiConfidence}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Change */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="text-2xl font-bold text-foreground">${stock.price.toLocaleString()}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      stock.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stock.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-medium">
                        {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* AI Signal */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">AI Signal</p>
                    <p className="text-sm font-medium text-foreground">{stock.signal}</p>
                    <Badge variant="outline" className="text-xs">
                      {stock.methodology}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {stock.aiPickerCount} AI pickers
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Top Stocks (Live Data)
              </h3>
              {stockLoading ? (
                <p className="text-muted-foreground">Loading stock data...</p>
              ) : (
                <div className="space-y-3">
                  {stockData.slice(0, 5).map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${stock.price.toLocaleString()}</p>
                        <p className={`text-xs ${stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Top Crypto (Live Data)
              </h3>
              {cryptoLoading ? (
                <p className="text-muted-foreground">Loading crypto data...</p>
              ) : (
                <div className="space-y-3">
                  {cryptoData.slice(0, 5).map((crypto) => (
                    <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">{crypto.symbol}</p>
                        <p className="text-xs text-muted-foreground">{crypto.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${crypto.price.toLocaleString()}</p>
                        <p className={`text-xs ${crypto.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.changePercent > 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}