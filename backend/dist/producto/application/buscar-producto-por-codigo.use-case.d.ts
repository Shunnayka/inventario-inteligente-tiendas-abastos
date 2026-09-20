import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
export interface BuscarProductoPorCodigoInput {
    codigoBarras: string;
}
export type BuscarProductoPorCodigoOutput = ProductoDominio | null;
export declare class BuscarProductoPorCodigoUseCase {
    private readonly productoRepo;
    constructor(productoRepo: ProductoRepositoryPort);
    ejecutar(input: BuscarProductoPorCodigoInput): Promise<BuscarProductoPorCodigoOutput>;
}
