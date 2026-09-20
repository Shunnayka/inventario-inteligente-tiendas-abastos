import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductoModule],
})
export class AppModule {}