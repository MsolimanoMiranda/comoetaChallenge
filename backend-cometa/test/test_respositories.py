import pytest
from datetime import datetime
from app.repositories.beerRespository import BeerRepository
from app.repositories.orderRespository import OrderRepository
from app.domain.models import OrderItem, Round

@pytest.fixture
def beer_repo():
    return BeerRepository()

@pytest.fixture
def order_repo():
    return OrderRepository()

def test_beer_repository_get_stock(beer_repo):
    stock = beer_repo.get_stock()
    assert "last_updated" in stock
    assert isinstance(stock["last_updated"], datetime)
    assert len(stock["beers"]) > 0

def test_beer_repository_find_by_name(beer_repo):
    beer = beer_repo.find_by_name("Corona")
    assert beer is not None
    assert beer.name == "Corona"

def test_order_repository_get_order(order_repo):
    order = order_repo.get_order()
    assert isinstance(order.created, datetime)
    assert order.paid is False

def test_order_repository_add_round(order_repo):
    initial_rounds = len(order_repo.get_order().rounds)
    new_round = Round(
        created=datetime.now(),
        items=[OrderItem(name="Corona", quantity=1)]
    )
    order_repo.add_round(new_round)
    assert len(order_repo.get_order().rounds) == initial_rounds + 1