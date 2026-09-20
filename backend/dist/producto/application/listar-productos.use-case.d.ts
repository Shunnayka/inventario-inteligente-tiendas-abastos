import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
export type ListarProductosInput = void;
export type ListarProductosOutput = ProductoDominio[];
export declare class ListarProductosUseCase {
    private readonly productoRepo;
    constructor(productoRepo: ProductoRepositoryPort);
    ejecutar(): Promise<ListarProductosOutput>;
}
