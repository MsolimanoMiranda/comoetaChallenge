import pytest
from app.domain.models import OrderItem
from app.domain.exceptions import BeerNotFoundError, InsufficientStockError
from app.services.bearerService import BeerService
from app.services.orderService import OrderService
from app.repositories.beerRespository import BeerRepository
from app.repositories.orderRespository import OrderRepository

@pytest.fixture
def beer_repo():
    return BeerRepository()

@pytest.fixture
def order_repo():
    return OrderRepository()

@pytest.fixture
def beer_service(beer_repo):
    return BeerService(beer_repo)

@pytest.fixture
def order_service(order_repo, beer_repo):
    return OrderService(order_repo, beer_repo)

def test_add_round_success(order_service):
    # Añadir una ronda con cervezas disponibles
    items = [
        OrderItem(name="Corona", quantity=1),
        OrderItem(name="Club Colombia", quantity=1)
    ]
    order_service.add_round(items)
    
    order = order_service.get_current_order()
    assert len(order.rounds) == 3
    assert order.subtotal > 0

def test_add_round_insufficient_stock(order_service):
    # Intentar añadir una ronda con cerveza sin stock
    items = [OrderItem(name="Quilmes", quantity=1)]
    with pytest.raises(InsufficientStockError):
        order_service.add_round(items)

def test_add_round_beer_not_found(order_service):
    # Intentar añadir una ronda con cerveza que no existe
    items = [OrderItem(name="Inexistente", quantity=1)]
    with pytest.raises(BeerNotFoundError):
        order_service.add_round(items)