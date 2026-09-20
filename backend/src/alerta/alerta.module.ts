import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AlertaController } from './adapters/primary/alerta.controller';
import { PrismaAlertaRepository } from './adapters/secondary/prisma-alerta.repository';
import { PrismaProductoRepository } from '../producto/adapters/secondary/prisma-producto.repository';
import { GenerarYListarAlertasUseCase } from './application/generar-y-listar-alertas.use-case';
import { ALERTA_REPOSITORY } from './domain/ports/alerta.repository.port';
import { PRODUCTO_REPOSITORY } from '../producto/domain/ports/producto.repository.port';

@Module({
  imports: [PrismaModule],
  controllers: [AlertaController],
  providers: [
    GenerarYListarAlertasUseCase,
    { provide: ALERTA_REPOSITORY, useClass: PrismaAlertaRepository },
    { provide: PRODUCTO_REPOSITORY, useClass: PrismaProductoRepository },
  ],
})
export class AlertaModule {}