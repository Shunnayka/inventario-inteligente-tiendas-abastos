import type { ProductoDominio, ProductoRepositoryPort } from '../../producto/domain/ports/producto.repository.port';
import type { MovimientoRepositoryPort } from '../../producto/domain/ports/movimiento.repository.port';
import type { ComandoVozRepositoryPort } from '../domain/ports/comando-voz.repository.port';
export interface EjecutarComandoVozInput {
    transcripcion: string;
    idUsuario: number;
}
export interface EjecutarComandoVozOutput {
    exito: boolean;
    mensaje: string;
    producto?: ProductoDominio;
}
export declare class EjecutarComandoVozUseCase {
    private readonly productoRepo;
    private readonly movimientoRepo;
    private readonly comandoVozRepo;
    constructor(productoRepo: ProductoRepositoryPort, movimientoRepo: MovimientoRepositoryPort, comandoVozRepo: ComandoVozRepositoryPort);
    ejecutar(input: EjecutarComandoVozInput): Promise<EjecutarComandoVozOutput>;
}
