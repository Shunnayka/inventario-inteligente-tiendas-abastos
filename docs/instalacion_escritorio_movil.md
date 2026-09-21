# Instalación — Escritorio (Electron) y Móvil (Expo)

Este documento complementa el `README.md` del proyecto. Asume que ya tienes el
backend y el frontend web funcionando (ver README). Acá se cubre lo nuevo:
la app de escritorio y la app móvil, que **comparten** el código de
`types/services/hooks` a través del paquete `packages/shared` (`@sgb/shared`).

## Antes de empezar: instalar el monorepo

El proyecto ahora es un workspace de npm. Desde la raíz del repo:

```powershell
npm install
```

Esto instala backend, web, desktop, mobile y `packages/shared` de una sola vez.
Es una instalación pesada la primera vez (incluye Electron y Expo/React
Native), puede tardar varios minutos.

Si `npm install` avisa sobre "packages have install scripts not yet covered by
allowScripts" (Electron, Prisma, bcrypt, esbuild), corré:

```powershell
npm approve-scripts --allow-scripts-pending
npm approve-scripts <nombre-del-paquete>
```

para cada paquete listado (o `--all` para hacerlo de una).

---

## Escritorio (Electron)

Carpeta: `desktop/`. Es una app Electron que **envuelve** el mismo frontend
web sin duplicarlo: en desarrollo carga el servidor de Vite; para distribuir,
compila `web/` y empaqueta ese resultado.

### Desarrollo

```powershell
cd desktop
npm run dev
```

Esto levanta el dev server de `web/` y abre la ventana de Electron apuntando
a él. Cambios en `web/src` se reflejan con hot-reload como en el navegador.

### Generar instaladores

```powershell
cd desktop
npm run dist:win     # instalador .exe (nsis) para Windows
npm run dist:linux   # .AppImage y .deb para Linux
npm run dist:mac     # .dmg para macOS
```

Los binarios quedan en `desktop/release/`.

**Limitación conocida:** un `.dmg` de macOS normalmente necesita compilarse
en una máquina macOS (o en CI con un runner macOS, p. ej. GitHub Actions).
Desde Windows se puede generar el `.exe` y, en la mayoría de los casos, los
paquetes de Linux, pero no un `.dmg` firmado y notarizado.

### Permisos de cámara y micrófono

`desktop/electron/main.ts` autoriza explícitamente los permisos de
`media` (cámara/micrófono) vía `session.setPermissionRequestHandler` —
sin esto, Electron los deniega por defecto y el escáner de código de barras
y los comandos de voz no funcionarían. En macOS además hace falta declarar
`NSCameraUsageDescription`/`NSMicrophoneUsageDescription` en el `Info.plist`
del build (ya configurado en `desktop/package.json` → `build.mac.extendInfo`).

En Windows, además de esto, el sistema operativo puede tener bloqueado el
acceso a cámara/micrófono a nivel de **Configuración de privacidad de
Windows** para "aplicaciones de escritorio" — si el permiso no aparece,
revisar ahí.

El escaneo de código de barras (`@zxing/browser`) y el reconocimiento de voz
(Web Speech API del navegador) son el mismo código que corre en la versión
web normal, porque Electron usa Chromium — lo único distinto es quién
autoriza el permiso de `getUserMedia`.

---

## Móvil (Expo)

Carpeta: `mobile/`. App Expo (React Native) que reutiliza `useAuth`,
`useProductos`, `useComandoVoz`, `useAlertas` y los `services/` de
`@sgb/shared` — solo las pantallas (`mobile/src/screens/`) están reescritas
para React Native.

### Configurar la URL del backend

El celular está en la red WiFi, **no** puede usar `localhost` para llegar al
backend que corre en tu computadora. El backend, al arrancar
(`npm run start:dev` en `backend/`), imprime su IP de red local:

```
Backend corriendo en http://localhost:3000
Accesible en la red local en http://192.168.1.100:3000 (usar esta IP como EXPO_PUBLIC_API_URL en el móvil)
```

Copiá `mobile/.env.example` a `mobile/.env` y poné esa IP:

```
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

(Requiere que el celular y la computadora estén en la misma red WiFi, y que
el firewall de Windows permita conexiones entrantes al puerto 3000.)

### Por qué Expo Go no alcanza

`@react-native-voice/voice` (reconocimiento de voz) es un **módulo nativo**:
no está incluido en la app genérica "Expo Go" de la tienda de aplicaciones.
Hace falta compilar un *development build* propio:

```powershell
cd mobile
npx expo install   # si no lo corriste antes
npx expo run:android    # compila e instala en un emulador/dispositivo Android conectado
# o, sin instalar Android Studio localmente:
npx eas build --profile development --platform android
```

Para iOS hace falta una Mac (o `eas build` en la nube, que sí podés usar
desde Windows con una cuenta de Expo).

Una vez instalado ese development build en el dispositivo (se instala una
sola vez, como cualquier app), corré:

```powershell
npx expo start --dev-client
```

y escaneá el QR con la cámara del celular — ahí sí abre la app con soporte
completo de cámara y voz nativos.

### Cámara y voz en el celular

- **Cámara**: `expo-camera` (`CameraView` con `onBarcodeScanned`) — pide
  permiso de cámara la primera vez que se abre el escáner en
  Inventario.
- **Voz**: `@react-native-voice/voice` reconoce el habla y lo convierte a
  texto (pide permiso de micrófono en Android antes de empezar a escuchar);
  `expo-speech` lee en voz alta el resultado del comando.
- Los permisos ya están declarados en `mobile/app.json` (iOS: usage
  descriptions; Android: `CAMERA` y `RECORD_AUDIO`).

---

## Qué quedó verificado automáticamente y qué falta probar a mano

Verificado por este entorno (compilación y arranque de procesos, sin
interfaz gráfica):

- Backend: arranca, registro/login funcionan, CORS refleja el origen.
- Web: build y typecheck sin errores con el código compartido nuevo.
- `packages/shared`: typecheck sin errores.
- Desktop: el proceso principal de Electron compila y el renderer (build de
  web) se genera correctamente.
- Mobile: typecheck sin errores; Metro compila el bundle completo (1115
  módulos) sin errores de resolución de `@sgb/shared` ni de las librerías
  nativas.

**No se pudo verificar desde este entorno** (herramienta de automatización
sin acceso a interfaz gráfica ni a un teléfono):

- El clic real de "conceder permiso de cámara/micrófono" en la ventana de
  Electron, y que el escaneo/voz funcionen visualmente ahí.
- Cualquier prueba en un celular físico (o emulador) con el development
  build de Expo: escaneo de código de barras real, reconocimiento de voz
  real, persistencia de sesión entre reinicios de la app.

Se recomienda probar ambos manualmente antes de dar el trabajo por cerrado.
