import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, TrendingUp, TrendingDown, Star, Award, Target, Zap, Activity, Brain, Info, Users, ChevronRight, Plus, Scan, BarChart3, Volume2, AlertTriangle, Clock, Filter, Search } from "lucide-react";

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

const largCapPicks: StockPick[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", iqScore: 98, stockRank: 1, technicalRating: "Strong Buy", price: 789.45, change: 15.32, changePercent: 1.98, aiConfidence: 95, marketCap: "1.9T", sector: "Technology", signal: "AI momentum accelerating", ratingChange: "Upgraded", aiPickerCount: 8, methodology: "Hybrid" },
  { symbol: "MSFT", name: "Microsoft Corporation", iqScore: 94, stockRank: 2, technicalRating: "Strong Buy", price: 418.25, change: 8.45, changePercent: 2.06, aiConfidence: 92, marketCap: "3.1T", sector: "Technology", signal: "Cloud dominance expanding", aiPickerCount: 7, methodology: "Fundamental" },
  { symbol: "GOOGL", name: "Alphabet Inc", iqScore: 91, stockRank: 3, technicalRating: "Buy", price: 145.67, change: 2.15, changePercent: 1.50, aiConfidence: 88, marketCap: "1.8T", sector: "Technology", signal: "Search moat strengthening", aiPickerCount: 6, methodology: "Technical" },
  { symbol: "AMZN", name: "Amazon.com Inc", iqScore: 89, stockRank: 4, technicalRating: "Buy", price: 156.23, change: -1.45, changePercent: -0.92, aiConfidence: 85, marketCap: "1.6T", sector: "Consumer Discretionary", signal: "AWS growth trajectory intact", aiPickerCount: 5, methodology: "Sentiment" },
  { symbol: "AAPL", name: "Apple Inc", iqScore: 87, stockRank: 5, technicalRating: "Hold", price: 189.45, change: 0.67, changePercent: 0.35, aiConfidence: 82, marketCap: "2.9T", sector: "Technology", signal: "Services revenue stabilizing", ratingChange: "Downgraded", aiPickerCount: 4, methodology: "Momentum" },
];

const midCapPicks: StockPick[] = [
  { symbol: "PLTR", name: "Palantir Technologies", iqScore: 95, stockRank: 1, technicalRating: "Strong Buy", price: 28.45, change: 2.15, changePercent: 8.18, aiConfidence: 93, marketCap: "62B", sector: "Technology", signal: "Government contracts accelerating", ratingChange: "New", aiPickerCount: 6, methodology: "Hybrid" },
  { symbol: "SMCI", name: "Super Micro Computer", iqScore: 92, stockRank: 2, technicalRating: "Strong Buy", price: 845.67, change: 45.23, changePercent: 5.65, aiConfidence: 89, marketCap: "48B", sector: "Technology", signal: "AI infrastructure demand surge", aiPickerCount: 5, methodology: "Technical" },
  { symbol: "ARM", name: "Arm Holdings", iqScore: 88, stockRank: 3, technicalRating: "Buy", price: 125.34, change: 3.78, changePercent: 3.11, aiConfidence: 86, marketCap: "128B", sector: "Technology", signal: "Mobile chip royalties growing", aiPickerCount: 4, methodology: "Fundamental" },
];

const smallCapPicks: StockPick[] = [
  { symbol: "SOUN", name: "SoundHound AI", iqScore: 89, stockRank: 1, technicalRating: "Strong Buy", price: 8.45, change: 0.75, changePercent: 9.74, aiConfidence: 78, marketCap: "2.8B", sector: "Technology", signal: "Voice AI breakthrough", ratingChange: "Upgraded", aiPickerCount: 4, methodology: "Sentiment" },
  { symbol: "BBAI", name: "BigBear.ai Holdings", iqScore: 85, stockRank: 2, technicalRating: "Buy", price: 3.67, change: 0.23, changePercent: 6.69, aiConfidence: 75, marketCap: "450M", sector: "Technology", signal: "Defense AI contracts expanding", aiPickerCount: 3, methodology: "Technical" },
  { symbol: "IREN", name: "Iris Energy", iqScore: 82, stockRank: 3, technicalRating: "Buy", price: 12.89, change: 1.45, changePercent: 12.67, aiConfidence: 72, marketCap: "1.2B", sector: "Energy", signal: "Bitcoin mining efficiency gains", aiPickerCount: 3, methodology: "Momentum" },
];

