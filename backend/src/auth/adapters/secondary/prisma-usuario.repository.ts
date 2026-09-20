import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { UsuarioDominio, UsuarioRepositoryPort } from '../../domain/ports/usuario.repository.port';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorCorreo(correo: string): Promise<UsuarioDominio | null> {
    const row = await this.prisma.usuario.findUnique({ where: { correo } });
    if (!row) return null;
    return {
      idUsuario: row.idUsuario,
      idRol: row.idRol,
      nombre: row.nombre,
      correo: row.correo,
      contrasenaHash: row.contrasenaHash,
      estado: row.estado,
    };
  }

  async crear(datos: {
    idRol: number;
    nombre: string;
    correo: string;
    contrasenaHash: string;
  }): Promise<UsuarioDominio> {
    const row = await this.prisma.usuario.create({
      data: {
        idRol: datos.idRol,
        nombre: datos.nombre,
        correo: datos.correo,
        contrasenaHash: datos.contrasenaHash,
      },
    });
    return {
      idUsuario: row.idUsuario,
      idRol: row.idRol,
      nombre: row.nombre,
      correo: row.correo,
      contrasenaHash: row.contrasenaHash,
      estado: row.estado,
    };
  }
}