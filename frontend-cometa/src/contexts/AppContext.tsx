'use client';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Stock } from '@/domain/models/beer';
import { Order } from '@/domain/models/order';
import { BeerApi } from '@/infrastructure/api/beerApi';
import { OrderApi } from '@/infrastructure/api/orderApi';
import { OrderService } from '@/features/order/services/orderService';

interface AppContextType {
  stock: Stock | null;
  order: Order | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const beerApi = new BeerApi();
  const orderApi = new OrderApi();
  const orderService = new OrderService();

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [stockData, orderData] = await Promise.all([
        beerApi.getStock(),
        orderApi.getOrder()
      ]);
      
      setStock(stockData);
      const calculatedOrder = orderService.calculateOrderTotals(
        orderData, 
        stockData.beers
      );
      setOrder(calculatedOrder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ stock, order, loading, error, refreshData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};