// hooks/useAlertas.ts
import { useCallback, useEffect, useState } from 'react';
import { alertaService } from '../services/alertaService';
import type { AlertaPrediccion } from '../types';

export function useAlertas() {
  const [alertas, setAlertas] = useState<AlertaPrediccion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    try {
      const data = await alertaService.listar();
      setAlertas(data);
      setError(null);
    } catch (e: any) {
      // El endpoint /alertas puede no estar implementado todavía; no
      // rompemos la pantalla, solo dejamos la lista vacía.
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { alertas, error, recargar };
}