import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CalendarIcon, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Globe, FileText, Calculator, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const performanceData = [
  { month: "Jan", portfolio: 100000, benchmark: 100000 },
  { month: "Feb", portfolio: 105000, benchmark: 102000 },
  { month: "Mar", portfolio: 98000, benchmark: 99000 },
  { month: "Apr", portfolio: 112000, benchmark: 105000 },
  { month: "May", portfolio: 118000, benchmark: 108000 },
  { month: "Jun", portfolio: 125000, benchmark: 112000 },
];

const allocationData = [
  { name: "Technology", value: 35, color: "hsl(var(--primary))" },
  { name: "Healthcare", value: 20, color: "hsl(var(--secondary))" },
  { name: "Finance", value: 15, color: "hsl(var(--accent))" },
  { name: "Consumer", value: 12, color: "hsl(var(--muted))" },
  { name: "Energy", value: 10, color: "hsl(var(--chart-1))" },
  { name: "Others", value: 8, color: "hsl(var(--chart-2))" },
];

const drawdownData = [
  { period: "Q1 2024", maxDrawdown: -5.2, recovery: 15, returnMddRatio: 4.9, asset: "AAPL" },
  { period: "Q2 2024", maxDrawdown: -8.1, recovery: 22, returnMddRatio: 3.1, asset: "MSFT" },
  { period: "Q3 2024", maxDrawdown: -3.8, recovery: 8, returnMddRatio: 6.8, asset: "NVDA" },
  { period: "Q4 2024", maxDrawdown: -6.5, recovery: 18, returnMddRatio: 4.2, asset: "GOOGL" },
];

const assetExposureData = [
  { asset: "AAPL", directHolding: 12.5, etfExposure: 2.3, totalExposure: 14.8, sector: "Technology" },
  { asset: "MSFT", directHolding: 10.2, etfExposure: 1.8, totalExposure: 12.0, sector: "Technology" },
  { asset: "NVDA", directHolding: 8.7, etfExposure: 0.9, totalExposure: 9.6, sector: "Technology" },
  { asset: "JPM", directHolding: 0, etfExposure: 3.2, totalExposure: 3.2, sector: "Financial" },
  { asset: "JNJ", directHolding: 5.1, etfExposure: 1.1, totalExposure: 6.2, sector: "Healthcare" },
];

const diversityData = [
  { category: "Single Stock Risk", current: 14.8, target: 10.0, status: "Over" },
  { category: "Sector Concentration", current: 35.2, target: 30.0, status: "Over" },
  { category: "Geographic Exposure", current: 75.0, target: 70.0, status: "Over" },
  { category: "Currency Risk", current: 25.0, target: 30.0, status: "Under" },
  { category: "Market Cap Spread", current: 82.0, target: 80.0, status: "Target" },
];

