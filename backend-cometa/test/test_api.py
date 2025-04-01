from fastapi.testclient import TestClient
from app.main import app
from app.api.schemas import StockResponse, OrderResponse

client = TestClient(app)

def test_get_stock():
    response = client.get("/api/stock")
    assert response.status_code == 200
    stock = StockResponse(**response.json())
    assert len(stock.beers) > 0

def test_get_order():
    response = client.get("/api/order")
    assert response.status_code == 200
    order = OrderResponse(**response.json())
    assert isinstance(order.subtotal, float)

def test_add_round():
    round_data = {
        "items": [
            {"name": "Corona", "quantity": 1},
            {"name": "Club Colombia", "quantity": 1}
        ]
    }
    response = client.post("/api/order/round", json=round_data)
    assert response.status_code == 200
    assert "message" in response.json()

def test_add_round_invalid_beer():
    round_data = {
        "items": [
            {"name": "Cerveza Inexistente", "quantity": 1}
        ]
    }
    response = client.post("/api/order/round", json=round_data)
    assert response.status_code == 400
    assert "detail" in response.json()