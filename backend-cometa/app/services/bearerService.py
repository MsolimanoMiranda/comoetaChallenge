from typing import Dict
from ..domain.exceptions import BeerNotFoundError
from ..repositories.beerRespository import BeerRepository

class BeerService:
    def __init__(self, beer_repo: BeerRepository):
        self.beer_repo = beer_repo

    def get_stock(self) -> Dict:
        """Obtiene el stock completo"""
        return self.beer_repo.get_stock()

    def get_beer_prices(self) -> Dict[str, float]:
        """Obtiene un diccionario de precios de cervezas"""
        stock = self.beer_repo.get_stock()
        return {beer.name: beer.price for beer in stock["beers"]}

    def check_beer_availability(self, name: str, quantity: int) -> bool:
        """Verifica si hay suficiente stock de una cerveza"""
        beer = self.beer_repo.find_by_name(name)
        if not beer:
            raise BeerNotFoundError(f"Cerveza {name} no encontrada")
        return beer.quantity >= quantity