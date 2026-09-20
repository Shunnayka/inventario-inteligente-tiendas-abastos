import { PrismaService } from '../../../prisma/prisma.service';
import type { MovimientoRepositoryPort } from '../../domain/ports/movimiento.repository.port';
export declare class PrismaMovimientoRepository implements MovimientoRepositoryPort {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registrar(datos: {
        idProducto: number;
        idUsuario: number;
        tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
        cantidad: number;
        origen: 'MANUAL' | 'ESCANER' | 'VOZ';
    }): Promise<void>;
}
