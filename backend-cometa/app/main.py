from fastapi import FastAPI
from .api.routes import router as api_router
from .config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Bar Cometa API",
    description="API para gestión de pedidos de cerveza",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Reemplaza con tu URL de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Bienvenido al Bar Cometa API"}