// services/api.ts
import axios from 'axios';
import { tokenStore } from './tokenStore';

// Cada plataforma resuelve su propia URL de API con su propio mecanismo de env vars
// (Vite usa import.meta.env, Expo/RN usa process.env) y la inyecta acá al arrancar,
// para que este archivo no dependa de sintaxis específica de un bundler.
let baseURL = 'http://localhost:3000';

export function setApiBaseUrl(url: string | undefined | null): void {
  if (url) baseURL = url;
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  config.baseURL = baseURL;
  return config;
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