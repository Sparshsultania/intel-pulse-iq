import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, TrendingUp, TrendingDown, Shield, PieChart, Calendar, DollarSign, Info, Newspaper, Sparkles, FolderPlus, Folder, Upload } from "lucide-react";
import Reports from "@/components/Reports";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

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
  subPortfolio?: string;
}

interface SubPortfolio {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function Portfolio() {
  const [subPortfolios, setSubPortfolios] = useState<SubPortfolio[]>([
    { id: "growth", name: "Growth Portfolio", description: "High-growth stocks and emerging technologies", color: "#10b981" },
    { id: "dividend", name: "Dividend Portfolio", description: "Stable dividend-paying stocks", color: "#3b82f6" },
    { id: "crypto", name: "Crypto Portfolio", description: "Cryptocurrency investments", color: "#f59e0b" }
  ]);

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
      dividendYield: 0.8,
      subPortfolio: "growth"
    },
    {
      symbol: "SOL",
      name: "Solana",
      quantity: 50,
      avgPrice: 220.00,
      currentPrice: 245.67,
      type: 'crypto',
      riskScore: 85,
      lastNews: "Solana DePIN ecosystem expanding rapidly",
      subPortfolio: "crypto"
    }
  ]);

  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("total");
  const [newAsset, setNewAsset] = useState({ symbol: "", quantity: "", subPortfolio: "" });
  const [newSubPortfolio, setNewSubPortfolio] = useState({ name: "", description: "" });

  // Filter assets based on selected portfolio
  const filteredAssets = selectedPortfolio === "total" 
    ? assets 
    : assets.filter(asset => asset.subPortfolio === selectedPortfolio);

  const totalValue = filteredAssets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0);
  const totalGainLoss = filteredAssets.reduce((sum, asset) => sum + (asset.quantity * (asset.currentPrice - asset.avgPrice)), 0);
  const diversityScore = Math.min(100, filteredAssets.length * 15 + (new Set(filteredAssets.map(a => a.type)).size * 20));
  const avgRiskScore = filteredAssets.reduce((sum, asset) => sum + asset.riskScore, 0) / filteredAssets.length || 0;

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
      lastNews: "Recent market activity showing positive trends",
      subPortfolio: newAsset.subPortfolio === "none" ? undefined : newAsset.subPortfolio || undefined
    };

    setAssets(prev => [...prev, mockAsset]);
    setNewAsset({ symbol: "", quantity: "", subPortfolio: "" });
  };

  const handleAddSubPortfolio = () => {
    if (!newSubPortfolio.name) return;
    
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newSub: SubPortfolio = {
      id: newSubPortfolio.name.toLowerCase().replace(/\s+/g, '-'),
      name: newSubPortfolio.name,
      description: newSubPortfolio.description,
      color: randomColor
    };

    setSubPortfolios(prev => [...prev, newSub]);
    setNewSubPortfolio({ name: "", description: "" });
  };

  // Generate cumulative portfolio value data
  const generatePortfolioData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const variation = Math.random() * 0.05 - 0.025;
      const value = totalValue * (1 + variation * (i / 30));
      data.push({
        day: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.round(value)
      });
    }
    return data;
  };

  // Mock narratives data
  const narratives = [
    {
      name: "AI & Machine Learning",
      strength: 92,
      assets: ["NVDA", "MSFT", "GOOGL"],
      color: "#10b981"
    },
    {
      name: "DePIN Infrastructure", 
      strength: 85,
      assets: ["SOL", "RNDR", "FIL"],
      color: "#3b82f6"
    },
    {
      name: "Clean Energy",
      strength: 78,
      assets: ["TSLA", "ENPH", "NEE"],
      color: "#8b5cf6"
    }
  ];

  const generateNarrativeData = (assets: string[]) => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const entry: any = {
        day: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      assets.forEach(asset => {
        const basePrice = asset === 'NVDA' ? 789 : asset === 'SOL' ? 245 : Math.random() * 300 + 100;
        const variation = (Math.random() - 0.5) * 0.1;
        entry[asset] = Math.round(basePrice * (1 + variation * (i / 30)) * 100) / 100;
      });
      data.push(entry);
    }
    return data;
  };

  const getNewsForHoldings = () => [
    { symbol: "NVDA", news: "NVIDIA announces breakthrough in quantum computing partnerships", date: "2024-01-28" },
    { symbol: "SOL", news: "Solana network upgrades show 40% performance improvement", date: "2024-01-27" },
    { symbol: "NVDA", news: "Major cloud providers increase NVIDIA GPU orders for Q2", date: "2024-01-26" },
    { symbol: "SOL", news: "New DeFi protocols launch on Solana mainnet", date: "2024-01-25" }
  ];

  const getMajorDates = () => [
    { date: "2024-02-21", event: "NVDA Earnings Report", symbol: "NVDA", type: "earnings" },
    { date: "2024-02-15", event: "SOL Network Upgrade", symbol: "SOL", type: "upgrade" },
    { date: "2024-03-01", event: "NVDA Dividend Payment", symbol: "NVDA", type: "dividend" },
    { date: "2024-03-10", event: "AI Conference Keynote", symbol: "NVDA", type: "event" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground">
            Track your investments, risk metrics, and get insights on your holdings
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="total">Total Portfolio</SelectItem>
              {subPortfolios.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV/Excel
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Sub-Portfolio
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Sub-Portfolio</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Portfolio name (e.g., Tech Stocks)"
                  value={newSubPortfolio.name}
                  onChange={(e) => setNewSubPortfolio(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Description (optional)"
                  value={newSubPortfolio.description}
                  onChange={(e) => setNewSubPortfolio(prev => ({ ...prev, description: e.target.value }))}
                />
                <Button onClick={handleAddSubPortfolio} className="w-full">
                  Create Sub-Portfolio
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
          <Select value={newAsset.subPortfolio} onValueChange={(value) => setNewAsset(prev => ({ ...prev, subPortfolio: value }))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select sub-portfolio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sub-portfolio</SelectItem>
              {subPortfolios.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sub.color }}></div>
                    {sub.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddAsset} className="px-6">
            Add Asset
          </Button>
        </div>
      </Card>

      {/* Tabbed Portfolio Sections */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="narratives">Narratives</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Portfolio Performance Chart */}
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Portfolio Performance (30 Days)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generatePortfolioData()}>
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
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your Holdings</h3>
          {filteredAssets.map((asset, index) => (
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
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Holdings Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* News & Info Section */}
            <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                Holdings News & Info
              </h3>
              <div className="space-y-3">
                {getNewsForHoldings().map((item, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{item.symbol}</Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-sm text-foreground">{item.news}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Major Dates Section */}
            <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Major Dates
              </h3>
              <div className="space-y-3">
                {getMajorDates().map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{item.symbol}</Badge>
                        <Badge variant={item.type === 'earnings' ? 'default' : 'secondary'} className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{item.event}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="narratives" className="space-y-6">
          {/* Narratives Section */}
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Market Narratives
            </h3>
            <div className="space-y-6">
              {narratives.map((narrative, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{narrative.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Strength: {narrative.strength}/100 • {narrative.assets.length} assets
                      </p>
                    </div>
                    <Badge style={{ backgroundColor: narrative.color }} className="text-white">
                      {narrative.strength}% Strong
                    </Badge>
                  </div>
                  
                  {/* Multi-asset "noodle" chart */}
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateNarrativeData(narrative.assets)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={10}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={10}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        {narrative.assets.map((asset, assetIndex) => (
                          <Line 
                            key={asset}
                            type="monotone" 
                            dataKey={asset} 
                            stroke={`hsl(${120 + assetIndex * 60}, 70%, 50%)`}
                            strokeWidth={2}
                            dot={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex gap-2">
                    {narrative.assets.map((asset, assetIndex) => (
                      <Badge key={asset} variant="outline" className="text-xs">
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Reports selectedPortfolio={selectedPortfolio} subPortfolios={subPortfolios} />
        </TabsContent>
      </Tabs>
    </div>
  );
}