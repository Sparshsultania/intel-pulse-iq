import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, TrendingUp, TrendingDown, Star, Award, Target, Zap, Activity, Brain } from "lucide-react";

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
}

const largCapPicks: StockPick[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", iqScore: 98, stockRank: 1, technicalRating: "Strong Buy", price: 789.45, change: 15.32, changePercent: 1.98, aiConfidence: 95, marketCap: "1.9T", sector: "Technology", signal: "AI momentum accelerating", ratingChange: "Upgraded" },
  { symbol: "MSFT", name: "Microsoft Corporation", iqScore: 94, stockRank: 2, technicalRating: "Strong Buy", price: 418.25, change: 8.45, changePercent: 2.06, aiConfidence: 92, marketCap: "3.1T", sector: "Technology", signal: "Cloud dominance expanding" },
  { symbol: "GOOGL", name: "Alphabet Inc", iqScore: 91, stockRank: 3, technicalRating: "Buy", price: 145.67, change: 2.15, changePercent: 1.50, aiConfidence: 88, marketCap: "1.8T", sector: "Technology", signal: "Search moat strengthening" },
  { symbol: "AMZN", name: "Amazon.com Inc", iqScore: 89, stockRank: 4, technicalRating: "Buy", price: 156.23, change: -1.45, changePercent: -0.92, aiConfidence: 85, marketCap: "1.6T", sector: "Consumer Discretionary", signal: "AWS growth trajectory intact" },
  { symbol: "AAPL", name: "Apple Inc", iqScore: 87, stockRank: 5, technicalRating: "Hold", price: 189.45, change: 0.67, changePercent: 0.35, aiConfidence: 82, marketCap: "2.9T", sector: "Technology", signal: "Services revenue stabilizing", ratingChange: "Downgraded" },
];

const midCapPicks: StockPick[] = [
  { symbol: "PLTR", name: "Palantir Technologies", iqScore: 95, stockRank: 1, technicalRating: "Strong Buy", price: 28.45, change: 2.15, changePercent: 8.18, aiConfidence: 93, marketCap: "62B", sector: "Technology", signal: "Government contracts accelerating", ratingChange: "New" },
  { symbol: "SMCI", name: "Super Micro Computer", iqScore: 92, stockRank: 2, technicalRating: "Strong Buy", price: 845.67, change: 45.23, changePercent: 5.65, aiConfidence: 89, marketCap: "48B", sector: "Technology", signal: "AI infrastructure demand surge" },
  { symbol: "ARM", name: "Arm Holdings", iqScore: 88, stockRank: 3, technicalRating: "Buy", price: 125.34, change: 3.78, changePercent: 3.11, aiConfidence: 86, marketCap: "128B", sector: "Technology", signal: "Mobile chip royalties growing" },
];

const smallCapPicks: StockPick[] = [
  { symbol: "SOUN", name: "SoundHound AI", iqScore: 89, stockRank: 1, technicalRating: "Strong Buy", price: 8.45, change: 0.75, changePercent: 9.74, aiConfidence: 78, marketCap: "2.8B", sector: "Technology", signal: "Voice AI breakthrough", ratingChange: "Upgraded" },
  { symbol: "BBAI", name: "BigBear.ai Holdings", iqScore: 85, stockRank: 2, technicalRating: "Buy", price: 3.67, change: 0.23, changePercent: 6.69, aiConfidence: 75, marketCap: "450M", sector: "Technology", signal: "Defense AI contracts expanding" },
  { symbol: "IREN", name: "Iris Energy", iqScore: 82, stockRank: 3, technicalRating: "Buy", price: 12.89, change: 1.45, changePercent: 12.67, aiConfidence: 72, marketCap: "1.2B", sector: "Energy", signal: "Bitcoin mining efficiency gains" },
];

const pennyStockPicks: StockPick[] = [
  { symbol: "HOLO", name: "MicroCloud Hologram", iqScore: 76, stockRank: 1, technicalRating: "Buy", price: 0.95, change: 0.12, changePercent: 14.46, aiConfidence: 65, marketCap: "45M", sector: "Technology", signal: "Hologram patents valuable", ratingChange: "New" },
  { symbol: "AIHS", name: "Senmiao Technology", iqScore: 73, stockRank: 2, technicalRating: "Buy", price: 1.23, change: 0.08, changePercent: 6.96, aiConfidence: 62, marketCap: "78M", sector: "Technology", signal: "Fintech expansion in Asia" },
];

const spStockPicks: StockPick[] = [
  { symbol: "TSM", name: "Taiwan Semiconductor", iqScore: 93, stockRank: 1, technicalRating: "Strong Buy", price: 108.45, change: 3.21, changePercent: 3.05, aiConfidence: 91, marketCap: "562B", sector: "Technology", signal: "Chip demand acceleration" },
  { symbol: "AVGO", name: "Broadcom Inc", iqScore: 90, stockRank: 2, technicalRating: "Buy", price: 1245.67, change: 28.45, changePercent: 2.34, aiConfidence: 87, marketCap: "565B", sector: "Technology", signal: "AI chip ecosystem dominance" },
  { symbol: "ORCL", name: "Oracle Corporation", iqScore: 86, stockRank: 3, technicalRating: "Buy", price: 112.34, change: 1.89, changePercent: 1.71, aiConfidence: 84, marketCap: "315B", sector: "Technology", signal: "Cloud database migration" },
];

