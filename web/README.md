# SGB Inventario

Sistema de control de inventario inteligente para tiendas de abastos locales, con
escaneo de códigos de barras por cámara, comandos de voz y alertas predictivas de
desabastecimiento. Backend en NestJS con arquitectura hexagonal (puertos y
adaptadores) y Prisma/PostgreSQL; frontend en React (Web/Móvil compartiendo lógica
vía React Native Web).

## Requisitos previos

- Node.js 20.x
- npm 10.x
- PostgreSQL 16
- Git

## 1. Clonar el repositorio

```powershell
git clone <url-del-repositorio> sgb-inventario
cd sgb-inventario
```

## 2. Configurar el backend

```powershell
cd backend
npm install
```

Crea `backend/.env`:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/sgb_inventario"
```

Aplica las migraciones y genera el cliente Prisma:

```powershell
npx prisma migrate dev --name init
npx prisma generate
```

### Datos semilla

Con `npx prisma studio` o un cliente SQL, inserta:

**Roles**

| idRol | nombre |
|---|---|
| 1 | ADMINISTRADOR |
| 2 | TENDERO |

**Categorías**

| idCategoria | nombre |
|---|---|
| 1 | Abarrotes |
| 2 | Bebidas |
| 3 | Lácteos |

O por SQL directo:

```sql
INSERT INTO sgb_rol (id_rol, nombre) VALUES (1, 'ADMINISTRADOR'), (2, 'TENDERO');
INSERT INTO sgb_categoria (id_categoria, nombre) VALUES (1, 'Abarrotes'), (2, 'Bebidas'), (3, 'Lácteos');
```

### Arrancar el backend

```powershell
npm run start:dev
```

Queda escuchando en `http://localhost:3000`.

## 3. Configurar el frontend

En otra terminal:

```powershell
cd web
npm install
npx expo install react-dom react-native-web @expo/metro-runtime
```

Crea `web/.env`:

```
VITE_API_URL=http://localhost:3000
```

### Arrancar el frontend

```powershell
npm run dev
```

## 4. Probar el flujo completo

1. Abre `http://localhost:5173`.
2. Regístrate (`/auth/register`) e inicia sesión (`/auth/login`).
3. En **Inventario**, registra un producto (o simula un escaneo).
4. En **Comandos de voz**, escribe `vender 2 arroz` o `ingresar 5 arroz` y confirma que el stock cambia.
5. En **Alertas**, verifica que los productos con `stockActual <= stockMinimo` aparecen listados.

## Estructura del proyecto

```
sgb-inventario/
├─ backend/
│  ├─ prisma/schema.prisma
│  └─ src/
│     ├─ auth/            (registro, login — hexagonal)
│     ├─ producto/         (CRUD de productos y movimientos — hexagonal)
│     ├─ alerta/           (cálculo y listado de alertas — hexagonal)
│     ├─ comando-voz/      (interpretación de comandos — hexagonal)
│     └─ prisma/           (PrismaService compartido)
├─ web/
│  └─ src/
│     ├─ types/            (contratos compartidos)
│     ├─ services/         (capa axios, agnóstica de plataforma)
│     ├─ hooks/            (lógica de aplicación, agnóstica de plataforma)
│     └─ components/       (pantallas: Login, Register, Dashboard, Inventario, ComandosVoz, Alertas)
└─ docs/
   ├─ Taller1_U3_SGB_Inventario.pdf
   └─ sgb_inventario_script.sql
```

Cada módulo del backend sigue el mismo patrón: `domain/ports` (interfaces) →
`application` (casos de uso) → `adapters/primary` (controlador HTTP) →
`adapters/secondary` (repositorio Prisma).

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | NestJS + TypeScript |
| ORM / BD | Prisma 6 + PostgreSQL 16 |
| Arquitectura | Hexagonal (puertos y adaptadores) |
| Autenticación | bcrypt + token propio (sin JWT) |
| Validación | class-validator / class-transformer |
| Frontend Web/Móvil | React + Vite + TypeScript + React Native Web |
| HTTP | axios |

## Documentación del taller

- 📄 Caso resuelto completo: [`docs/Taller1_U3_SGB_Inventario.pdf`](docs/Taller1_U3_SGB_Inventario.pdf)
- 🗄️ Script SQL (ME-R + modelo relacional): [`docs/sgb_inventario_script.sql`](docs/sgb_inventario_script.sql)