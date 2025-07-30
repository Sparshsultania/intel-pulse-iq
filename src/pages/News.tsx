import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, Calendar, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface NewsItem {
  id: string;
  time: string;
  date: string;
  currency: string;
  name: string;
  importance: "high" | "medium" | "low";
  folder: "red" | "yellow" | "white";
  expectation: string;
  previous: string;
  actual?: string;
  impact: "positive" | "negative" | "neutral";
}

const mockNewsData: NewsItem[] = [
  {
    id: "1",
    time: "08:30",
    date: "2024-01-30",
    currency: "USD",
    name: "Non-Farm Payrolls",
    importance: "high",
    folder: "red",
    expectation: "195K",
    previous: "216K",
    actual: "187K",
    impact: "negative"
  },
  {
    id: "2", 
    time: "10:00",
    date: "2024-01-30",
    currency: "USD",
    name: "Unemployment Rate",
    importance: "high",
    folder: "red",
    expectation: "3.7%",
    previous: "3.7%",
    actual: "3.9%",
    impact: "negative"
  },
  {
    id: "3",
    time: "14:00",
    date: "2024-01-30",
    currency: "EUR",
    name: "ECB Interest Rate Decision",
    importance: "high",
    folder: "red",
    expectation: "4.50%",
    previous: "4.50%",
    impact: "neutral"
  },
  {
    id: "4",
    time: "09:00",
    date: "2024-01-30",
    currency: "USD",
    name: "Core PCE Price Index",
    importance: "medium",
    folder: "yellow",
    expectation: "3.2%",
    previous: "3.2%",
    actual: "3.0%",
    impact: "positive"
  },
  {
    id: "5",
    time: "11:30",
    date: "2024-01-30",
    currency: "GBP",
    name: "GDP Growth Rate",
    importance: "medium",
    folder: "yellow",
    expectation: "0.2%",
    previous: "0.1%",
    impact: "neutral"
  },
  {
    id: "6",
    time: "13:00",
    date: "2024-01-30",
    currency: "CAD",
    name: "Building Permits",
    importance: "low",
    folder: "white",
    expectation: "2.1%",
    previous: "-1.9%",
    impact: "neutral"
  }
];

export default function News() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "red" | "yellow" | "white">("all");

  const filteredNews = selectedFilter === "all" 
    ? mockNewsData 
    : mockNewsData.filter(item => item.folder === selectedFilter);

  const getFolderIcon = (folder: string) => {
    const colors = {
      red: "text-red-500",
      yellow: "text-yellow-500", 
      white: "text-gray-400"
    };
    return <Folder className={`w-4 h-4 ${colors[folder as keyof typeof colors]}`} />;
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    const variants = {
      high: "destructive" as const,
      medium: "default" as const, 
      low: "secondary" as const
    };
    return <Badge variant={variants[importance as keyof typeof variants]}>{importance}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Economic Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Track major economic events and market-moving news
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Today, January 30, 2024</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            News Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="red" className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-red-500" />
                High Impact
              </TabsTrigger>
              <TabsTrigger value="yellow" className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-yellow-500" />
                Medium Impact
              </TabsTrigger>
              <TabsTrigger value="white" className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-400" />
                Low Impact
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Economic Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Importance</TableHead>
                <TableHead>Folder</TableHead>
                <TableHead>Previous</TableHead>
                <TableHead>Expectation</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.currency}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{getImportanceBadge(item.importance)}</TableCell>
                  <TableCell>{getFolderIcon(item.folder)}</TableCell>
                  <TableCell className="text-muted-foreground">{item.previous}</TableCell>
                  <TableCell className="font-medium">{item.expectation}</TableCell>
                  <TableCell>
                    {item.actual ? (
                      <span className="font-semibold">{item.actual}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getImpactIcon(item.impact)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Impact Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNewsData.filter(item => item.folder === "red").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Medium Impact Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNewsData.filter(item => item.folder === "yellow").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Impact Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNewsData.filter(item => item.folder === "white").length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}