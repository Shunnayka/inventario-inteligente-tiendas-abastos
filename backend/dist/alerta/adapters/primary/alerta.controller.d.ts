import { GenerarYListarAlertasUseCase } from '../../application/generar-y-listar-alertas.use-case';
export declare class AlertaController {
    private readonly generarYListarAlertas;
    constructor(generarYListarAlertas: GenerarYListarAlertasUseCase);
    listar(): Promise<import("../../application/generar-y-listar-alertas.use-case").GenerarYListarAlertasOutput>;
}
