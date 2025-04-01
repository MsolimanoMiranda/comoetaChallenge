'use client';
import React, { useState } from 'react';
import { Order } from '@/domain/models/order';
import { Button } from '@/ui/components/Button';
import { RoundItem } from './RoundItem';

interface OrderSummaryProps {
  order: Order;
  onPayOrder: () => Promise<boolean | undefined>; 
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order, onPayOrder }) => {
  const total = order.subtotal + order.taxes;
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handlePayOrder = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      await onPayOrder();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="space-y-6 p-4">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Detalles de la Orden</h2>
        <p className="text-sm text-gray-500">
          Creada: {new Date(order.created).toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Rondas ({order.rounds.length})</h3>
        {order.rounds.length > 0 ? (
          <div className="space-y-3">
            {order.rounds.map((round, index) => (
              <RoundItem 
                key={index} 
                round={round} 
                index={index} 
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No hay rondas añadidas</p>
        )}
      </div>

      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Impuestos:</span>
          <span className="font-medium">${order.taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <Button
        variant={order.paid ? 'success' : 'primary'}
        className="w-full mt-4"
        disabled={order.paid || order.rounds.length === 0}
        onClick={handlePayOrder}
      >
       {order.paid ? 'Orden Pagada' : 
         isProcessing ? 'Procesando...' : 'Pagar Orden'}
      </Button>
    </div>
  );
};