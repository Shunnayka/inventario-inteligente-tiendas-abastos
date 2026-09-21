// Compila el frontend web (Vite) y copia el resultado a desktop/renderer,
// que es lo que Electron carga en producción (ver electron/main.ts).
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const desktopDir = path.resolve(__dirname, '..');
const webDir = path.resolve(desktopDir, '../web');
const webDist = path.join(webDir, 'dist');
const rendererDir = path.join(desktopDir, 'renderer');

console.log('[desktop] Compilando web (vite build)...');
execSync('npm run build', { cwd: webDir, stdio: 'inherit' });

if (!existsSync(webDist)) {
  throw new Error(`No se encontró ${webDist} tras el build de web.`);
}

if (existsSync(rendererDir)) rmSync(rendererDir, { recursive: true, force: true });
cpSync(webDist, rendererDir, { recursive: true });
console.log(`[desktop] Renderer copiado a ${rendererDir}`);
