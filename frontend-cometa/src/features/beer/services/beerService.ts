import { Stock } from '@/domain/models/beer';

export class BeerService {
  filterAvailableBeers(stock: Stock): Stock {
    return {
      ...stock,
      beers: stock.beers.filter(beer => beer.quantity > 0)
    };
  }

  getBeerPriceMap(stock: Stock): Record<string, number> {
    return stock.beers.reduce((acc, beer) => {
      acc[beer.name] = beer.price;
      return acc;
    }, {} as Record<string, number>);
  }
}