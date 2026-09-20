import { Inject, Injectable } from '@nestjs/common';
import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../domain/ports/producto.repository.port';

export type ListarProductosInput = void;
export type ListarProductosOutput = ProductoDominio[];

@Injectable()
export class ListarProductosUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
  ) {}

  async ejecutar(): Promise<ListarProductosOutput> {
    return this.productoRepo.listar();
  }
}