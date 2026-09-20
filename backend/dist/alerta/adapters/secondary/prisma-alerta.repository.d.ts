import { PrismaService } from '../../../prisma/prisma.service';
import type { AlertaDominio, AlertaRepositoryPort } from '../../domain/ports/alerta.repository.port';
export declare class PrismaAlertaRepository implements AlertaRepositoryPort {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
