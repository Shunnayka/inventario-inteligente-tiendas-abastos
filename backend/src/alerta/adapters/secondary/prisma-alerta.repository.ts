import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { AlertaDominio, AlertaRepositoryPort } from '../../domain/ports/alerta.repository.port';

function aDominio(row: any): AlertaDominio {
  return {
    idAlerta: row.idAlerta,
    idProducto: row.idProducto,
    consumoPromedioDiario: Number(row.consumoPromedioDiario),
    diasRestantes: row.diasRestantes,
    nivelCriticidad: row.nivelCriticidad,
    atendida: row.atendida,
  };
}

@Injectable()
export class PrismaAlertaRepository implements AlertaRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorProducto(idProducto: number): Promise<AlertaDominio | null> {
    const row = await this.prisma.alertaPrediccion.findFirst({
      where: { idProducto, atendida: false },
      orderBy: { fechaGeneracion: 'desc' },
    });
    return row ? aDominio(row) : null;
  }

  async crear(datos: {
    idProducto: number;
    consumoPromedioDiario: number;
    diasRestantes: number;
    nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
  }): Promise<AlertaDominio> {
    const row = await this.prisma.alertaPrediccion.create({
      data: {
        idProducto: datos.idProducto,
        consumoPromedioDiario: datos.consumoPromedioDiario,
        diasRestantes: datos.diasRestantes,
        nivelCriticidad: datos.nivelCriticidad,
        atendida: false,
      },
    });
    return aDominio(row);
  }

  async actualizar(
    idAlerta: number,
    datos: {
      consumoPromedioDiario: number;
      diasRestantes: number;
      nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
    },
  ): Promise<AlertaDominio> {
    const row = await this.prisma.alertaPrediccion.update({
      where: { idAlerta },
      data: {
        consumoPromedioDiario: datos.consumoPromedioDiario,
        diasRestantes: datos.diasRestantes,
        nivelCriticidad: datos.nivelCriticidad,
        fechaGeneracion: new Date(),
        atendida: false,
      },
    });
    return aDominio(row);
  }
}