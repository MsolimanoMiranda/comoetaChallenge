import { renderHook, waitFor } from '@testing-library/react';
import { useOrder } from '@/features/order/hooks/useOrder';
import { OrderApi } from '@/infrastructure/api/orderApi';
import { Beer } from '@/domain/models/beer';

jest.mock('@/infrastructure/api/orderApi');

const mockBeers: Beer[] = [
  { name: 'Corona', price: 115, quantity: 2 }
];

describe('useOrder Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('realiza el pago correctamente', async () => {
    const mockPayOrder = jest.fn().mockResolvedValue({
      success: true,
      order: { id: 'order-123', paid: true }
    });
    
    (OrderApi as jest.Mock).mockImplementation(() => ({
      getOrder: jest.fn(),
      addRound: jest.fn(),
      payOrder: mockPayOrder
    }));

    const { result } = renderHook(() => useOrder(mockBeers));
    
    await waitFor(() => {
      expect(result.current.order).toBeDefined();
    });

    await act(async () => {
      await result.current.payOrder();
    });

    expect(mockPayOrder).toHaveBeenCalledTimes(1);
    expect(result.current.order?.paid).toBe(true);
  });

  it('maneja errores durante el pago', async () => {
    const mockPayOrder = jest.fn().mockRejectedValue(new Error('Error de pago'));
    
    (OrderApi as jest.Mock).mockImplementation(() => ({
      getOrder: jest.fn(),
      addRound: jest.fn(),
      payOrder: mockPayOrder
    }));

    const { result } = renderHook(() => useOrder(mockBeers));

    await expect(result.current.payOrder()).rejects.toThrow('Error de pago');
  });
});