// API service for connecting to backend database
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

export interface AssetData {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  iqScore: number;
  volume: number;
  rsi: number;
  narrativeSignal: string;
  narrativeStrength: number;
  type: 'crypto' | 'stock';
}

export interface MarketOverview {
  totalMarketCap: number;
  totalVolume: number;
  fearGreedIndex: number;
  dominance: {
    btc: number;
    eth: number;
    others: number;
  };
  activeNarratives: Array<{
    name: string;
    strength: number;
    assets: number;
  }>;
}

export interface PortfolioData {
  id: string;
  name: string;
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  assets: Array<{
    symbol: string;
    name: string;
    amount: number;
    value: number;
    change: number;
  }>;
}

export interface PerformanceData {
  date: string;
  portfolio: number;
  benchmark: number;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Asset data endpoints
  async getCryptoData(): Promise<AssetData[]> {
    return this.request<AssetData[]>('/crypto');
  }

  async getStockData(): Promise<AssetData[]> {
    return this.request<AssetData[]>('/stocks');
  }

  async getAssetData(type: 'crypto' | 'stock' | 'all' = 'all'): Promise<AssetData[]> {
    return this.request<AssetData[]>(`/assets?type=${type}`);
  }

  // Market data endpoints
  async getMarketOverview(): Promise<MarketOverview> {
    return this.request<MarketOverview>('/market/overview');
  }

  async getTopMovers(limit: number = 10): Promise<AssetData[]> {
    return this.request<AssetData[]>(`/assets/top-movers?limit=${limit}`);
  }

  // Portfolio endpoints
  async getPortfolios(): Promise<PortfolioData[]> {
    return this.request<PortfolioData[]>('/portfolios');
  }

  async getPortfolio(id: string): Promise<PortfolioData> {
    return this.request<PortfolioData>(`/portfolios/${id}`);
  }

  async getPortfolioPerformance(id: string, period: string = '1Y'): Promise<PerformanceData[]> {
    return this.request<PerformanceData[]>(`/portfolios/${id}/performance?period=${period}`);
  }

  // Chart data endpoints
  async getPriceHistory(symbol: string, period: string = '1D'): Promise<Array<{date: string, price: number}>> {
    return this.request<Array<{date: string, price: number}>>(`/assets/${symbol}/history?period=${period}`);
  }

  async getNarrativeData(): Promise<Array<{
    name: string;
    strength: number;
    assets: string[];
    category: string;
    description: string;
    trend: string;
    momentum: number;
    marketCap: number;
  }>> {
    return this.request('/narratives');
  }

  // Leaderboard endpoints
  async getLeaderboard(type: 'crypto' | 'stock' = 'crypto'): Promise<AssetData[]> {
    return this.request<AssetData[]>(`/leaderboard?type=${type}`);
  }
}

export const apiService = new ApiService();