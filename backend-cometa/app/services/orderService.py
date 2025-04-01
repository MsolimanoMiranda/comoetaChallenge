from datetime import datetime
from typing import List
from ..domain.models import Order, Round, OrderItem
from ..domain.exceptions import InsufficientStockError, BeerNotFoundError
from ..repositories.orderRespository import OrderRepository
from ..repositories.beerRespository import BeerRepository

class OrderService:
    def __init__(self, order_repo: OrderRepository, beer_repo: BeerRepository):
        self.order_repo = order_repo
        self.beer_repo = beer_repo

    def get_current_order(self) -> Order:
        """Obtiene la orden actual con los totales calculados"""
        order = self.order_repo.get_order()
        beer_prices = {
            beer.name: beer.price 
            for beer in self.beer_repo.get_stock()["beers"]
        }
        order.calculate_totals(beer_prices)
        return order

    def add_round(self, items: List[OrderItem]):
        """Añade una nueva ronda a la orden"""
        for item in items:
            beer = self.beer_repo.find_by_name(item.name)
            if not beer:
                raise BeerNotFoundError(f"Cerveza {item.name} no encontrada")
            try:
                beer.reduce_stock(item.quantity)
                self.beer_repo.update_stock(beer)
            except ValueError as e:
                raise InsufficientStockError(str(e))

        new_round = Round(
            created=datetime.now(),
            items=items
        )
        self.order_repo.add_round(new_round)