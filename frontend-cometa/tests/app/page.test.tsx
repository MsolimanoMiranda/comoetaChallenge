import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '@/app/page';
import { server } from '@/mocks/server';
import { rest } from 'msw';

describe('Página Principal', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('permite pagar una orden', async () => {
    render(<Page />);
    
    // Espera a que cargue la orden
    await waitFor(() => {
      expect(screen.getByText('Pagar Orden')).toBeInTheDocument();
    });
    
    // Simula clic en pagar
    fireEvent.click(screen.getByText('Pagar Orden'));
    
    // Verifica que se actualice el estado
    await waitFor(() => {
      expect(screen.getByText('Orden Pagada')).toBeInTheDocument();
    });
  });

  it('muestra error cuando falla el pago', async () => {
    server.use(
      rest.post('http://localhost:8000/api/orders/:id/pay', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ detail: 'Payment failed' })
        );
      })
    );
    
    render(<Page />);
    
    await waitFor(() => {
      expect(screen.getByText('Pagar Orden')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Pagar Orden'));
    
    await waitFor(() => {
      expect(screen.getByText('Payment failed')).toBeInTheDocument();
    });
  });
});