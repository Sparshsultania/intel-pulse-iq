import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Folder, Calendar as CalendarIcon, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

interface HistoricalData {
  date: string;
  actual: string;
  forecast: string;
  previous: string;
}

// Generate news data for different dates
const generateNewsForDate = (date: string): NewsItem[] => {
  const baseEvents = [
    {
      time: "08:30",
      currency: "USD",
      name: "Non-Farm Payrolls",
      importance: "high" as const,
      folder: "red" as const,
    },
    {
      time: "10:00", 
      currency: "USD",
      name: "Unemployment Rate",
      importance: "high" as const,
      folder: "red" as const,
    },
    {
      time: "14:00",
      currency: "EUR", 
      name: "ECB Interest Rate Decision",
      importance: "high" as const,
      folder: "red" as const,
    },
    {
      time: "09:00",
      currency: "USD",
      name: "Core PCE Price Index", 
      importance: "medium" as const,
      folder: "yellow" as const,
    },
    {
      time: "11:30",
      currency: "GBP",
      name: "GDP Growth Rate",
      importance: "medium" as const,
      folder: "yellow" as const,
    },
    {
      time: "13:00",
      currency: "CAD",
      name: "Building Permits",
      importance: "low" as const,
      folder: "white" as const,
    }
  ];

  return baseEvents.map((event, index) => ({
    id: `${date}-${index}`,
    date,
    expectation: Math.random() > 0.5 ? `${(Math.random() * 5).toFixed(1)}%` : `${Math.floor(Math.random() * 300)}K`,
    previous: Math.random() > 0.5 ? `${(Math.random() * 5).toFixed(1)}%` : `${Math.floor(Math.random() * 300)}K`,
    actual: Math.random() > 0.7 ? `${(Math.random() * 5).toFixed(1)}%` : undefined,
    impact: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)] as any,
    ...event
  }));
};

// Generate historical data for an event
const generateHistoricalData = (eventName: string): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const currentDate = new Date();
  
  for (let i = 0; i < 144; i++) { // 12 years * 12 months
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual: eventName.includes('Rate') 
        ? `${(2 + Math.random() * 3).toFixed(2)}%`
        : `${Math.floor(150 + Math.random() * 100)}K`,
      forecast: eventName.includes('Rate')
        ? `${(2 + Math.random() * 3).toFixed(2)}%` 
        : `${Math.floor(150 + Math.random() * 100)}K`,
      previous: eventName.includes('Rate')
        ? `${(2 + Math.random() * 3).toFixed(2)}%`
        : `${Math.floor(150 + Math.random() * 100)}K`
    });
  }
  
  return data.reverse();
};

export default function News() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "red" | "yellow" | "white">("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEvent, setSelectedEvent] = useState<NewsItem | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

  const currentNewsData = generateNewsForDate(selectedDate);
  const filteredNews = selectedFilter === "all" 
    ? currentNewsData 
    : currentNewsData.filter(item => item.folder === selectedFilter);

  const handleEventClick = (event: NewsItem) => {
    setSelectedEvent(event);
    setHistoricalData(generateHistoricalData(event.name));
  };


  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-auto justify-start text-left font-normal",
                "flex items-center gap-2"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(selectedDate)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(selectedDate)}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date.toISOString().split('T')[0]);
                }
              }}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
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
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEventClick(item)}
                >
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
            <div className="text-2xl font-bold">{currentNewsData.filter(item => item.folder === "red").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Medium Impact Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentNewsData.filter(item => item.folder === "yellow").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Impact Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentNewsData.filter(item => item.folder === "white").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent && getFolderIcon(selectedEvent.folder)}
              {selectedEvent?.name} - 12 Year History
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Currency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{selectedEvent.currency}</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Importance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getImportanceBadge(selectedEvent.importance)}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Latest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-medium">{selectedEvent.actual || selectedEvent.expectation}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Previous</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-medium">{selectedEvent.previous}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Historical Data (Last 12 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Forecast</TableHead>
                          <TableHead>Previous</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicalData.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{record.actual}</TableCell>
                            <TableCell className="text-muted-foreground">{record.forecast}</TableCell>
                            <TableCell className="text-muted-foreground">{record.previous}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}