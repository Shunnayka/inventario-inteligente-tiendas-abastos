// hooks/useProductos.ts
import { useCallback, useEffect, useState } from 'react';
import { productoService } from '../services/productoService';
import type { MovimientoInventarioInput, NuevoProducto, Producto } from '../types';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await productoService.listar();
      setProductos(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const crearProducto = useCallback(async (nuevo: NuevoProducto) => {
    const creado = await productoService.crear(nuevo);
    setProductos((prev) => [...prev, creado]);
    return creado;
  }, []);

  const registrarMovimiento = useCallback(
    async (idProducto: number, movimiento: MovimientoInventarioInput) => {
      const actualizado = await productoService.registrarMovimiento(idProducto, movimiento);
      setProductos((prev) => prev.map((p) => (p.idProducto === idProducto ? actualizado : p)));
      return actualizado;
    },
    [],
  );

  const productosCriticos = productos.filter((p) => p.stockActual <= p.stockMinimo);

  return { productos, productosCriticos, cargando, error, recargar, crearProducto, registrarMovimiento };
}