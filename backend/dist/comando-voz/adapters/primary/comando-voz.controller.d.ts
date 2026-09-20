import { EjecutarComandoVozUseCase } from '../../application/ejecutar-comando-voz.use-case';
import { EjecutarComandoVozDto } from '../../dto/ejecutar-comando-voz.dto';
export declare class ComandoVozController {
    private readonly ejecutarComandoVoz;
    constructor(ejecutarComandoVoz: EjecutarComandoVozUseCase);
    ejecutar(dto: EjecutarComandoVozDto): Promise<import("../../application/ejecutar-comando-voz.use-case").EjecutarComandoVozOutput>;
}
