import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/b9596341-e1ae-48b5-bb48-f5ac77aa34c9.png" 
              alt="Vanalyze Logo" 
              className="h-10 w-auto"
            />
            <div>
              <p className="text-xs text-muted-foreground">AI-Driven Market Intelligence</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search assets, narratives, or signals..." 
                className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <Button className="bg-gradient-primary text-white hover:opacity-90 transition-opacity">
              Get Pro Access
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};