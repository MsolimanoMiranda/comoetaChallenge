from datetime import datetime
from typing import List

from app.domain.exceptions import OrderAlreadyPaidError

from ..domain.models import Order, Round

_current_order = Order(
    created=datetime.now(),
    rounds=[]
)

class OrderRepository:
    def get_order(self) -> Order:
        """Obtiene la orden actual"""
        return _current_order

    def add_round(self, round: Round):
        """Añade una ronda a la orden"""
        _current_order.rounds.append(round)

    def pay_order(self):
        """Marca la orden como pagada"""
        if _current_order.paid:
            raise OrderAlreadyPaidError("La orden ya está pagada")
        _current_order.paid = True