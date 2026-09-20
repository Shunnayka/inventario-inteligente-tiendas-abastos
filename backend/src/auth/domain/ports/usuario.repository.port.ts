export interface UsuarioDominio {
  idUsuario: number;
  idRol: number;
  nombre: string;
  correo: string;
  contrasenaHash: string;
  estado: boolean;
}

export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';

export interface UsuarioRepositoryPort {
  buscarPorCorreo(correo: string): Promise<UsuarioDominio | null>;
  crear(datos: {
    idRol: number;
    nombre: string;
    correo: string;
    contrasenaHash: string;
  }): Promise<UsuarioDominio>;
}