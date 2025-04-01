import { Order, OrderItem } from '@/domain/models/order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class OrderApi {
  async getOrder(): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/order`);
    if (!response.ok) {
      throw new Error('Failed to fetch current order');
    }
    return response.json();
  }

  async addRound(items: OrderItem[]): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/order/round`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to add round');
    }
  }

  async payOrder(orderId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/order/${orderId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' 
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.log(error)
      throw new Error('Se deberia crear una db para este metodo');
    }
  }
}