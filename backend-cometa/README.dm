# Bar Cometa - Backend API

API para gestión de pedidos de cerveza en el Bar Cometa.

## Requisitos

- Python 3.8+
- Pip

## Instalación

1. Instala las dependencias:
```bash
pip install -r requirements.txt


2. test 
pytest

3. Inicia la aplicación
uvicorn app.main:app --reload

 Services

GET http://localhost:8000/api/stock
GET http://localhost:8000/api/order
POST http://localhost:8000/api/order/round con body JSON:
{
    "items": [
        {"name": "Corona", "quantity": 1},
        {"name": "Club Colombia", "quantity": 1}
    ]
}



https://share.vidyard.com/watch/n2qk1a6N1mdvHmNXobpTmd?