const russellPicks: StockPick[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", iqScore: 98, stockRank: 1, technicalRating: "Strong Buy", price: 789.45, change: 15.32, changePercent: 1.98, aiConfidence: 95, marketCap: "1.9T", sector: "Technology", signal: "AI dominance unmatched" },
  { symbol: "MSFT", name: "Microsoft Corporation", iqScore: 94, stockRank: 2, technicalRating: "Strong Buy", price: 418.25, change: 8.45, changePercent: 2.06, aiConfidence: 92, marketCap: "3.1T", sector: "Technology", signal: "Azure AI services leading" },
  { symbol: "TSLA", name: "Tesla Inc", iqScore: 91, stockRank: 3, technicalRating: "Buy", price: 245.67, change: 8.92, changePercent: 3.77, aiConfidence: 89, marketCap: "780B", sector: "Automotive", signal: "FSD breakthrough imminent" },
];

const aiConsensusLeaderboard = [
  { rank: 1, analyst: "Neural Alpha", accuracy: 89.2, picks: 247, wins: 220, streak: 8 },
  { rank: 2, analyst: "Quantum Quant", accuracy: 87.8, picks: 312, wins: 274, streak: 6 },
  { rank: 3, analyst: "DeepValue AI", accuracy: 85.9, picks: 189, wins: 162, streak: 12 },
  { rank: 4, analyst: "TensorTrade", accuracy: 84.7, picks: 203, wins: 172, streak: 4 },
  { rank: 5, analyst: "Cognitive Capital", accuracy: 83.1, picks: 278, wins: 231, streak: 7 },
];

export default function AIStockPicker() {
  const [selectedCategory, setSelectedCategory] = useState("large-cap");
  const [timeframe, setTimeframe] = useState("1D");

  const getStockPicks = (category: string): StockPick[] => {
    switch (category) {
      case "large-cap": return largCapPicks;
      case "mid-cap": return midCapPicks;
      case "small-cap": return smallCapPicks;
      case "penny": return pennyStockPicks;
      case "sp500": return spStockPicks;
      case "russell": return russellPicks;
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

  const getRatingChangeIcon = (change?: string) => {
    if (!change) return null;
    switch (change) {
      case "Upgraded": return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "Downgraded": return <TrendingDown className="h-3 w-3 text-red-500" />;
      case "New": return <Star className="h-3 w-3 text-blue-500" />;
      default: return null;
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
            AI Consensus Leaderboard
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
                <SelectItem value="small-cap">Small Cap Stocks</SelectItem>
                <SelectItem value="penny">Penny Stocks</SelectItem>
                <SelectItem value="sp500">S&P 500 Stocks</SelectItem>
                <SelectItem value="russell">Russell 1000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {getStockPicks(selectedCategory).map((stock, index) => (
              <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  {/* Stock Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        #{stock.stockRank}
                      </Badge>
                      {stock.ratingChange && getRatingChangeIcon(stock.ratingChange)}
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                    <Badge variant="secondary" className="text-xs">{stock.sector}</Badge>
                  </div>

                  {/* IQ Score */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">IQ Score</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{stock.iqScore}</div>
                    <div className="text-xs text-muted-foreground">AI Confidence: {stock.aiConfidence}%</div>
                  </div>

                  {/* Technical Rating */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Technical Rating</p>
                    <Badge className={`${getTechnicalRatingColor(stock.technicalRating)} border-0`}>
                      {stock.technicalRating}
                    </Badge>
                  </div>

                  {/* Price & Change */}
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">${stock.price.toLocaleString()}</p>
                    <div className={`text-sm flex items-center justify-center gap-1 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Market Cap</p>
                    <p className="font-semibold text-foreground">{stock.marketCap}</p>
                  </div>

                  {/* AI Signal */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">AI Signal</span>
                    </div>
                    <p className="text-sm text-foreground">{stock.signal}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Add to Portfolio
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              AI Stock Picker Consensus Leaderboard
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Performance ranking of our top AI analysts based on accuracy, consistency, and returns generated.
            </p>
            
            <div className="space-y-4">
              {aiConsensusLeaderboard.map((analyst, index) => (
                <Card key={index} className={`p-4 ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/30' : 'bg-muted/20'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {analyst.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{analyst.analyst}</h4>
                        <p className="text-xs text-muted-foreground">AI Analyst</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{analyst.accuracy}%</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{analyst.picks}</p>
                      <p className="text-xs text-muted-foreground">Total Picks</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-500">{analyst.wins}</p>
                      <p className="text-xs text-muted-foreground">Successful Picks</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-blue-500">{analyst.streak}</p>
                      <p className="text-xs text-muted-foreground">Win Streak</p>
                    </div>

                    <div className="flex justify-center">
                      <Button size="sm" variant="outline">
                        Follow Picks
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}