const pennyStockPicks: StockPick[] = [
  { symbol: "HOLO", name: "MicroCloud Hologram", iqScore: 76, stockRank: 1, technicalRating: "Buy", price: 0.95, change: 0.12, changePercent: 14.46, aiConfidence: 65, marketCap: "45M", sector: "Technology", signal: "Hologram patents valuable", ratingChange: "New", aiPickerCount: 2, methodology: "Technical" },
  { symbol: "AIHS", name: "Senmiao Technology", iqScore: 73, stockRank: 2, technicalRating: "Buy", price: 1.23, change: 0.08, changePercent: 6.96, aiConfidence: 62, marketCap: "78M", sector: "Technology", signal: "Fintech expansion in Asia", aiPickerCount: 2, methodology: "Sentiment" },
];

const spStockPicks: StockPick[] = [
  { symbol: "TSM", name: "Taiwan Semiconductor", iqScore: 93, stockRank: 1, technicalRating: "Strong Buy", price: 108.45, change: 3.21, changePercent: 3.05, aiConfidence: 91, marketCap: "562B", sector: "Technology", signal: "Chip demand acceleration", aiPickerCount: 7, methodology: "Fundamental" },
  { symbol: "AVGO", name: "Broadcom Inc", iqScore: 90, stockRank: 2, technicalRating: "Buy", price: 1245.67, change: 28.45, changePercent: 2.34, aiConfidence: 87, marketCap: "565B", sector: "Technology", signal: "AI chip ecosystem dominance", aiPickerCount: 6, methodology: "Technical" },
  { symbol: "ORCL", name: "Oracle Corporation", iqScore: 86, stockRank: 3, technicalRating: "Buy", price: 112.34, change: 1.89, changePercent: 1.71, aiConfidence: 84, marketCap: "315B", sector: "Technology", signal: "Cloud database migration", aiPickerCount: 5, methodology: "Hybrid" },
];

const russellPicks: StockPick[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", iqScore: 98, stockRank: 1, technicalRating: "Strong Buy", price: 789.45, change: 15.32, changePercent: 1.98, aiConfidence: 95, marketCap: "1.9T", sector: "Technology", signal: "AI dominance unmatched", aiPickerCount: 8, methodology: "Hybrid" },
  { symbol: "MSFT", name: "Microsoft Corporation", iqScore: 94, stockRank: 2, technicalRating: "Strong Buy", price: 418.25, change: 8.45, changePercent: 2.06, aiConfidence: 92, marketCap: "3.1T", sector: "Technology", signal: "Azure AI services leading", aiPickerCount: 7, methodology: "Fundamental" },
  { symbol: "TSLA", name: "Tesla Inc", iqScore: 91, stockRank: 3, technicalRating: "Buy", price: 245.67, change: 8.92, changePercent: 3.77, aiConfidence: 89, marketCap: "780B", sector: "Automotive", signal: "FSD breakthrough imminent", aiPickerCount: 6, methodology: "Technical" },
];

const aiConsensusLeaderboard = [
  { rank: 1, analyst: "Neural Alpha", accuracy: 89.2, picks: 247, wins: 220, streak: 8, methodology: "Deep Learning + Technical Analysis", specialty: "Momentum & Breakout Patterns" },
  { rank: 2, analyst: "Quantum Quant", accuracy: 87.8, picks: 312, wins: 274, streak: 6, methodology: "Quantum Computing + Fundamental Analysis", specialty: "Value Discovery & Risk Assessment" },
  { rank: 3, analyst: "DeepValue AI", accuracy: 85.9, picks: 189, wins: 162, streak: 12, methodology: "CNN + Financial Sentiment", specialty: "Market Sentiment & News Analysis" },
  { rank: 4, analyst: "TensorTrade", accuracy: 84.7, picks: 203, wins: 172, streak: 4, methodology: "LSTM + Price Action", specialty: "Time Series & Pattern Recognition" },
  { rank: 5, analyst: "Cognitive Capital", accuracy: 83.1, picks: 278, wins: 231, streak: 7, methodology: "Ensemble Methods + ESG Scoring", specialty: "Sustainable Investment Analysis" },
];

