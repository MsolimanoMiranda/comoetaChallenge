import { renderHook, waitFor } from '@testing-library/react';
import { useBeerStock } from '@/features/beer/hooks/useBeerStock';
import { server } from '@/mocks/server';
import { rest } from 'msw';

describe('useBeerStock Hook', () => {
  it('fetches beer stock successfully', async () => {
    const { result } = renderHook(() => useBeerStock());
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.stock).toEqual({
        last_updated: '2023-01-01T00:00:00Z',
        beers: [
          { name: 'Corona', price: 115, quantity: 2 },
          { name: 'Quilmes', price: 120, quantity: 0 },
          { name: 'Club Colombia', price: 110, quantity: 3 }
        ]
      });
    });
  });

  it('handles fetch error', async () => {
    server.use(
      rest.get('http://localhost:8000/api/stock', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    const { result } = renderHook(() => useBeerStock());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch beer stock');
    });
  });
});