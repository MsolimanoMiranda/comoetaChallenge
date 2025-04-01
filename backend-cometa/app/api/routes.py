from fastapi import APIRouter, Depends, HTTPException

from ..domain.exceptions import BeerNotFoundError,InsufficientStockError
from ..services.bearerService import BeerService
from ..services.orderService import OrderService
from ..repositories.beerRespository import BeerRepository
from ..repositories.orderRespository import OrderRepository
from .schemas import StockResponse, OrderResponse, RoundRequest

router = APIRouter()

def get_beer_service():
    beer_repo = BeerRepository()
    return BeerService(beer_repo)

def get_order_service():
    beer_repo = BeerRepository()
    order_repo = OrderRepository()
    return OrderService(order_repo, beer_repo)

@router.get("/stock", response_model=StockResponse)
async def get_stock(service: BeerService = Depends(get_beer_service)):
    return service.get_stock()

@router.get("/order", response_model=OrderResponse)
async def get_order(service: OrderService = Depends(get_order_service)):
    return service.get_current_order()

@router.post("/order/round")
async def add_round(
    round_data: RoundRequest,
    service: OrderService = Depends(get_order_service)
):
    try:
        service.add_round(round_data.items)
        return {"message": "Ronda añadida correctamente"}
    except (BeerNotFoundError, InsufficientStockError) as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/order/{order_id}/pay")
async def pay_order(order_id: str):

    order = find_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.paid:
        raise HTTPException(status_code=400, detail="Order already paid")
    
    order.paid = True
    save_order(order)
    
    return {"message": "Order paid successfully"}