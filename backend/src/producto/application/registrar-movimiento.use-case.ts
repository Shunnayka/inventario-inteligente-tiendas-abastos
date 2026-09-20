import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProductoDominio, ProductoRepositoryPort } from '../domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../domain/ports/producto.repository.port';
import type { MovimientoRepositoryPort } from '../domain/ports/movimiento.repository.port';
import { MOVIMIENTO_REPOSITORY } from '../domain/ports/movimiento.repository.port';

export interface RegistrarMovimientoInput {
  idProducto: number;
  idUsuario: number;
  cantidad: number;
  tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  origen: 'MANUAL' | 'ESCANER' | 'VOZ';
}
export type RegistrarMovimientoOutput = ProductoDominio;

@Injectable()
export class RegistrarMovimientoUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
    @Inject(MOVIMIENTO_REPOSITORY) private readonly movimientoRepo: MovimientoRepositoryPort,
  ) {}

  async ejecutar(input: RegistrarMovimientoInput): Promise<RegistrarMovimientoOutput> {
    const producto = await this.productoRepo.buscarPorId(input.idProducto);
    if (!producto) throw new NotFoundException('Producto no encontrado.');

    let nuevoStock = producto.stockActual;
    if (input.tipo === 'SALIDA') {
      if (input.cantidad > producto.stockActual) {
        throw new BadRequestException('Stock insuficiente para registrar la salida.');
      }
      nuevoStock -= input.cantidad;
    } else {
      nuevoStock += input.cantidad;
    }

    await this.movimientoRepo.registrar({
      idProducto: input.idProducto,
      idUsuario: input.idUsuario,
      tipo: input.tipo,
      cantidad: input.cantidad,
      origen: input.origen,
    });

    return this.productoRepo.actualizarStock(input.idProducto, nuevoStock);
  }
}