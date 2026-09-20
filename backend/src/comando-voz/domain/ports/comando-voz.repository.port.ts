export const COMANDO_VOZ_REPOSITORY = 'COMANDO_VOZ_REPOSITORY';

export interface ComandoVozRepositoryPort {
  guardar(datos: {
    idUsuario: number;
    idProducto: number | null;
    transcripcion: string;
    accion: string;
    resultado: 'EXITOSO' | 'FALLIDO';
  }): Promise<void>;
}