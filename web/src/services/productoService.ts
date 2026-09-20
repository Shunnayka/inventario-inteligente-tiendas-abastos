// services/productoService.ts
import { api } from './api';
import type { MovimientoInventarioInput, NuevoProducto, Producto } from '../types';

export const productoService = {
  async listar(): Promise<Producto[]> {
    const { data } = await api.get<Producto[]>('/productos');
    return data;
  },
  async buscarPorCodigoBarras(codigo: string): Promise<Producto | null> {
    const { data } = await api.get<Producto | null>(`/productos/codigo/${codigo}`);
    return data;
  },
  async crear(producto: NuevoProducto): Promise<Producto> {
    const { data } = await api.post<Producto>('/productos', producto);
    return data;
  },
  async registrarMovimiento(idProducto: number, movimiento: MovimientoInventarioInput): Promise<Producto> {
    const { data } = await api.post<Producto>(`/productos/${idProducto}/movimientos`, movimiento);
    return data;
  },
};