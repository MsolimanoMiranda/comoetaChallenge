import { Order } from '@/domain/models/order';
import { Beer } from '@/domain/models/beer';

export class OrderService {

  calculateOrderTotals(order: Order, beers: Beer[]): Order {
    const beerPrices = this.getBeerPriceMap(beers);
    let subtotal = 0;
    const items: {
      name: string;
      price_per_unit: number;
      total: number;
    }[] = [];

    for (const round of order.rounds) {
      for (const item of round.items) {
        const price = beerPrices[item.name] || 0;
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        items.push({
          name: item.name,
          price_per_unit: price,
          total: itemTotal
        });
      }
    }

    const taxes = subtotal * 0.1;

    return {
      ...order,
      subtotal,
      taxes,
      items
    };
  }

 
  validateRoundItems(items: {name: string; quantity: number}[], beers: Beer[]): void {
    const beerStock = this.getBeerStockMap(beers);
    
    for (const item of items) {
      const available = beerStock[item.name] || 0;
      if (available < item.quantity) {
        throw new Error(`No hay suficiente stock de ${item.name}. Disponible: ${available}, Solicitado: ${item.quantity}`);
      }
    }
  }

 
  private getBeerPriceMap(beers: Beer[]): Record<string, number> {
    return beers.reduce((acc, beer) => {
      acc[beer.name] = beer.price;
      return acc;
    }, {} as Record<string, number>);
  }


  private getBeerStockMap(beers: Beer[]): Record<string, number> {
    return beers.reduce((acc, beer) => {
      acc[beer.name] = beer.quantity;
      return acc;
    }, {} as Record<string, number>);
  }
}