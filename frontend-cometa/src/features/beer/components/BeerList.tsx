import React from 'react';
import { Beer } from '@/domain/models/beer';

interface BeerListProps {
  beers: Beer[];
}

export const BeerList: React.FC<BeerListProps> = ({ beers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {beers.map((beer) => (
            <tr key={beer.name} className={beer.quantity === 0 ? 'bg-red-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${beer.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  beer.quantity === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {beer.quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};