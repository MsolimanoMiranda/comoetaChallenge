import { OrderApi } from '@/infrastructure/api/orderApi';

describe('OrderApi', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('payOrder', () => {
    it('realiza la llamada POST correctamente', async () => {
      const mockResponse = { success: true, order: { id: '123', paid: true } };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const orderApi = new OrderApi();
      const result = await orderApi.payOrder('order-123');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/orders/order-123/pay',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('lanza error cuando la respuesta no es ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ detail: 'Error de pago' })
      });

      const orderApi = new OrderApi();

      await expect(orderApi.payOrder('order-123')).rejects.toThrow('Error de pago');
    });
  });
});