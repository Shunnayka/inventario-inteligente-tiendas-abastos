import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { ProductoDominio, ProductoRepositoryPort } from '../../domain/ports/producto.repository.port';

function aDominio(row: any): ProductoDominio {
  return {
    idProducto: row.idProducto,
    idCategoria: row.idCategoria,
    codigoBarras: row.codigoBarras,
    nombre: row.nombre,
    precioVenta: Number(row.precioVenta),
    stockActual: row.stockActual,
    stockMinimo: row.stockMinimo,
  };
}

@Injectable()
export class PrismaProductoRepository implements ProductoRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<ProductoDominio[]> {
    const rows = await this.prisma.producto.findMany();
    return rows.map(aDominio);
  }

  async buscarPorId(idProducto: number): Promise<ProductoDominio | null> {
    const row = await this.prisma.producto.findUnique({ where: { idProducto } });
    return row ? aDominio(row) : null;
  }

  async buscarPorCodigoBarras(codigo: string): Promise<ProductoDominio | null> {
    const row = await this.prisma.producto.findUnique({ where: { codigoBarras: codigo } });
    return row ? aDominio(row) : null;
  }

  async buscarPorNombreParcial(nombre: string): Promise<ProductoDominio[]> {
    const rows = await this.prisma.producto.findMany({
      where: { nombre: { contains: nombre, mode: 'insensitive' } },
    });
    return rows.map(aDominio);
  }

  async crear(datos: {
    idCategoria: number;
    codigoBarras: string;
    nombre: string;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
  }): Promise<ProductoDominio> {
    const row = await this.prisma.producto.create({ data: datos });
    return aDominio(row);
  }

  async actualizarStock(idProducto: number, nuevoStock: number): Promise<ProductoDominio> {
    const row = await this.prisma.producto.update({
      where: { idProducto },
      data: { stockActual: nuevoStock },
    });
    return aDominio(row);
  }
}