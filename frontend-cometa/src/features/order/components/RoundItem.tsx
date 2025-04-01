import React from 'react';
import { Round } from '@/domain/models/order';

interface RoundItemProps {
  round: Round;
  index: number;
}

export const RoundItem: React.FC<RoundItemProps> = ({ round, index }) => {
  return (
    <div className="p-3 bg-gray-50 rounded-md">
      <div className="flex justify-between items-start">
        <h4 className="font-medium">Ronda {index + 1}</h4>
        <span className="text-sm text-gray-500">
          {new Date(round.created).toLocaleTimeString()}
        </span>
      </div>
      <ul className="mt-1 list-disc list-inside text-sm">
        {round.items.map((item, i) => (
          <li key={i}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};