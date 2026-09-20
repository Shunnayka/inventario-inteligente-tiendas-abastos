import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { AlertaModule } from './alerta/alerta.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductoModule, AlertaModule],
})
export class AppModule {}