import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  { asset: "AAPL", contribution: 15.2, weight: 12.5, category: "Technology", performance: 23.1 },
  { asset: "MSFT", contribution: 12.8, weight: 10.2, category: "Technology", performance: 18.7 },
  { asset: "NVDA", contribution: 18.5, weight: 8.7, category: "Technology", performance: 52.3 },
  { asset: "GOOGL", contribution: 9.3, weight: 7.8, category: "Technology", performance: 12.9 },
  { asset: "AMZN", contribution: 7.1, weight: 6.9, category: "Consumer", performance: 8.2 },
  { asset: "JPM", contribution: -2.1, weight: 5.2, category: "Financial", performance: -4.1 },
];

const soldSecurities = [
  { asset: "TSLA", soldDate: "2024-03-15", soldPrice: 185.50, purchasePrice: 165.20, quantity: 50, realizedGain: 1015, gainPercent: 12.3 },
  { asset: "META", soldDate: "2024-02-20", soldPrice: 485.30, purchasePrice: 520.10, quantity: 25, realizedGain: -870, gainPercent: -6.7 },
  { asset: "NFLX", soldDate: "2024-01-10", soldPrice: 445.80, purchasePrice: 380.50, quantity: 15, realizedGain: 979.5, gainPercent: 17.2 },
];

const futureIncome = [
  { asset: "AAPL", exDate: "2024-08-15", payDate: "2024-08-22", dividend: 0.25, shares: 100, totalIncome: 25, frequency: "Quarterly" },
  { asset: "MSFT", exDate: "2024-08-20", payDate: "2024-08-29", dividend: 0.83, shares: 75, totalIncome: 62.25, frequency: "Quarterly" },
  { asset: "JNJ", exDate: "2024-08-25", payDate: "2024-09-05", dividend: 1.19, shares: 50, totalIncome: 59.5, frequency: "Quarterly" },
  { asset: "KO", exDate: "2024-09-15", payDate: "2024-10-01", dividend: 0.48, shares: 120, totalIncome: 57.6, frequency: "Quarterly" },
];

const historicalDividends = [
  { date: "2024-05-15", asset: "AAPL", amount: 25.00, type: "Dividend" },
  { date: "2024-05-20", asset: "MSFT", amount: 62.25, type: "Dividend" },
  { date: "2024-04-15", asset: "JNJ", amount: 59.50, type: "Dividend" },
  { date: "2024-04-10", asset: "Bond Fund", amount: 45.80, type: "Interest" },
  { date: "2024-03-15", asset: "REIT", amount: 38.20, type: "Distribution" },
];

interface ReportsProps {
  selectedPortfolio: string;
}

const Reports = ({ selectedPortfolio }: ReportsProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const [includeSold, setIncludeSold] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Reports & Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Deep insights for {selectedPortfolio === 'total' ? 'Total Portfolio' : selectedPortfolio}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Performance</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold text-bullish">+25.8%</p>
                <Badge variant="secondary">{selectedPortfolio === 'total' ? 'Total' : selectedPortfolio}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs 18.2% benchmark</p>
            </div>
            <TrendingUp className="w-8 h-8 text-bullish" />
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
              <p className="text-sm text-muted-foreground">Risk Score</p>
              <p className="text-2xl font-bold text-bearish">6.2/10</p>
              <p className="text-xs text-muted-foreground mt-1">Moderate risk</p>
            </div>
            <Shield className="w-8 h-8 text-bearish" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4">Performance vs Benchmark</h3>
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
          <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
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
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-lg font-semibold mb-4">Key Metrics & Risk Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-bullish">1.42</div>
            <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-bearish">-8.1%</div>
            <div className="text-xs text-muted-foreground">Max Drawdown</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="text-lg font-bold">12.9%</div>
            <div className="text-xs text-muted-foreground">Volatility</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-primary">1.12</div>
            <div className="text-xs text-muted-foreground">Beta</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;