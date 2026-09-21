import { api } from './api';
import { tokenStore } from './tokenStore';
import type { Usuario } from '../types';

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export const authService = {
  async login(correo: string, contrasena: string): Promise<Usuario> {
    const { data } = await api.post<LoginResponse>('/auth/login', { correo, contrasena });
    tokenStore.set(data.token);
    return data.usuario;
  },
  async registrar(nombre: string, correo: string, contrasena: string): Promise<Usuario> {
    const { data } = await api.post<Usuario>('/auth/register', { nombre, correo, contrasena });
    return data;
  },
  logout(): void {
    tokenStore.clear();
  },
};