import type { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import type { HashServicePort } from '../domain/ports/hash.service.port';
export interface IniciarSesionInput {
    correo: string;
    contrasena: string;
}
export interface IniciarSesionOutput {
    token: string;
    usuario: {
        idUsuario: number;
        nombre: string;
        correo: string;
        rol: string;
    };
}
export declare class IniciarSesionUseCase {
    private readonly usuarioRepo;
    private readonly hashService;
    constructor(usuarioRepo: UsuarioRepositoryPort, hashService: HashServicePort);
    ejecutar(input: IniciarSesionInput): Promise<IniciarSesionOutput>;
}
