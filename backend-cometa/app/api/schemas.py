from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class BeerSchema(BaseModel):
    name: str
    price: float
    quantity: int

class StockResponse(BaseModel):
    last_updated: datetime
    beers: List[BeerSchema]

class OrderItemSchema(BaseModel):
    name: str
    quantity: int

class RoundSchema(BaseModel):
    created: datetime
    items: List[OrderItemSchema]

class OrderResponse(BaseModel):
    created: datetime
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[dict]
    rounds: List[RoundSchema]

class RoundRequest(BaseModel):
    items: List[OrderItemSchema]