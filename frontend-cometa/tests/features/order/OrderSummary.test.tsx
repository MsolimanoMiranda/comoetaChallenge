import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderSummary } from '@/features/order/components/OrderSummary';
import { Order } from '@/domain/models/order';

const mockOrder: Order = {
  id: 'order-123',
  created: '2023-01-01T00:00:00Z',
  paid: false,
  subtotal: 345,
  taxes: 34.5,
  items: [
    { name: 'Corona', price_per_unit: 115, total: 230 },
    { name: 'Club Colombia', price_per_unit: 110, total: 110 }
  ],
  rounds: [
    {
      created: '2023-01-01T00:10:00Z',
      items: [
        { name: 'Corona', quantity: 2 }
      ]
    }
  ]
};

describe('OrderSummary Component', () => {
  it('muestra el botón de pago desactivado cuando no hay rondas', () => {
    const emptyOrder = { ...mockOrder, rounds: [] };
    render(<OrderSummary order={emptyOrder} onPayOrder={jest.fn()} />);
    expect(screen.getByText('Pagar Orden')).toBeDisabled();
  });

  it('llama a onPayOrder al hacer clic', async () => {
    const mockPayOrder = jest.fn().mockResolvedValue({});
    render(<OrderSummary order={mockOrder} onPayOrder={mockPayOrder} />);
    
    fireEvent.click(screen.getByText('Pagar Orden'));
    
    await waitFor(() => {
      expect(mockPayOrder).toHaveBeenCalledTimes(1);
    });
  });

  it('muestra estado de carga durante el pago', async () => {
    const mockPayOrder = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<OrderSummary order={mockOrder} onPayOrder={mockPayOrder} />);
    
    fireEvent.click(screen.getByText('Pagar Orden'));
    
    expect(screen.getByText('Procesando...')).toBeInTheDocument();
  });

  it('muestra error cuando falla el pago', async () => {
    const mockPayOrder = jest.fn().mockRejectedValue(new Error('Error de pago'));
    render(<OrderSummary order={mockOrder} onPayOrder={mockPayOrder} />);
    
    fireEvent.click(screen.getByText('Pagar Orden'));
    
    await waitFor(() => {
      expect(screen.getByText('Error de pago')).toBeInTheDocument();
    });
  });

  it('muestra estado "Pagada" cuando order.paid es true', () => {
    const paidOrder = { ...mockOrder, paid: true };
    render(<OrderSummary order={paidOrder} onPayOrder={jest.fn()} />);
    expect(screen.getByText('Orden Pagada')).toBeInTheDocument();
    expect(screen.getByText('Orden Pagada')).toBeDisabled();
  });
});