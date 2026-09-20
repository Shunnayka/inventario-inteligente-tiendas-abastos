import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ComandoVozController } from './adapters/primary/comando-voz.controller';
import { PrismaComandoVozRepository } from './adapters/secondary/prisma-comando-voz.repository';
import { PrismaProductoRepository } from '../producto/adapters/secondary/prisma-producto.repository';
import { PrismaMovimientoRepository } from '../producto/adapters/secondary/prisma-movimiento.repository';
import { EjecutarComandoVozUseCase } from './application/ejecutar-comando-voz.use-case';
import { COMANDO_VOZ_REPOSITORY } from './domain/ports/comando-voz.repository.port';
import { PRODUCTO_REPOSITORY } from '../producto/domain/ports/producto.repository.port';
import { MOVIMIENTO_REPOSITORY } from '../producto/domain/ports/movimiento.repository.port';

@Module({
  imports: [PrismaModule],
  controllers: [ComandoVozController],
  providers: [
    EjecutarComandoVozUseCase,
    { provide: COMANDO_VOZ_REPOSITORY, useClass: PrismaComandoVozRepository },
    { provide: PRODUCTO_REPOSITORY, useClass: PrismaProductoRepository },
    { provide: MOVIMIENTO_REPOSITORY, useClass: PrismaMovimientoRepository },
  ],
})
export class ComandoVozModule {}