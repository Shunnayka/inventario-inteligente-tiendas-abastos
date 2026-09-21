// Levanta el vite dev server de web/ y luego abre Electron apuntando a él,
// para desarrollar la app de escritorio sin tener que reconstruir el renderer
// en cada cambio.
import { spawn, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import waitOn from 'wait-on';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const desktopDir = path.resolve(__dirname, '..');
const webDir = path.resolve(desktopDir, '../web');
const devServerUrl = 'http://localhost:5173';

console.log('[desktop] Compilando proceso principal de Electron...');
execSync('npm run build:main', { cwd: desktopDir, stdio: 'inherit' });

console.log('[desktop] Levantando vite dev server de web...');
const vite = spawn('npm', ['run', 'dev'], {
  cwd: webDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

const cerrarTodo = (codigo) => {
  vite.kill();
  process.exit(codigo ?? 0);
};

process.on('SIGINT', () => cerrarTodo(0));
process.on('SIGTERM', () => cerrarTodo(0));
vite.on('exit', (codigo) => cerrarTodo(codigo));

await waitOn({ resources: [devServerUrl], timeout: 30000 });

console.log('[desktop] Abriendo Electron...');
const electron = spawn('npx', ['electron', '.'], {
  cwd: desktopDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, DESKTOP_DEV_SERVER_URL: devServerUrl },
});

electron.on('exit', (codigo) => cerrarTodo(codigo));
