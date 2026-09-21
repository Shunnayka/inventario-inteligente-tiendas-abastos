"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const os_1 = require("os");
const app_module_1 = require("./app.module");
function obtenerIpLocal() {
    const interfaces = (0, os_1.networkInterfaces)();
    for (const nombre of Object.keys(interfaces)) {
        for (const iface of interfaces[nombre] ?? []) {
            if (iface.family === 'IPv4' && !iface.internal)
                return iface.address;
        }
    }
    return null;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
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
//# sourceMappingURL=main.js.map