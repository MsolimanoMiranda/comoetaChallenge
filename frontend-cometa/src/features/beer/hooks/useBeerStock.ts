'use client';
import { useEffect, useState } from 'react';
import { BeerApi } from '@/infrastructure/api/beerApi';
import { Stock } from '@/domain/models/beer';

export function useBeerStock() {
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const beerApi = new BeerApi();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockData = await beerApi.getStock();
        setStock(stockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch beer stock');
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return { stock, loading, error };
}