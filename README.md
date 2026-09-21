# SGB Inventario

Sistema de control de inventario inteligente para tiendas de abastos locales, con
escaneo real de códigos de barras por cámara, comandos de voz reales y alertas
predictivas de desabastecimiento. Backend en NestJS con arquitectura hexagonal
(puertos y adaptadores) y Prisma/PostgreSQL. Frontend en tres plataformas que
comparten la misma lógica de negocio: **web** (React + Vite), **escritorio**
(la misma web empaquetada con Electron) y **móvil** (React Native + Expo).

## Arquitectura del monorepo

El proyecto es un workspace de npm. `types`, `services` y `hooks` viven en un
único paquete compartido (`packages/shared`) del que dependen tanto la web
como el móvil — solo los componentes visuales están escritos por plataforma.

```
sgb-inventario/
├─ backend/            NestJS + Prisma + PostgreSQL
├─ web/                React + Vite (también es lo que empaqueta desktop/)
├─ desktop/            Electron (empaqueta el build de web/)
├─ mobile/             React Native + Expo
├─ packages/shared/    @sgb/shared: types, services y hooks reutilizados
└─ docs/               Documentación y material del taller
```

## Requisitos previos

- Node.js 20.x
- npm 10.x
- PostgreSQL 16
- Git
- Para compilar/instalar la app móvil en un dispositivo: Android Studio (Android)
  o Xcode en macOS (iOS) — ver [docs/instalacion_escritorio_movil.md](docs/instalacion_escritorio_movil.md)

## 1. Clonar el repositorio

```powershell
git clone <url-del-repositorio> sgb-inventario
cd sgb-inventario
```

## 2. Instalar dependencias

El repo es un workspace de npm: una sola instalación desde la raíz cubre
backend, web, desktop, mobile y `packages/shared`.

```powershell
npm install
```

Es una instalación pesada la primera vez (incluye Electron y Expo/React
Native). Si `npm install` avisa sobre paquetes con install scripts pendientes
de aprobación (Electron, Prisma, bcrypt, esbuild), corré:

```powershell
npm approve-scripts --allow-scripts-pending
npm approve-scripts <nombre-del-paquete>
```

## 3. Configurar el backend

Crea `backend/.env`:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/sgb_inventario"
```

Aplica las migraciones y genera el cliente Prisma:

```powershell
cd backend
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

Queda escuchando en `http://localhost:3000` **y** en tu IP de red local (el
backend la imprime en consola al arrancar, por ejemplo
`http://192.168.1.100:3000`) — esa segunda dirección es la que necesita la
app móvil para conectarse desde el celular. El CORS está configurado para
aceptar tanto el origen de Electron como el de la app móvil.

## 4. Correr el frontend web

En otra terminal:

```powershell
cd web
npm run dev
```

Opcional, `web/.env`:

```
VITE_API_URL=http://localhost:3000
```

## 5. Correr la app de escritorio (Electron)

```powershell
cd desktop
npm run dev
```

Levanta el dev server de `web/` y abre la ventana de Electron apuntando a él.
Para generar instaladores (`npm run dist:win` / `dist:mac` / `dist:linux`) y
más detalle sobre permisos de cámara/micrófono en cada sistema operativo, ver
[docs/instalacion_escritorio_movil.md](docs/instalacion_escritorio_movil.md).

## 6. Correr la app móvil (Expo)

```powershell
cd mobile
cp .env.example .env   # y poné ahí la IP de red local que imprimió el backend
npx expo start
```

El reconocimiento de voz nativo (`@react-native-voice/voice`) requiere un
*development build* propio — no funciona con la app genérica Expo Go. Ver la
guía completa (incluye cómo generar el development build) en
[docs/instalacion_escritorio_movil.md](docs/instalacion_escritorio_movil.md).

## 7. Probar el flujo completo

1. Abre `http://localhost:5173` (o la app de escritorio/móvil).
2. Regístrate (`/auth/register`) e inicia sesión (`/auth/login`).
3. En **Inventario**, registra un producto escaneando su código de barras con
   la cámara (lectura real vía `@zxing/browser` en web/desktop, o
   `expo-camera` en móvil).
4. En **Comandos de voz**, activa el micrófono y decí algo como
   "vender 2 arroz" o "ingresar 5 arroz" (reconocimiento real vía Web Speech
   API en web/desktop, o `@react-native-voice/voice` en móvil), o escribilo
   directamente, y confirmá que el stock cambia.
5. En **Alertas**, verifica que los productos con `stockActual <= stockMinimo`
   aparecen listados.

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
├─ packages/shared/
│  └─ src/
│     ├─ types/            (contratos compartidos)
│     ├─ services/         (capa axios + tokenStore, agnósticos de plataforma)
│     └─ hooks/            (useAuth, useProductos, useComandoVoz, useAlertas)
├─ web/
│  └─ src/
│     └─ components/       (pantallas: Login, Register, Dashboard, Inventario
│                            con escáner real, ComandosVoz con voz real, Alertas)
├─ desktop/
│  ├─ electron/            (main.ts: ventana, permisos de cámara/micrófono)
│  └─ scripts/             (build del renderer a partir de web/dist)
├─ mobile/
│  └─ src/
│     ├─ screens/          (mismas pantallas, reescritas para React Native)
│     ├─ navigation/       (stack de auth + tabs)
│     └─ context/          (provee los hooks compartidos a todas las pantallas)
└─ docs/
   ├─ instalacion_escritorio_movil.md
   ├─ Taller1_U3_SGB.pdf
   ├─ sgb_inventario.sql
   └─ mer.png
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
| Código compartido | `@sgb/shared` (npm workspace) |
| Web | React + Vite + TypeScript |
| Escritorio | Electron + electron-builder (empaqueta el build de web) |
| Móvil | React Native + Expo + React Navigation |
| Escaneo de códigos | `@zxing/browser` (web/desktop) · `expo-camera` (móvil) |
| Voz | Web Speech API (web/desktop) · `@react-native-voice/voice` + `expo-speech` (móvil) |
| HTTP | axios |

## Documentación

- 🖥️📱 Instalación de escritorio y móvil: [`docs/instalacion_escritorio_movil.md`](docs/instalacion_escritorio_movil.md)
- 📄 Caso resuelto del taller: [`docs/Taller1_U3_SGB.pdf`](docs/Taller1_U3_SGB.pdf)
- 🗄️ Script SQL (ME-R + modelo relacional): [`docs/sgb_inventario.sql`](docs/sgb_inventario.sql)
- 🗺️ Modelo entidad-relación: [`docs/mer.png`](docs/mer.png)
