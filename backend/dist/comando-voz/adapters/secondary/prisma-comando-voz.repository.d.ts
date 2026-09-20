import { PrismaService } from '../../../prisma/prisma.service';
import type { ComandoVozRepositoryPort } from '../../domain/ports/comando-voz.repository.port';
export declare class PrismaComandoVozRepository implements ComandoVozRepositoryPort {
    private readonly prisma;
    constructor(prisma: PrismaService);
    guardar(datos: {
        idUsuario: number;
        idProducto: number | null;
        transcripcion: string;
        accion: string;
        resultado: 'EXITOSO' | 'FALLIDO';
    }): Promise<void>;
}
