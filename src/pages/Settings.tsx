import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingUp, Bot, AlertTriangle, Mail, Smartphone, Volume2 } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your notification preferences and app settings</p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose which alerts and updates you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AI Stock Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="ai-alerts" className="text-base font-medium">AI Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when AI recommends new stocks</p>
                  </div>
                </div>
                <Switch id="ai-alerts" />
              </div>
              <div className="ml-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-buy-signals">Buy Signals</Label>
                  <Switch id="ai-buy-signals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-sell-signals">Sell Signals</Label>
                  <Switch id="ai-sell-signals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-consensus-changes">Consensus Changes</Label>
                  <Switch id="ai-consensus-changes" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Smart Signals */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <Label htmlFor="smart-signals" className="text-base font-medium">Smart Signals</Label>
                    <p className="text-sm text-muted-foreground">Technical analysis alerts and market signals</p>
                  </div>
                </div>
                <Switch id="smart-signals" />
              </div>
              <div className="ml-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trend-signals">Trend Signals</Label>
                  <Switch id="trend-signals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="momentum-signals">Momentum Signals</Label>
                  <Switch id="momentum-signals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume-signals">Volume Signals</Label>
                  <Switch id="volume-signals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="volatility-signals">Volatility Signals</Label>
                  <Switch id="volatility-signals" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <Label htmlFor="price-alerts" className="text-base font-medium">Price Movement Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of significant price changes</p>
                  </div>
                </div>
                <Switch id="price-alerts" />
              </div>
              <div className="ml-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="large-increases">Large Price Increases</Label>
                    <p className="text-xs text-muted-foreground">Stocks moving up 5%+ in a day</p>
                  </div>
                  <Switch id="large-increases" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="large-decreases">Large Price Decreases</Label>
                    <p className="text-xs text-muted-foreground">Stocks moving down 5%+ in a day</p>
                  </div>
                  <Switch id="large-decreases" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="volume-spikes">Volume Spikes</Label>
                    <p className="text-xs text-muted-foreground">Unusual trading volume activity</p>
                  </div>
                  <Switch id="volume-spikes" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Delivery Methods
            </CardTitle>
            <CardDescription>
              Choose how you want to receive your notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-green-500" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-purple-500" />
                <Label htmlFor="in-app-notifications">In-App Notifications</Label>
              </div>
              <Switch id="in-app-notifications" />
            </div>
          </CardContent>
        </Card>

        {/* Frequency Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Frequency</CardTitle>
            <CardDescription>
              Control how often you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alert-frequency">Alert Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quiet hours" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="none">No Quiet Hours</SelectItem>
                    <SelectItem value="night">10 PM - 8 AM</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
                    <SelectItem value="custom">Custom Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>
              Your currently active notification subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <Bot className="h-3 w-3" />
                AI Stock Alerts
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                Trend Signals
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Price Movements
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Volume2 className="h-3 w-3" />
                Volume Alerts (Paused)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg">Save All Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;