// services/alertaService.ts
import { api } from './api';
import type { AlertaPrediccion } from '../types';

export const alertaService = {
  async listar(): Promise<AlertaPrediccion[]> {
    const { data } = await api.get<AlertaPrediccion[]>('/alertas');
    return data;
  },
};