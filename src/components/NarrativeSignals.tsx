import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Users, TrendingUp } from "lucide-react";

interface NarrativeSignal {
  name: string;
  strength: number;
  assets: number;
}

interface NarrativeSignalsProps {
  narratives: NarrativeSignal[];
}

export const NarrativeSignals = ({ narratives }: NarrativeSignalsProps) => {
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return "text-iq-excellent";
    if (strength >= 60) return "text-iq-high";
    if (strength >= 40) return "text-iq-medium";
    return "text-iq-low";
  };

  const getStrengthBadge = (strength: number) => {
    if (strength >= 80) return "🔥 Hot";
    if (strength >= 60) return "⚡ Strong";
    if (strength >= 40) return "📈 Rising";
    return "🌱 Emerging";
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Narrative Signals</h2>
            <p className="text-sm text-muted-foreground">Active market themes driving momentum</p>
          </div>
        </div>

        <div className="space-y-4">
          {narratives.map((narrative, index) => (
            <div 
              key={narrative.name}
              className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {narrative.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {getStrengthBadge(narrative.strength)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{narrative.assets} assets</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-lg font-bold ${getStrengthColor(narrative.strength)}`}>
                      {narrative.strength}%
                    </div>
                    <div className="text-xs text-muted-foreground">Strength</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signal Strength</span>
                    <span className={getStrengthColor(narrative.strength)}>
                      {narrative.strength}%
                    </span>
                  </div>
                  <Progress 
                    value={narrative.strength} 
                    className="h-2 bg-secondary" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Updated</span>
            <span className="text-accent">2 minutes ago</span>
          </div>
        </div>
      </div>
    </Card>
  );
};