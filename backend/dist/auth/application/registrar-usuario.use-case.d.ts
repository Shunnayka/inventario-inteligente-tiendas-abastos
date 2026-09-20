import type { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import type { HashServicePort } from '../domain/ports/hash.service.port';
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
export declare class RegistrarUsuarioUseCase {
    private readonly usuarioRepo;
    private readonly hashService;
    constructor(usuarioRepo: UsuarioRepositoryPort, hashService: HashServicePort);
    ejecutar(input: RegistrarUsuarioInput): Promise<RegistrarUsuarioOutput>;
}
