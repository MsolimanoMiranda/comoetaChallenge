'use client';
import React, { useState } from 'react';
import { Beer } from '@/domain/models/beer';
import { Button } from '@/ui/components/Button';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface RoundFormProps {
  beers: Beer[];
  onAddRound: (items: { name: string; quantity: number }[]) => Promise<boolean | undefined>;
}

export const RoundForm: React.FC<RoundFormProps> = ({ beers, onAddRound }) => {
  const [roundItems, setRoundItems] = useState<{ name: string; quantity: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableBeers = beers.filter(beer => beer.quantity > 0);

  const addBeerItem = () => {
    if (availableBeers.length === 0) return;
    setRoundItems([...roundItems, { 
      name: availableBeers[0].name, 
      quantity: 1 
    }]);
  };

  const removeBeerItem = (index: number) => {
    const newItems = [...roundItems];
    newItems.splice(index, 1);
    setRoundItems(newItems);
  };

  const updateBeerItem = (index: number, field: 'name' | 'quantity', value: string | number) => {
    const newItems = [...roundItems];
    if (field === 'quantity') {
      value = Math.max(1, Math.min(10, Number(value))); // Limita entre 1 y 10
    }
    newItems[index] = { ...newItems[index], [field]: value };
    setRoundItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (roundItems.length === 0) {
      setError('Debes agregar al menos una cerveza a la ronda');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddRound(roundItems);
      setRoundItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar la ronda');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {roundItems.map((item, index) => {
          const selectedBeer = beers.find(b => b.name === item.name);
          const maxQuantity = selectedBeer?.quantity || 10;

          return (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
              <select
                value={item.name}
                onChange={(e) => updateBeerItem(index, 'name', e.target.value)}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {availableBeers.map(beer => (
                  <option 
                    key={beer.name} 
                    value={beer.name}
                    disabled={beer.quantity === 0}
                  >
                    {beer.name} (${beer.price} - Stock: {beer.quantity})
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateBeerItem(index, 'quantity', item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
                >
                  <MinusCircleIcon className="h-5 w-5" />
                </button>

                <input
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={item.quantity}
                  onChange={(e) => updateBeerItem(index, 'quantity', e.target.value)}
                  className="w-16 p-2 border rounded-md text-center"
                />

                <button
                  type="button"
                  onClick={() => updateBeerItem(index, 'quantity', item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity}
                  className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeBeerItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircleIcon className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={addBeerItem}
          disabled={availableBeers.length === 0}
          className="flex items-center gap-1"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Agregar Cerveza
        </Button>

        <Button
          type="submit"
          disabled={roundItems.length === 0 || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Procesando...' : 'Agregar Ronda'}
        </Button>
      </div>
    </form>
  );
};