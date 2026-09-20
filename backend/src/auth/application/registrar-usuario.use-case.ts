import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import { USUARIO_REPOSITORY } from '../domain/ports/usuario.repository.port';
import type { HashServicePort } from '../domain/ports/hash.service.port';
import { HASH_SERVICE } from '../domain/ports/hash.service.port';

const ID_ROL_TENDERO = 2;

export interface RegistrarUsuarioInput {
  nombre: string;
  correo: string;
  contrasena: string;
}

export interface RegistrarUsuarioOutput {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Injectable()
export class RegistrarUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarioRepo: UsuarioRepositoryPort,
    @Inject(HASH_SERVICE) private readonly hashService: HashServicePort,
  ) {}

  async ejecutar(input: RegistrarUsuarioInput): Promise<RegistrarUsuarioOutput> {
    const existente = await this.usuarioRepo.buscarPorCorreo(input.correo);
    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese correo.');
    }
    const contrasenaHash = await this.hashService.hash(input.contrasena);
    const usuario = await this.usuarioRepo.crear({
      idRol: ID_ROL_TENDERO,
      nombre: input.nombre,
      correo: input.correo,
      contrasenaHash,
    });
    return { idUsuario: usuario.idUsuario, nombre: usuario.nombre, correo: usuario.correo, rol: 'TENDERO' };
  }
}