import { Inject, Injectable } from '@nestjs/common';
import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../domain/ports/producto.repository.port';

export interface BuscarProductoPorCodigoInput {
  codigoBarras: string;
}
export type BuscarProductoPorCodigoOutput = ProductoDominio | null;

@Injectable()
export class BuscarProductoPorCodigoUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
  ) {}

  async ejecutar(input: BuscarProductoPorCodigoInput): Promise<BuscarProductoPorCodigoOutput> {
    return this.productoRepo.buscarPorCodigoBarras(input.codigoBarras);
  }
}