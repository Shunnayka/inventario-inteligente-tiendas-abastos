import { useState } from 'react';
import { useAuth, useProductos, useComandoVoz, useAlertas } from '@sgb/shared';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { Sidebar } from './components/Sidebar';
import type { Pantalla } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { InventarioModule } from './components/InventarioModule';
import { ComandosVozModule } from './components/ComandosVozModule';
import { AlertasPanel } from './components/AlertasPanel';
import './App.css';

type ModoAuth = 'login' | 'register';

export default function App() {
  const {
    usuario, cargando: autenticando, error: errorLogin, login, logout, autenticado,
    registrar, cargandoRegistro, errorRegistro,
  } = useAuth();
  const { productos, productosCriticos, cargando: cargandoProductos, crearProducto } = useProductos();
  const { ultimoResultado, procesando, ejecutar } = useComandoVoz();
  const { alertas } = useAlertas();
  const [pantalla, setPantalla] = useState<Pantalla>('dashboard');
  const [modoAuth, setModoAuth] = useState<ModoAuth>('login');

  const alertasActivas = alertas.length > 0 ? alertas.length : productosCriticos.length;

  const handleRegistrar = async (nombre: string, correo: string, contrasena: string) => {
    const ok = await registrar(nombre, correo, contrasena);
    if (ok) setModoAuth('login');
    return ok;
  };

  if (!autenticado) {
    return (
      <div className="app-shell solo-login">
        {modoAuth === 'login' ? (
          <LoginScreen
            onLogin={login}
            onIrARegistro={() => setModoAuth('register')}
            cargando={autenticando}
            error={errorLogin}
          />
        ) : (
          <RegisterScreen
            onRegistrar={handleRegistrar}
            onIrALogin={() => setModoAuth('login')}
            cargando={cargandoRegistro}
            error={errorRegistro}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar activa={pantalla} onCambiar={setPantalla} alertasActivas={alertasActivas} onSalir={logout} />
      <main>
        <p className="usuario-actual">Sesión: {usuario?.nombre ?? 'Tendero'}</p>

        {pantalla === 'dashboard' && (
          <Dashboard productos={productos} alertasActivas={alertasActivas} cargando={cargandoProductos} />
        )}
        {pantalla === 'inventario' && (
          <InventarioModule productos={productos} cargando={cargandoProductos} onCrear={crearProducto} />
        )}
        {pantalla === 'voz' && (
  <ComandosVozModule
    procesando={procesando}
    ultimoResultado={ultimoResultado}
    onEjecutar={(transcripcion) => ejecutar(transcripcion, usuario?.idUsuario ?? 2)}
  />
)}
        {pantalla === 'alertas' && <AlertasPanel productosCriticos={productosCriticos} />}
      </main>
    </div>
  );
}