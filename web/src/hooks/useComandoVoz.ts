import { useCallback, useState } from 'react';
import { comandoVozService } from '../services/comandoVozService';
import type { ComandoVozResultado } from '../types';

export function useComandoVoz() {
  const [ultimoResultado, setUltimoResultado] = useState<ComandoVozResultado | null>(null);
  const [procesando, setProcesando] = useState(false);

  const ejecutar = useCallback(async (transcripcion: string, idUsuario: number) => {
    setProcesando(true);
    try {
      const resultado = await comandoVozService.ejecutar(transcripcion, idUsuario);
      setUltimoResultado(resultado);
      return resultado;
    } catch (e: any) {
      const fallido: ComandoVozResultado = { exito: false, mensaje: e.message };
      setUltimoResultado(fallido);
      return fallido;
    } finally {
      setProcesando(false);
    }
  }, []);

  return { ultimoResultado, procesando, ejecutar };
}