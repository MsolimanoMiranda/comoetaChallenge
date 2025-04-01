export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Round {
  created: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: {
    name: string;
    price_per_unit: number;
    total: number;
  }[];
  rounds: Round[];
}