const smartSignals = {
  trend: [
    { name: "Golden Cross", description: "50-day MA crosses above 200-day MA", status: "Active", count: 23, timeframe: "Daily", strength: "Strong" },
    { name: "Ichimoku Bullish Breakout", description: "Price breaks above cloud with momentum", status: "Active", count: 18, timeframe: "4H", strength: "Strong" },
    { name: "Death Cross", description: "50-day MA crosses below 200-day MA", status: "Active", count: 12, timeframe: "Daily", strength: "Weak" },
    { name: "Ichimoku Bearish Breakout", description: "Price breaks below cloud with volume", status: "Active", count: 8, timeframe: "1H", strength: "Moderate" },
  ],
  momentum: [
    { name: "RSI Oversold", description: "RSI below 30 with bullish divergence", status: "Active", count: 34, timeframe: "1H", strength: "Strong" },
    { name: "MACD Bullish Cross", description: "MACD line crosses above signal line", status: "Active", count: 28, timeframe: "4H", strength: "Strong" },
    { name: "RSI Overbought", description: "RSI above 70 with bearish divergence", status: "Active", count: 19, timeframe: "30M", strength: "Moderate" },
    { name: "MACD Bearish Cross", description: "MACD line crosses below signal line", status: "Active", count: 15, timeframe: "Daily", strength: "Weak" },
  ],
  volume: [
    { name: "OBV Rising with Price", description: "On-Balance Volume confirms price uptrend", status: "Active", count: 41, timeframe: "Daily", strength: "Strong" },
    { name: "A/D Line Uptrend", description: "Accumulation/Distribution line trending up", status: "Active", count: 32, timeframe: "4H", strength: "Strong" },
    { name: "OBV Falling with Price", description: "On-Balance Volume confirms price downtrend", status: "Active", count: 22, timeframe: "1H", strength: "Moderate" },
    { name: "A/D Line Downtrend", description: "Accumulation/Distribution line trending down", status: "Active", count: 16, timeframe: "Daily", strength: "Weak" },
  ],
  volatility: [
    { name: "Bollinger Band Bounce", description: "Price bounces off lower Bollinger Band", status: "Active", count: 26, timeframe: "1H", strength: "Strong" },
    { name: "Keltner Channel Breakout", description: "Price breaks above Keltner Channel", status: "Active", count: 21, timeframe: "4H", strength: "Strong" },
    { name: "Bollinger Band Rejection", description: "Price rejects at upper Bollinger Band", status: "Active", count: 18, timeframe: "30M", strength: "Moderate" },
    { name: "Keltner Channel Breakdown", description: "Price breaks below Keltner Channel", status: "Active", count: 13, timeframe: "Daily", strength: "Weak" },
  ],
};

const scanLibrary = [
  { name: "Trend Scans", description: "Identify market direction changes", icon: TrendingUp, count: 12, color: "text-green-500 bg-green-500/10" },
  { name: "Momentum Scans", description: "Capture price acceleration patterns", icon: Zap, count: 8, color: "text-blue-500 bg-blue-500/10" },
  { name: "Volume Scans", description: "Track unusual trading activity", icon: Volume2, count: 6, color: "text-purple-500 bg-purple-500/10" },
  { name: "Volatility Scans", description: "Spot breakout opportunities", icon: AlertTriangle, count: 10, color: "text-orange-500 bg-orange-500/10" },
];

