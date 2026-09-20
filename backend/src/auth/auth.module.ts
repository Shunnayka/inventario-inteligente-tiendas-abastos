import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './adapters/primary/auth.controller';
import { PrismaUsuarioRepository } from './adapters/secondary/prisma-usuario.repository';
import { BcryptHashService } from './adapters/secondary/bcrypt-hash.service';
import { RegistrarUsuarioUseCase } from './application/registrar-usuario.use-case';
import { IniciarSesionUseCase } from './application/iniciar-sesion.use-case';
import { USUARIO_REPOSITORY } from './domain/ports/usuario.repository.port';
import { HASH_SERVICE } from './domain/ports/hash.service.port';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    RegistrarUsuarioUseCase,
    IniciarSesionUseCase,
    { provide: USUARIO_REPOSITORY, useClass: PrismaUsuarioRepository },
    { provide: HASH_SERVICE, useClass: BcryptHashService },
  ],
})
export class AuthModule {}