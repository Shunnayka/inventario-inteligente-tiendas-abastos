import type { ProductoRepositoryPort } from '../../producto/domain/ports/producto.repository.port';
import type { AlertaRepositoryPort } from '../domain/ports/alerta.repository.port';
export type GenerarYListarAlertasInput = void;
export interface AlertaResumen {
    idAlerta: number;
    idProducto: number;
    nombreProducto: string;
    diasRestantes: number;
    nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
}
export type GenerarYListarAlertasOutput = AlertaResumen[];
export declare class GenerarYListarAlertasUseCase {
    private readonly productoRepo;
    private readonly alertaRepo;
    constructor(productoRepo: ProductoRepositoryPort, alertaRepo: AlertaRepositoryPort);
    ejecutar(): Promise<GenerarYListarAlertasOutput>;
}
