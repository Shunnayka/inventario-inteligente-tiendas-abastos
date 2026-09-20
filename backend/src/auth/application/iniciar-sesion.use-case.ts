import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import type { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import { USUARIO_REPOSITORY } from '../domain/ports/usuario.repository.port';
import type { HashServicePort } from '../domain/ports/hash.service.port';
import { HASH_SERVICE } from '../domain/ports/hash.service.port';

const ROLES: Record<number, string> = { 1: 'ADMINISTRADOR', 2: 'TENDERO' };

export interface IniciarSesionInput {
  correo: string;
  contrasena: string;
}

export interface IniciarSesionOutput {
  token: string;
  usuario: { idUsuario: number; nombre: string; correo: string; rol: string };
}

@Injectable()
export class IniciarSesionUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarioRepo: UsuarioRepositoryPort,
    @Inject(HASH_SERVICE) private readonly hashService: HashServicePort,
  ) {}

  async ejecutar(input: IniciarSesionInput): Promise<IniciarSesionOutput> {
    const usuario = await this.usuarioRepo.buscarPorCorreo(input.correo);
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas.');
    const valido = await this.hashService.comparar(input.contrasena, usuario.contrasenaHash);
    if (!valido) throw new UnauthorizedException('Credenciales inválidas.');
    return {
      token: randomBytes(24).toString('hex'),
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: ROLES[usuario.idRol] ?? 'TENDERO',
      },
    };
  }
}