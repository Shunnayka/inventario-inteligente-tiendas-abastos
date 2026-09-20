import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductoController } from './adapters/primary/producto.controller';
import { PrismaProductoRepository } from './adapters/secondary/prisma-producto.repository';
import { PrismaMovimientoRepository } from './adapters/secondary/prisma-movimiento.repository';
import { ListarProductosUseCase } from './application/listar-productos.use-case';
import { BuscarProductoPorCodigoUseCase } from './application/buscar-producto-por-codigo.use-case';
import { RegistrarProductoUseCase } from './application/registrar-producto.use-case';
import { RegistrarMovimientoUseCase } from './application/registrar-movimiento.use-case';
import { PRODUCTO_REPOSITORY } from './domain/ports/producto.repository.port';
import { MOVIMIENTO_REPOSITORY } from './domain/ports/movimiento.repository.port';

@Module({
  imports: [PrismaModule],
  controllers: [ProductoController],
  providers: [
    ListarProductosUseCase,
    BuscarProductoPorCodigoUseCase,
    RegistrarProductoUseCase,
    RegistrarMovimientoUseCase,
    { provide: PRODUCTO_REPOSITORY, useClass: PrismaProductoRepository },
    { provide: MOVIMIENTO_REPOSITORY, useClass: PrismaMovimientoRepository },
  ],
})
export class ProductoModule {}