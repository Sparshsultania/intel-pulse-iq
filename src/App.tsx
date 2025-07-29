import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
              {/* Header with trigger */}
              <header className="h-12 flex items-center border-b border-border/40 bg-card/20 backdrop-blur-sm">
                <SidebarTrigger className="ml-4" />
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
