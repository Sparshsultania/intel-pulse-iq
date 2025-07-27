import { Header } from "@/components/Header";
import { AssetCard } from "@/components/AssetCard";
import { Leaderboard } from "@/components/Leaderboard";
import { MetricCard } from "@/components/MetricCard";
import { NarrativeSignals } from "@/components/NarrativeSignals";
import { mockCryptoData, mockStockData, marketOverview } from "@/data/mockData";
import { TrendingUp, DollarSign, Activity, Zap } from "lucide-react";

const Index = () => {
  // Get top performers for featured cards
  const topCrypto = mockCryptoData.slice(0, 3);
  const topStocks = mockStockData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Market Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Market Cap"
            value={`$${(marketOverview.totalMarketCap / 1e12).toFixed(2)}T`}
            change={0.12}
            changePercent={2.4}
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="24h Volume"
            value={`$${(marketOverview.totalVolume / 1e9).toFixed(1)}B`}
            change={0.05}
            changePercent={1.8}
            icon={Activity}
            trend="up"
          />
          <MetricCard
            title="Fear & Greed Index"
            value={marketOverview.fearGreedIndex}
            subtitle="Greed"
            icon={TrendingUp}
            trend="up"
          />
          <MetricCard
            title="Active Narratives"
            value={marketOverview.activeNarratives.length}
            subtitle="Trending themes"
            icon={Zap}
            trend="neutral"
          />
        </section>

        {/* Featured Assets */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Featured High-IQ Assets</h2>
            <p className="text-muted-foreground">Top-performing assets with exceptional AI-driven scores</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...topCrypto, ...topStocks].slice(0, 6).map((asset) => (
              <AssetCard
                key={asset.symbol}
                symbol={asset.symbol}
                name={asset.name}
                price={asset.price}
                change={asset.change}
                changePercent={asset.changePercent}
                iqScore={asset.iqScore}
                volume={asset.volume}
                rsi={asset.rsi}
                narrativeSignal={asset.narrativeSignal}
                type={asset.type}
              />
            ))}
          </div>
        </section>

        {/* Leaderboards and Narratives */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Leaderboard
            title="Top Crypto Assets"
            items={mockCryptoData}
            type="crypto"
          />
          
          <Leaderboard
            title="Top Stock Assets"
            items={mockStockData}
            type="stock"
          />
          
          <NarrativeSignals narratives={marketOverview.activeNarratives} />
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-6 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            Vanalyze MVP - AI-Driven Market Intelligence Platform
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Real-time data • Advanced analytics • Narrative signals
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
