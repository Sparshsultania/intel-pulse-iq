import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, ArrowUpRight, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Narrative {
  name: string;
  strength: number;
  assets: string[];
  color: string;
  category: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  momentum: number;
  marketCap: number;
}

export default function Narratives() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const narratives: Narrative[] = [
    {
      name: "AI & Machine Learning",
      strength: 92,
      assets: ["NVDA", "MSFT", "GOOGL", "AMZN", "META"],
      color: "#10b981",
      category: "Technology",
      description: "Artificial intelligence and machine learning infrastructure driving the next wave of innovation",
      trend: 'up',
      momentum: 85,
      marketCap: 2500000000000
    },
    {
      name: "DePIN Infrastructure", 
      strength: 85,
      assets: ["SOL", "RNDR", "FIL", "HNT", "IOTX"],
      color: "#3b82f6",
      category: "Crypto",
      description: "Decentralized Physical Infrastructure Networks revolutionizing real-world connectivity",
      trend: 'up',
      momentum: 78,
      marketCap: 450000000000
    },
    {
      name: "Clean Energy Transition",
      strength: 78,
      assets: ["TSLA", "ENPH", "NEE", "FSLR", "PLUG"],
      color: "#8b5cf6",
      category: "Energy",
      description: "Global shift towards renewable energy sources and sustainable infrastructure",
      trend: 'stable',
      momentum: 72,
      marketCap: 890000000000
    },
    {
      name: "Gaming & Metaverse",
      strength: 71,
      assets: ["RBLX", "U", "MANA", "SAND", "AXS"],
      color: "#f59e0b",
      category: "Entertainment",
      description: "Virtual worlds and blockchain gaming creating new digital economies",
      trend: 'down',
      momentum: 65,
      marketCap: 120000000000
    },
    {
      name: "Biotech Innovation",
      strength: 82,
      assets: ["MRNA", "BNTX", "GILD", "ILMN", "REGN"],
      color: "#ef4444",
      category: "Healthcare",
      description: "Revolutionary biotechnology advancing personalized medicine and gene therapy",
      trend: 'up',
      momentum: 80,
      marketCap: 650000000000
    },
    {
      name: "Quantum Computing",
      strength: 68,
      assets: ["IBM", "GOOGL", "IONQ", "RGTI", "QUBT"],
      color: "#06b6d4",
      category: "Technology",
      description: "Next-generation computing power solving previously impossible problems",
      trend: 'stable',
      momentum: 69,
      marketCap: 180000000000
    }
  ];

  const categories = ['all', ...Array.from(new Set(narratives.map(n => n.category)))];

  const filteredNarratives = selectedCategory === 'all' 
    ? narratives 
    : narratives.filter(n => n.category === selectedCategory);

  const generateNarrativeData = (assets: string[]) => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const entry: any = {
        day: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      assets.forEach(asset => {
        const basePrice = Math.random() * 300 + 100;
        const variation = (Math.random() - 0.5) * 0.1;
        entry[asset] = Math.round(basePrice * (1 + variation * (i / 30)) * 100) / 100;
      });
      data.push(entry);
    }
    return data;
  };

  const generateStrengthData = () => {
    return filteredNarratives.map(narrative => ({
      name: narrative.name.split(' ')[0],
      strength: narrative.strength,
      momentum: narrative.momentum
    }));
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(1)}M`;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <ArrowUpRight className="h-4 w-4 text-destructive rotate-180" />;
    return <ArrowUpRight className="h-4 w-4 text-muted-foreground rotate-90" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Narratives</h1>
          <p className="text-muted-foreground">
            Discover trending themes and investment narratives shaping the markets
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/40">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Filter by Category</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>

      {/* Narrative Strength Overview */}
      <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Narrative Strength Overview
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateStrengthData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
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
              <Bar 
                dataKey="strength" 
                fill="hsl(var(--primary))" 
                name="Strength"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="momentum" 
                fill="hsl(var(--primary) / 0.6)" 
                name="Momentum"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Narrative Details */}
      <div className="space-y-6">
        {filteredNarratives.map((narrative, index) => (
          <Card key={index} className="p-6 bg-card/30 backdrop-blur-sm border-border/40">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{narrative.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {narrative.category}
                    </Badge>
                    {getTrendIcon(narrative.trend)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {narrative.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-2 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Strength</p>
                      <p className="font-bold text-foreground">{narrative.strength}/100</p>
                    </div>
                    <div className="text-center p-2 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Momentum</p>
                      <p className="font-bold text-foreground">{narrative.momentum}/100</p>
                    </div>
                    <div className="text-center p-2 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Assets</p>
                      <p className="font-bold text-foreground">{narrative.assets.length}</p>
                    </div>
                    <div className="text-center p-2 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                      <p className="font-bold text-foreground">{formatMarketCap(narrative.marketCap)}</p>
                    </div>
                  </div>
                </div>
                <Badge 
                  style={{ backgroundColor: narrative.color }} 
                  className="text-white ml-4"
                >
                  {narrative.strength}% Strong
                </Badge>
              </div>
              
              {/* Multi-asset chart */}
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
                        stroke={`hsl(${120 + assetIndex * 50}, 70%, 50%)`}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Asset tags */}
              <div className="flex gap-2 flex-wrap">
                {narrative.assets.map((asset, assetIndex) => (
                  <Badge key={asset} variant="outline" className="text-xs">
                    {asset}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}