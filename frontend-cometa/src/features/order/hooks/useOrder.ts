'use client';
import { useState, useEffect } from 'react';
import { OrderApi } from '@/infrastructure/api/orderApi';
import { OrderService } from '../services/orderService';
import { Order } from '@/domain/models/order';
import { Beer } from '@/domain/models/beer';

export function useOrder(beers: Beer[] | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const orderService = new OrderService();
  const orderApi = new OrderApi();

  useEffect(() => {
    if (!beers) return;

    const fetchOrder = async () => {
      try {
        const orderData = await orderApi.getOrder();
        const calculatedOrder = orderService.calculateOrderTotals(orderData, beers);
        setOrder(calculatedOrder);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la orden');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [beers]);

  const addRound = async (items: { name: string; quantity: number }[]): Promise<boolean | undefined> => {
    if (!order) return;

    try {
      await orderApi.addRound(items);
      
      const orderData = await orderApi.getOrder();
      const calculatedOrder = orderService.calculateOrderTotals(
        orderData, 
        beers || []
      );
      setOrder(calculatedOrder);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al añadir ronda');
      throw err;
    }
  };
  const payOrder = async () => {
    if (!order) return;
    
    try {
      const orderApi = new OrderApi();
      await orderApi.payOrder(order.id); 
      
      const updatedOrder = { ...order, paid: true };
      setOrder(updatedOrder);
      
      return true;
    } catch (err) {
      console.log(err)
      throw new Error('Se deberia crear una db para este metodo');
    }
  };

  return { 
    order, 
    loading, 
    error, 
    addRound,
    payOrder,
    refreshOrder: async () => {
      if (!beers) return;
      setLoading(true);
      try {
        const orderData = await orderApi.getOrder();
        const calculatedOrder = orderService.calculateOrderTotals(orderData, beers);
        setOrder(calculatedOrder);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar');
      } finally {
        setLoading(false);
      }
    }
  };
}