const contributionData = [
  { asset: "AAPL", contribution: 15.2, weight: 12.5 },
  { asset: "MSFT", contribution: 12.8, weight: 10.2 },
  { asset: "NVDA", contribution: 18.5, weight: 8.7 },
  { asset: "GOOGL", contribution: 9.3, weight: 7.8 },
  { asset: "AMZN", contribution: 7.1, weight: 6.9 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const [includeSold, setIncludeSold] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Deep insights and actionable data for your investment portfolio
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YTD">Year to Date</SelectItem>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="3Y">3 Years</SelectItem>
              <SelectItem value="5Y">5 Years</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Allocation
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Tax & Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Return</p>
                  <p className="text-2xl font-bold text-bullish">+25.8%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-bullish" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annualized Return</p>
                  <p className="text-2xl font-bold text-bullish">+18.3%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-2xl font-bold text-foreground">1.42</p>
                </div>
                <Globe className="w-8 h-8 text-accent" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Volatility</p>
                  <p className="text-2xl font-bold text-bearish">12.9%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-bearish" />
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold mb-4">Portfolio Performance vs Benchmark</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="portfolio" stroke="hsl(var(--primary))" strokeWidth={3} name="Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="S&P 500" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold mb-4">Contribution Analysis</h3>
            <div className="space-y-4">
              {contributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{item.asset}</Badge>
                    <span className="text-sm text-muted-foreground">Weight: {item.weight}%</span>
                  </div>
                  <div className={`text-sm font-medium ${item.contribution > 0 ? 'text-bullish' : 'text-bearish'}`}>
                    {item.contribution > 0 ? '+' : ''}{item.contribution}%
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Geographic Exposure</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">United States</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Europe</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/6 h-full bg-secondary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Asia Pacific</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/12 h-full bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/50 h-full bg-chart-1 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h4 className="font-semibold text-bearish mb-2">Value at Risk (95%)</h4>
              <p className="text-2xl font-bold">-$8,450</p>
              <p className="text-sm text-muted-foreground mt-1">Daily potential loss</p>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <h4 className="font-semibold text-primary mb-2">Beta</h4>
              <p className="text-2xl font-bold">1.12</p>
              <p className="text-sm text-muted-foreground mt-1">vs S&P 500</p>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <h4 className="font-semibold text-accent mb-2">Correlation</h4>
              <p className="text-2xl font-bold">0.87</p>
              <p className="text-sm text-muted-foreground mt-1">with market</p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Drawdown Risk Analysis</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue="1Y">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3M">3 Months</SelectItem>
                    <SelectItem value="6M">6 Months</SelectItem>
                    <SelectItem value="1Y">1 Year</SelectItem>
                    <SelectItem value="3Y">3 Years</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Maximum drawdown (MDD) represents the maximum loss from peak to trough. The Return/MDD ratio helps evaluate risk-adjusted performance.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Asset</th>
                    <th className="text-right p-3">Max Drawdown</th>
                    <th className="text-right p-3">Recovery Days</th>
                    <th className="text-right p-3">Return/MDD Ratio</th>
                    <th className="text-right p-3">Risk Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drawdownData.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3">
                        <Badge variant="outline">{item.asset}</Badge>
                      </td>
                      <td className="text-right p-3 text-bearish font-medium">{item.maxDrawdown}%</td>
                      <td className="text-right p-3">{item.recovery} days</td>
                      <td className="text-right p-3 font-medium">{item.returnMddRatio}</td>
                      <td className="text-right p-3">
                        <Badge variant={item.returnMddRatio > 5 ? "default" : item.returnMddRatio > 3 ? "secondary" : "destructive"}>
                          {item.returnMddRatio > 5 ? "Low Risk" : item.returnMddRatio > 3 ? "Medium Risk" : "High Risk"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">True Asset Exposure</h3>
              <Select defaultValue="sector">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sector">By Sector</SelectItem>
                  <SelectItem value="country">By Country</SelectItem>
                  <SelectItem value="currency">By Currency</SelectItem>
                  <SelectItem value="market">By Market</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Shows your complete exposure including assets held within ETFs. Use this to track against your allocation targets.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Asset</th>
                    <th className="text-right p-3">Direct Holding</th>
                    <th className="text-right p-3">ETF Exposure</th>
                    <th className="text-right p-3">Total Exposure</th>
                    <th className="text-right p-3">Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {assetExposureData.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3">
                        <Badge variant="outline">{item.asset}</Badge>
                      </td>
                      <td className="text-right p-3">{item.directHolding}%</td>
                      <td className="text-right p-3 text-accent">{item.etfExposure}%</td>
                      <td className="text-right p-3 font-medium">{item.totalExposure}%</td>
                      <td className="text-right p-3">
                        <Badge variant="secondary">{item.sector}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold mb-4">Portfolio Diversity Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track your diversification across various dimensions compared to your target allocation strategy.
            </p>
            
            <div className="space-y-4">
              {diversityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.category}</span>
                    <Badge 
                      variant={item.status === "Target" ? "default" : item.status === "Over" ? "destructive" : "secondary"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Current</div>
                      <div className="font-medium">{item.current}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Target</div>
                      <div className="font-medium">{item.target}%</div>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.status === "Target" ? "bg-primary" : 
                          item.status === "Over" ? "bg-bearish" : "bg-accent"
                        }`}
                        style={{ width: `${Math.min(100, (item.current / item.target) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Taxable Income Summary</h3>
                <Select defaultValue="2024">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                ⚠️ Check this report against your actual dividend statements before using in tax returns
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/10">
                  <h4 className="font-medium mb-3 text-bullish">Dividend Income</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Local Qualified Dividends</span>
                      <span className="font-medium">$2,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Foreign Qualified Dividends</span>
                      <span className="font-medium">$680</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Non-Qualified Dividends</span>
                      <span className="font-medium">$185</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium">Total Dividends</span>
                      <span className="font-bold">$3,315</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/10">
                  <h4 className="font-medium mb-3 text-primary">Interest & Other Income</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bank Interest</span>
                      <span className="font-medium">$320</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bond Interest</span>
                      <span className="font-medium">$1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">REIT Distributions</span>
                      <span className="font-medium">$890</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/10">
                  <h4 className="font-medium mb-3 text-accent">Capital Gains</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Short-term Capital Gains</span>
                      <span className="font-medium text-bearish">$1,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Long-term Capital Gains</span>
                      <span className="font-medium text-bullish">$5,680</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Trade Log Summary</h3>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-foreground">247</div>
                <p className="text-sm text-muted-foreground">Total trades this year</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-bullish/10">
                    <div className="text-lg font-semibold text-bullish">189</div>
                    <div className="text-xs text-muted-foreground">Profitable</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-bearish/10">
                    <div className="text-lg font-semibold text-bearish">58</div>
                    <div className="text-xs text-muted-foreground">Losses</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 rounded-lg bg-muted/20">
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                  <div className="text-xl font-bold">76.5%</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button className="w-full" variant="outline" size="sm">
                    Download PDF
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    Export Excel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Historical Cost Analysis</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue="annual">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Opening and closing balances at cost price vs market value. Useful for annual accounts and trust reporting.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Asset</th>
                    <th className="text-right p-3">Opening Cost</th>
                    <th className="text-right p-3">Closing Cost</th>
                    <th className="text-right p-3">Market Value</th>
                    <th className="text-right p-3">Unrealized G/L</th>
                    <th className="text-right p-3">G/L %</th>
                    <th className="text-right p-3">Book Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <Badge variant="outline">AAPL</Badge>
                    </td>
                    <td className="text-right p-3 text-muted-foreground">$12,000</td>
                    <td className="text-right p-3">$15,000</td>
                    <td className="text-right p-3">$18,500</td>
                    <td className="text-right p-3 text-bullish font-medium">+$3,500</td>
                    <td className="text-right p-3 text-bullish">+23.3%</td>
                    <td className="text-right p-3 font-medium">$15,000</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <Badge variant="outline">MSFT</Badge>
                    </td>
                    <td className="text-right p-3 text-muted-foreground">$10,000</td>
                    <td className="text-right p-3">$12,000</td>
                    <td className="text-right p-3">$13,800</td>
                    <td className="text-right p-3 text-bullish font-medium">+$1,800</td>
                    <td className="text-right p-3 text-bullish">+15.0%</td>
                    <td className="text-right p-3 font-medium">$12,000</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <Badge variant="outline">NVDA</Badge>
                    </td>
                    <td className="text-right p-3 text-muted-foreground">$5,000</td>
                    <td className="text-right p-3">$8,000</td>
                    <td className="text-right p-3">$12,200</td>
                    <td className="text-right p-3 text-bullish font-medium">+$4,200</td>
                    <td className="text-right p-3 text-bullish">+52.5%</td>
                    <td className="text-right p-3 font-medium">$8,000</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <Badge variant="outline">GOOGL</Badge>
                    </td>
                    <td className="text-right p-3 text-muted-foreground">$8,500</td>
                    <td className="text-right p-3">$9,200</td>
                    <td className="text-right p-3">$10,100</td>
                    <td className="text-right p-3 text-bullish font-medium">+$900</td>
                    <td className="text-right p-3 text-bullish">+9.8%</td>
                    <td className="text-right p-3 font-medium">$9,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/20 text-center">
                <div className="text-sm text-muted-foreground">Total Cost Basis</div>
                <div className="text-xl font-bold">$44,200</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 text-center">
                <div className="text-sm text-muted-foreground">Total Market Value</div>
                <div className="text-xl font-bold">$54,600</div>
              </div>
              <div className="p-4 rounded-lg bg-bullish/10 text-center">
                <div className="text-sm text-muted-foreground">Total Unrealized G/L</div>
                <div className="text-xl font-bold text-bullish">+$10,400</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;