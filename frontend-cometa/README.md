# Bar Cometa - Frontend

Aplicación frontend para gestión de pedidos de cerveza.

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
├── app/               # Páginas y layout
├── features/          # Funcionalidades por dominio
├── domain/            # Modelos y lógica de negocio
├── infrastructure/    # Conexión con APIs externas
├── ui/                # Componentes reutilizables
├── contexts/          # Contextos de aplicación
└── core/              # Utilidades y constantes

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