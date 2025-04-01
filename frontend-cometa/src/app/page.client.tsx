'use client';

import { BeerList } from '@/features/beer/components/BeerList';
import { OrderSummary } from '@/features/order/components/OrderSummary';
import { RoundForm } from '@/features/order/components/RoundForm';
import { useBeerStock } from '@/features/beer/hooks/useBeerStock';
import { useOrder } from '@/features/order/hooks/useOrder';
import { Alert } from '@/ui/components/Alert';
import { Spinner } from '@/ui/components/Spinner';

export default function HomePage() {
  const { stock, loading: stockLoading, error: stockError } = useBeerStock();
  const { order, loading: orderLoading, error: orderError, addRound, payOrder } = useOrder(stock?.beers || null);

  if (stockLoading || orderLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (stockError || orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert 
          type="error" 
          message={stockError || orderError || 'Unknown error'} 
          className="max-w-md"
        />
      </div>
    );
  }

  if (!stock || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert 
          type="warning" 
          message="No se pudieron cargar los datos" 
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Bar Cometa - Sistema de Pedidos
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Gestiona las órdenes de cerveza de tus clientes
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Cervezas Disponibles
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Stock actualizado al {new Date(stock.last_updated).toLocaleString()}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <BeerList beers={stock.beers} />
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Añadir Nueva Ronda
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Selecciona las cervezas para la siguiente ronda
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <RoundForm 
                  beers={stock.beers} 
                  onAddRound={addRound} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg sticky top-8">
              <OrderSummary order={order} onPayOrder={payOrder}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}