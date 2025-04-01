import React from 'react';
import { render, screen } from '@testing-library/react';
import { BeerList } from '@/features/beer/components/BeerList';
import { Beer } from '@/domain/models/beer';

const mockBeers: Beer[] = [
  { name: 'Corona', price: 115, quantity: 2 },
  { name: 'Quilmes', price: 120, quantity: 0 },
  { name: 'Club Colombia', price: 110, quantity: 3 }
];

describe('BeerList Component', () => {
  it('renders all beers in a table', () => {
    render(<BeerList beers={mockBeers} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4); // Header + 3 beers
  });

  it('marks out-of-stock beers with red background', () => {
    render(<BeerList beers={mockBeers} />);
    
    const quilmesRow = screen.getByText('Quilmes').closest('tr');
    expect(quilmesRow).toHaveClass('bg-red-50');
    
    const coronaRow = screen.getByText('Corona').closest('tr');
    expect(coronaRow).not.toHaveClass('bg-red-50');
  });

  it('displays correct stock indicators', () => {
    render(<BeerList beers={mockBeers} />);
    
    expect(screen.getByText('2')).toHaveClass('bg-green-100');
    expect(screen.getByText('0')).toHaveClass('bg-red-100');
  });
});