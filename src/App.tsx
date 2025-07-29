import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User, Settings as SettingsIcon } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import AIStockPicker from "./pages/AIStockPicker";
import AssetProfiling from "./pages/AssetProfiling";
import Narratives from "./pages/Narratives";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-background/80">
            <AppSidebar />
            
            <div className="flex-1 flex flex-col">
              {/* Header with trigger and user actions */}
              <header className="h-12 flex items-center justify-between border-b border-border/40 bg-card/20 backdrop-blur-sm px-4">
                <SidebarTrigger className="ml-0" />
                
                {/* User Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <NavLink to="/profile">
                      <User className="h-4 w-4" />
                    </NavLink>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <NavLink to="/settings">
                      <SettingsIcon className="h-4 w-4" />
                    </NavLink>
                  </Button>
                </div>
              </header>

              {/* Main content area */}
              <main className="flex-1 p-6 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/ai-stock-picker" element={<AIStockPicker />} />
                  <Route path="/asset-profiling" element={<AssetProfiling />} />
                  <Route path="/narratives" element={<Narratives />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
