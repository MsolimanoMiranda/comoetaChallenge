import { Stock } from '@/domain/models/beer';
import { API_BASE_URL } from '@/core/constants/app';

export class BeerApi {
  async getStock(): Promise<Stock> {
    const response = await fetch(`${API_BASE_URL}/stock`);
    if (!response.ok) {
      throw new Error('Failed to fetch beer stock');
    }
    return response.json();
  }
}