// services/api.ts
import axios from 'axios';
import { tokenStore } from './tokenStore';

const BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) ||
  'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const mensaje =
      error?.response?.data?.message || error?.message || 'No se pudo conectar con el servidor.';
    return Promise.reject(new Error(mensaje));
  },
);