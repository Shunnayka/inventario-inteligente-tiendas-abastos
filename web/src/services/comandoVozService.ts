// services/comandoVozService.ts
import { api } from './api';
import type { ComandoVozResultado } from '../types';

export const comandoVozService = {
  async ejecutar(transcripcion: string): Promise<ComandoVozResultado> {
    const { data } = await api.post<ComandoVozResultado>('/comandos-voz', { transcripcion });
    return data;
  },
};