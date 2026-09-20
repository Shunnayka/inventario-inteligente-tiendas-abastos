import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
export interface RegistrarProductoInput {
    idCategoria: number;
    codigoBarras: string;
    nombre: string;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
}
export type RegistrarProductoOutput = ProductoDominio;
export declare class RegistrarProductoUseCase {
    private readonly productoRepo;
    constructor(productoRepo: ProductoRepositoryPort);
    ejecutar(input: RegistrarProductoInput): Promise<RegistrarProductoOutput>;
}
