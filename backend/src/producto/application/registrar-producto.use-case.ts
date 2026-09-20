import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../domain/ports/producto.repository.port';

export interface RegistrarProductoInput {
  idCategoria: number;
  codigoBarras: string;
  nombre: string;
  precioVenta: number;
  stockActual: number;
  stockMinimo: number;
}
export type RegistrarProductoOutput = ProductoDominio;

@Injectable()
export class RegistrarProductoUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
  ) {}

  async ejecutar(input: RegistrarProductoInput): Promise<RegistrarProductoOutput> {
    const existente = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras);
    if (existente) {
      throw new ConflictException('Ya existe un producto con ese código de barras.');
    }
    return this.productoRepo.crear(input);
  }
}