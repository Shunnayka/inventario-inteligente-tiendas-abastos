export interface AlertaDominio {
    idAlerta: number;
    idProducto: number;
    consumoPromedioDiario: number;
    diasRestantes: number;
    nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
    atendida: boolean;
}
export declare const ALERTA_REPOSITORY = "ALERTA_REPOSITORY";
export interface AlertaRepositoryPort {
    buscarPorProducto(idProducto: number): Promise<AlertaDominio | null>;
    crear(datos: {
        idProducto: number;
        consumoPromedioDiario: number;
        diasRestantes: number;
        nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
    }): Promise<AlertaDominio>;
    actualizar(idAlerta: number, datos: {
        consumoPromedioDiario: number;
        diasRestantes: number;
        nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
    }): Promise<AlertaDominio>;
}
