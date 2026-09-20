import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { ComandoVozRepositoryPort } from '../../domain/ports/comando-voz.repository.port';

@Injectable()
export class PrismaComandoVozRepository implements ComandoVozRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async guardar(datos: {
    idUsuario: number;
    idProducto: number | null;
    transcripcion: string;
    accion: string;
    resultado: 'EXITOSO' | 'FALLIDO';
  }): Promise<void> {
    await this.prisma.comandoVoz.create({
      data: {
        idUsuario: datos.idUsuario,
        idProducto: datos.idProducto ?? undefined,
        transcripcion: datos.transcripcion,
        accion: datos.accion,
        resultado: datos.resultado,
      },
    });
  }
}