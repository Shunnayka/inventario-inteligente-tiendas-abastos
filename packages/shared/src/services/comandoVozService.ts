import { api } from './api';
import type { ComandoVozResultado } from '../types';

export const comandoVozService = {
  async ejecutar(transcripcion: string, idUsuario: number): Promise<ComandoVozResultado> {
    const { data } = await api.post<ComandoVozResultado>('/comandos-voz', { transcripcion, idUsuario });
    return data;
  },
};