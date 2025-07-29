import { useState, useEffect } from 'react';
import { apiService, AssetData, MarketOverview, PortfolioData } from '@/services/api';
import { mockCryptoData, mockStockData, marketOverview } from '@/data/mockData';

// Custom hook for fetching data with fallback to mock data
export const useApiData = <T>(
  apiCall: () => Promise<T>,
  fallbackData: T,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      console.warn('API call failed, using fallback data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

// Specific hooks for different data types
export const useCryptoData = () => {
  return useApiData(
    () => apiService.getCryptoData(),
    mockCryptoData
  );
};

export const useStockData = () => {
  return useApiData(
    () => apiService.getStockData(),
    mockStockData
  );
};

export const useMarketOverview = () => {
  return useApiData(
    () => apiService.getMarketOverview(),
    marketOverview
  );
};

export const useTopMovers = (limit: number = 10) => {
  return useApiData(
    () => apiService.getTopMovers(limit),
    [...mockCryptoData, ...mockStockData].slice(0, limit),
    [limit]
  );
};

export const useLeaderboard = (type: 'crypto' | 'stock' = 'crypto') => {
  return useApiData(
    () => apiService.getLeaderboard(type),
    type === 'crypto' ? mockCryptoData : mockStockData,
    [type]
  );
};

export const usePortfolios = () => {
  return useApiData(
    () => apiService.getPortfolios(),
    [] as PortfolioData[],
    []
  );
};

export const usePriceHistory = (symbol: string, period: string = '1D') => {
  return useApiData(
    () => apiService.getPriceHistory(symbol, period),
    [], // Empty fallback for price history
    [symbol, period]
  );
};