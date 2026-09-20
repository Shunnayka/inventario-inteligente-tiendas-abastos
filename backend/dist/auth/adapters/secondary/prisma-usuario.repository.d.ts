import { PrismaService } from '../../../prisma/prisma.service';
import type { UsuarioDominio, UsuarioRepositoryPort } from '../../domain/ports/usuario.repository.port';
export declare class PrismaUsuarioRepository implements UsuarioRepositoryPort {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buscarPorCorreo(correo: string): Promise<UsuarioDominio | null>;
    crear(datos: {
        idRol: number;
        nombre: string;
        correo: string;
        contrasenaHash: string;
    }): Promise<UsuarioDominio>;
}
