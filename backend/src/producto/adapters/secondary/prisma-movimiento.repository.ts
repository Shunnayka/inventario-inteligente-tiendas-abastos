import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { MovimientoRepositoryPort } from '../../domain/ports/movimiento.repository.port';

@Injectable()
export class PrismaMovimientoRepository implements MovimientoRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(datos: {
    idProducto: number;
    idUsuario: number;
    tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
    cantidad: number;
    origen: 'MANUAL' | 'ESCANER' | 'VOZ';
  }): Promise<void> {
    await this.prisma.movimientoInventario.create({
      data: {
        idProducto: datos.idProducto,
        idUsuario: datos.idUsuario,
        tipo: datos.tipo,
        cantidad: datos.cantidad,
        origen: datos.origen,
      },
    });
  }
}