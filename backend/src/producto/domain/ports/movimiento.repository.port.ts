export const MOVIMIENTO_REPOSITORY = 'MOVIMIENTO_REPOSITORY';

export interface MovimientoRepositoryPort {
  registrar(datos: {
    idProducto: number;
    idUsuario: number;
    tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
    cantidad: number;
    origen: 'MANUAL' | 'ESCANER' | 'VOZ';
  }): Promise<void>;
}