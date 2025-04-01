# Bar Cometa  - Video

[![Watch the video](https://img.youtube.com/vi/T-D1KVIuvjA/maxresdefault.jpg)](https://share.vidyard.com/watch/n2qk1a6N1mdvHmNXobpTmd?)


# Bar Cometa - Backend API

API para gestión de pedidos de cerveza en el Bar Cometa.

## Caracteristicas

- Arquitectura por capas (Clean Architecture)

- Uso de FastAPI

- Pruebas unitarias y de integración

- Documentación clara

- Convenciones de código Python

- Manejo de errores adecuado

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



# Bar Cometa - Frontend

Aplicación frontend para gestión de pedidos de cerveza .
Frontend con Arquitectura por Capas (Next.js + TypeScript + Tailwind CSS)

## Características
- Visualización de stock de cervezas
- Gestión de pedidos por rondas
- Cálculo automático de totales
- Interfaz responsive con Tailwind CSS
- Arquitectura limpia por capas

## Projecto

1. Configuración de estilos con Tailwind CSS
2. Tipado global para TypeScript
3. Contexto de aplicación para estado global
4. Configuración completa de testing
5. Mocking de API para desarrollo y pruebas
6. Documentación clara en el README
7. Estructura limpia y organizada

src/
  ->app/               # Páginas y layout
  ->features/          # Funcionalidades por dominio
  ->domain/            # Modelos y lógica de negocio
  ->infrastructure/    # Conexión con APIs externas
  ->ui/                # Componentes reutilizables
  ->contexts/          # Contextos de aplicación
  ->core/              # Utilidades y constantes

## Tecnologías
- Next.js 13
- TypeScript
- Tailwind CSS
- Jest + Testing Library
- MSW para mocking de API

## Requisitos
- Node.js 18+
- npm 9+

## Instalación
```bash
npm install