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
import type { DateRange } from "react-day-picker";

interface ReportsProps {
  selectedPortfolio: string;
  subPortfolios: Array<{ id: string; name: string; description: string; color: string }>;
}

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

const contributionData = [
  { asset: "AAPL", contribution: 15.2, weight: 12.5, category: "Technology", performance: 23.1 },
  { asset: "MSFT", contribution: 12.8, weight: 10.2, category: "Technology", performance: 18.7 },
  { asset: "NVDA", contribution: 18.5, weight: 8.7, category: "Technology", performance: 52.3 },
  { asset: "GOOGL", contribution: 9.3, weight: 7.8, category: "Technology", performance: 12.9 },
  { asset: "AMZN", contribution: 7.1, weight: 6.9, category: "Consumer", performance: 8.2 },
  { asset: "JPM", contribution: -2.1, weight: 5.2, category: "Financial", performance: -4.1 },
];

const Reports = ({ selectedPortfolio, subPortfolios }: ReportsProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const [includeSold, setIncludeSold] = useState(true);

  const getPortfolioName = () => {
    if (selectedPortfolio === "total") return "Total Portfolio";
    const portfolio = subPortfolios.find(p => p.id === selectedPortfolio);
    return portfolio?.name || "Unknown Portfolio";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Reports & Analytics - {getPortfolioName()}
          </h2>
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
                  <p className="text-xs text-muted-foreground mt-1">vs 18.2% benchmark</p>
                </div>
                <TrendingUp className="w-8 h-8 text-bullish" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annualized Return</p>
                  <p className="text-2xl font-bold text-bullish">+18.3%</p>
                  <p className="text-xs text-muted-foreground mt-1">Since inception</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground">$125,460</p>
                  <p className="text-xs text-muted-foreground mt-1">+$20,460 this period</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Volatility</p>
                  <p className="text-2xl font-bold text-bearish">12.9%</p>
                  <p className="text-xs text-muted-foreground mt-1">Risk level: Moderate</p>
                </div>
                <TrendingDown className="w-8 h-8 text-bearish" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Contribution Analysis</h3>
                <Select defaultValue="performance">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="contribution">Contribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                How individual holdings contribute to overall portfolio performance.
              </p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {contributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.asset}</Badge>
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.weight}%</div>
                        <div className="text-xs text-muted-foreground">Weight</div>
                      </div>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.contribution > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.abs(item.contribution) * 3}%` }}
                        ></div>
                      </div>
                      <div className={`text-sm font-medium ${item.contribution > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.contribution > 0 ? '+' : ''}{item.contribution}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Sector Breakdown</h3>
              <div className="space-y-3">
                {allocationData.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                      <span className="text-sm font-medium">{sector.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(sector.value / 35) * 100}%`,
                            backgroundColor: sector.color 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{sector.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Drawdown Risk Analysis</h3>
              <Select defaultValue="quarterly">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Compares total return against maximum drawdown for each investment over specified periods.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-2">Period</th>
                    <th className="text-left p-2">Asset</th>
                    <th className="text-left p-2">Max Drawdown</th>
                    <th className="text-left p-2">Recovery Days</th>
                    <th className="text-left p-2">Return/MDD Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {drawdownData.map((item, index) => (
                    <tr key={index} className="border-b border-border/20">
                      <td className="p-2">{item.period}</td>
                      <td className="p-2">
                        <Badge variant="outline">{item.asset}</Badge>
                      </td>
                      <td className="p-2 text-red-500 font-medium">{item.maxDrawdown}%</td>
                      <td className="p-2">{item.recovery} days</td>
                      <td className="p-2 font-medium">{item.returnMddRatio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Taxable Income Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dividend and interest payments received within the period for tax reporting.
              </p>
              
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Local Dividend Income</span>
                    <span className="font-bold text-green-500">$2,847.60</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Qualified dividends from domestic holdings
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Foreign Dividend Income</span>
                    <span className="font-bold text-blue-500">$1,234.50</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    International holdings (may be subject to withholding tax)
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Interest Income</span>
                    <span className="font-bold text-purple-500">$567.80</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Bond funds and fixed income securities
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-4">Historical Cost Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Opening and closing balances at cost price and market value for accounting purposes.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/20">
                    <div className="text-xs text-muted-foreground mb-1">Opening Balance (Cost)</div>
                    <div className="font-bold">$98,750.00</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20">
                    <div className="text-xs text-muted-foreground mb-1">Opening Balance (Market)</div>
                    <div className="font-bold">$105,230.50</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/20">
                    <div className="text-xs text-muted-foreground mb-1">Closing Balance (Cost)</div>
                    <div className="font-bold">$123,450.00</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20">
                    <div className="text-xs text-muted-foreground mb-1">Closing Balance (Market)</div>
                    <div className="font-bold">$145,680.75</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Unrealized Gain/Loss</span>
                    <span className="font-bold text-green-500">+$22,230.75</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;