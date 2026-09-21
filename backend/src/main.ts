import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { networkInterfaces } from 'os';
import { AppModule } from './app.module';

function obtenerIpLocal(): string | null {
  const interfaces = networkInterfaces();
  for (const nombre of Object.keys(interfaces)) {
    for (const iface of interfaces[nombre] ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return null;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // origin: true refleja el origen del request. Necesario para aceptar tanto el
  // origen "null"/file:// de Electron empaquetado como la IP LAN de la app móvil.
  app.enableCors({ origin: true });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port, '0.0.0.0');

  const ipLocal = obtenerIpLocal();
  console.log(`Backend corriendo en http://localhost:${port}`);
  if (ipLocal) {
    console.log(`Accesible en la red local en http://${ipLocal}:${port} (usar esta IP como EXPO_PUBLIC_API_URL en el móvil)`);
  }
}
bootstrap();