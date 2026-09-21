import { useCallback, useState } from 'react';
import { authService } from '../services/authService';
import type { Usuario } from '../types';

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargandoRegistro, setCargandoRegistro] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState<string | null>(null);

  const login = useCallback(async (correo: string, contrasena: string) => {
    setCargando(true);
    setError(null);
    try {
      const u = await authService.login(correo, contrasena);
      setUsuario(u);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setCargando(false);
    }
  }, []);

  const registrar = useCallback(async (nombre: string, correo: string, contrasena: string) => {
    setCargandoRegistro(true);
    setErrorRegistro(null);
    try {
      await authService.registrar(nombre, correo, contrasena);
      return true;
    } catch (e: any) {
      setErrorRegistro(e.message);
      return false;
    } finally {
      setCargandoRegistro(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUsuario(null);
  }, []);

  return {
    usuario,
    cargando,
    error,
    login,
    logout,
    autenticado: !!usuario,
    registrar,
    cargandoRegistro,
    errorRegistro,
  };
}