export default function AIStockPicker() {
  const [selectedCategory, setSelectedCategory] = useState("large-cap");
  const [timeframe, setTimeframe] = useState("1D");
  const [signalTimeframe, setSignalTimeframe] = useState("1H");

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

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Moderate": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Weak": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="picks" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI Stock Picks
          </TabsTrigger>
          <TabsTrigger value="smart-signals" className="flex items-center gap-2">
            <Scan className="w-4 h-4" />
            Smart Signals
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

          <div className="space-y-6">
            {getStockPicks(selectedCategory).map((stock, index) => (
              <Card key={index} className="p-8 bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all duration-300">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
                  {/* Stock Info - Larger Section */}
                  <div className="xl:col-span-2 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                        #{stock.stockRank}
                      </Badge>
                      {stock.ratingChange && getRatingChangeIcon(stock.ratingChange)}
                      <h3 className="font-bold text-xl">{stock.symbol}</h3>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {stock.methodology}
                      </Badge>
                    </div>
                    <p className="text-base text-muted-foreground font-medium">{stock.name}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary" className="text-sm">{stock.sector}</Badge>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">{stock.aiPickerCount} AI pickers consensus</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis Details */}
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">IQ Score</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1">{stock.iqScore}</div>
                      <div className="text-sm text-muted-foreground">AI Confidence: {stock.aiConfidence}%</div>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Analysis Method</p>
                      <Badge className={`${getTechnicalRatingColor(stock.technicalRating)} border-0 text-sm px-3 py-1`}>
                        {stock.methodology} Analysis
                      </Badge>
                    </div>
                  </div>

                  {/* Price & Performance */}
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-muted/10">
                      <p className="text-lg font-bold text-foreground mb-1">${stock.price.toLocaleString()}</p>
                      <div className={`text-base flex items-center justify-center gap-2 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-muted/10">
                      <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                      <p className="font-semibold text-foreground">{stock.marketCap}</p>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-muted/10">
                      <p className="text-sm text-muted-foreground mb-1">Technical Rating</p>
                      <Badge className={`${getTechnicalRatingColor(stock.technicalRating)} border-0 text-sm`}>
                        {stock.technicalRating}
                      </Badge>
                    </div>
                  </div>

                  {/* AI Signal & Action */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border/50 bg-muted/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-muted-foreground">AI Signal</span>
                      </div>
                      <p className="text-base text-foreground font-medium leading-relaxed">{stock.signal}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-1">Formula Types Used</div>
                          <div className="flex flex-wrap gap-1 justify-center">
                            <Badge variant="outline" className="text-xs">Technical</Badge>
                            <Badge variant="outline" className="text-xs">Sentiment</Badge>
                            {stock.methodology === "Hybrid" && <Badge variant="outline" className="text-xs">Fundamental</Badge>}
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" size="lg">
                        Add to Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="smart-signals" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Smart Signals</h2>
              <p className="text-muted-foreground">Real-time technical analysis signals across all markets</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={signalTimeframe} onValueChange={setSignalTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30M">30 Min</SelectItem>
                  <SelectItem value="1H">1 Hour</SelectItem>
                  <SelectItem value="4H">4 Hour</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter Markets
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trend Signals */}
            <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/2 border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Trend Signals</h3>
                    <p className="text-sm text-muted-foreground">Identify market direction and strength across timeframes</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {smartSignals.trend.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{signal.name}</h4>
                        <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                          {signal.strength}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{signal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{signal.count}</div>
                      <div className="text-xs text-muted-foreground">{signal.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Momentum Signals */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/2 border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Momentum Signals</h3>
                    <p className="text-sm text-muted-foreground">Capture price acceleration and market dynamics</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {smartSignals.momentum.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{signal.name}</h4>
                        <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                          {signal.strength}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{signal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{signal.count}</div>
                      <div className="text-xs text-muted-foreground">{signal.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Volume Signals */}
            <Card className="p-6 bg-gradient-to-br from-purple-500/5 to-purple-500/2 border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Volume2 className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Volume Signals</h3>
                    <p className="text-sm text-muted-foreground">Track trading activity and money flow</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {smartSignals.volume.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{signal.name}</h4>
                        <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                          {signal.strength}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{signal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{signal.count}</div>
                      <div className="text-xs text-muted-foreground">{signal.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Volatility Signals */}
            <Card className="p-6 bg-gradient-to-br from-orange-500/5 to-orange-500/2 border-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Volatility Signals</h3>
                    <p className="text-sm text-muted-foreground">Spot price fluctuations and identify breakout opportunities</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {smartSignals.volatility.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{signal.name}</h4>
                        <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                          {signal.strength}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{signal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{signal.count}</div>
                      <div className="text-xs text-muted-foreground">{signal.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Build Your Scan Library */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/2 border-primary/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Build Your Scan Library</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stop missing profitable setups. Our library of professional trading signals with real-time data 
                instantly identifies opportunities across any market condition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Access trend, momentum, volume & volatility signals</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Real-time data updates for precision day trading entries</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Choose from 30min, 1hr, 4hr, daily & weekly timeframes</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Save your favorite scans for one-click analysis</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {scanLibrary.map((scan, index) => (
                <Card key={index} className="p-4 hover:border-primary/30 transition-all cursor-pointer">
                  <div className={`p-3 rounded-lg ${scan.color} mb-3`}>
                    <scan.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{scan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{scan.description}</p>
                  <div className="text-xs font-medium text-primary">{scan.count} scans</div>
                </Card>
              ))}
              
              <Card className="p-4 border-dashed border-2 hover:border-primary/50 transition-all cursor-pointer flex items-center justify-center">
                <div className="text-center">
                  <Plus className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-muted-foreground">Custom New Scan</h3>
                </div>
              </Card>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <h3 className="text-lg font-semibold mb-2">Craft scans for your strategy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Build custom scans with real-time market data to capture breakouts, reversals, squeezes, and more.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Combine multiple signals for higher probability setups</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Instant market scanning with 30min & 1hr real-time data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Filter by stocks, ETFs, or crypto with one click</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Get real-time technical ratings on every signal</span>
                </div>
              </div>
              <Button className="mt-4">
                <Search className="w-4 h-4 mr-2" />
                Build Custom Scan
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                AI Stock Picker Consensus Leaderboard
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    View Methodologies
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>AI Methodology Breakdown</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {aiConsensusLeaderboard.map((analyst, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{analyst.analyst}</h4>
                          <Badge variant="outline">Rank #{analyst.rank}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-primary mb-1">Core Methodology</p>
                            <p className="text-sm text-muted-foreground">{analyst.methodology}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary mb-1">Specialty Focus</p>
                            <p className="text-sm text-muted-foreground">{analyst.specialty}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Accuracy: {analyst.accuracy}%</span>
                            <span>Win Streak: {analyst.streak}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
