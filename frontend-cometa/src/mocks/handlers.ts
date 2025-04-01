import { rest } from 'msw';
import { Stock, Beer } from '@/domain/models/beer';
import { Order } from '@/domain/models/order';

const mockBeers: Beer[] = [
  { name: 'Corona', price: 115, quantity: 2 },
  { name: 'Quilmes', price: 120, quantity: 0 },
  { name: 'Club Colombia', price: 110, quantity: 3 }
];

const mockStock: Stock = {
  last_updated: '2023-01-01T00:00:00Z',
  beers: mockBeers
};

const mockOrder: Order = {
  created: '2023-01-01T00:00:00Z',
  id: 'order-123',
  paid: false,
  subtotal: 0,
  taxes: 0,
  discounts: 0,
  items: [],
  rounds: []
};

const mockOrders: Record<string, Order> = {
  'order-123': {
    id: 'order-123',
    paid: false,
    subtotal: 100,
    taxes: 10,
    discounts: 0,
    items: [],
    rounds: [],
    created: '2023-01-01'
  }
};

export const handlers = [
  rest.get('http://localhost:8000/api/stock', (req, res, ctx) => {
    return res(ctx.json(mockStock));
  }),
  rest.get('http://localhost:8000/api/order', (req, res, ctx) => {
    return res(ctx.json(mockOrder));
  }),
  rest.post('http://localhost:8000/api/order/round', (req, res, ctx) => {
    return res(ctx.json({ message: 'Round added successfully' }));
  }),
  rest.post('http://localhost:8000/api/orders/:id/pay', (req, res, ctx) => {
    const  id  = req.params.id || '';
    const order = mockOrders[id.toString()];
    if (!order) {
      return res(
        ctx.status(404),
        ctx.json({ detail: 'Order not found' })
      );
    }
    
    if (order.paid) {
      return res(
        ctx.status(400),
        ctx.json({ detail: 'Order already paid' })
      );
    }
    
    order.paid = true;
    
    return res(
      ctx.json({ 
        success: true,
        order 
      })
    );
  })
];