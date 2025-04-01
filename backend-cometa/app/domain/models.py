from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class Beer(BaseModel):
    name: str
    price: float
    quantity: int

    def reduce_stock(self, quantity: int):
        if self.quantity < quantity:
            raise ValueError(f"No hay suficiente stock de {self.name}")
        self.quantity -= quantity

class OrderItem(BaseModel):
    name: str
    quantity: int

class Round(BaseModel):
    created: datetime
    items: List[OrderItem]

class Order(BaseModel):
    created: datetime
    paid: bool = False
    subtotal: float = 0.0
    taxes: float = 0.0
    discounts: float = 0.0
    items: List[dict] = []
    rounds: List[Round] = []

    def calculate_totals(self, beer_prices: dict):
        self.subtotal = 0.0
        self.items = []
        
        for round in self.rounds:
            for item in round.items:
                if item.name not in beer_prices:
                    continue
                price = beer_prices[item.name]
                item_total = price * item.quantity
                self.subtotal += item_total
                self.items.append({
                    "name": item.name,
                    "price_per_unit": price,
                    "total": item_total
                })
        
        self.taxes = self.subtotal * 0.1 