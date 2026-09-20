import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
import type { MovimientoRepositoryPort } from '../domain/ports/movimiento.repository.port';
export interface RegistrarMovimientoInput {
    idProducto: number;
    idUsuario: number;
    cantidad: number;
    tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
    origen: 'MANUAL' | 'ESCANER' | 'VOZ';
}
export type RegistrarMovimientoOutput = ProductoDominio;
export declare class RegistrarMovimientoUseCase {
    private readonly productoRepo;
    private readonly movimientoRepo;
    constructor(productoRepo: ProductoRepositoryPort, movimientoRepo: MovimientoRepositoryPort);
    ejecutar(input: RegistrarMovimientoInput): Promise<RegistrarMovimientoOutput>;
}
