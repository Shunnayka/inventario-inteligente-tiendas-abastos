// types/index.ts
// Contratos compartidos entre la capa de servicios y las vistas.
// Estos tipos no dependen de React ni del DOM: son igual de válidos
// si mañana los importa una pantalla de React Native o un renderer de Electron.

export interface Usuario {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: 'ADMINISTRADOR' | 'TENDERO';
}

export interface Producto {
  idProducto: number;
  idCategoria: number;
  codigoBarras: string;
  nombre: string;
  precioVenta: number;
  stockActual: number;
  stockMinimo: number;
}

export type NuevoProducto = Omit<Producto, 'idProducto'>;

export type TipoMovimiento = 'ENTRADA' | 'SALIDA' | 'AJUSTE';
export type OrigenMovimiento = 'MANUAL' | 'ESCANER' | 'VOZ';

export interface MovimientoInventarioInput {
  cantidad: number;
  tipo: TipoMovimiento;
  origen: OrigenMovimiento;
}

export interface AlertaPrediccion {
  idAlerta: number;
  idProducto: number;
  nombreProducto: string;
  diasRestantes: number;
  nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
}

export interface ComandoVozResultado {
  exito: boolean;
  mensaje: string;
  producto?: Producto;
}