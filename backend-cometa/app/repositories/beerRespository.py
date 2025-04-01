from datetime import datetime
from typing import List, Optional
from ..domain.models import Beer

_in_dummy_stock = {
    "last_updated": datetime.now(),
    "beers": [
        Beer(name="Corona", price=115, quantity=2),
        Beer(name="Quilmes", price=120, quantity=0),
        Beer(name="Club Colombia", price=110, quantity=3)
    ]
}

class BeerRepository:
    def get_stock(self) -> dict:
        """Obtiene todo el stock de cervezas"""
        return _in_dummy_stock

    def find_by_name(self, name: str) -> Optional[Beer]:
        """Busca una cerveza por nombre"""
        for beer in _in_dummy_stock["beers"]:
            if beer.name == name:
                return beer
        return None

    def update_stock(self, beer: Beer):
        """Actualiza el stock de una cerveza"""
        for i, b in enumerate(_in_dummy_stock["beers"]):
            if b.name == beer.name:
                _in_dummy_stock["beers"][i] = beer
                _in_dummy_stock["last_updated"] = datetime.now()
                break