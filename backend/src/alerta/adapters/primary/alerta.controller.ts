import { Controller, Get } from '@nestjs/common';
import { GenerarYListarAlertasUseCase } from '../../application/generar-y-listar-alertas.use-case';

@Controller('alertas')
export class AlertaController {
  constructor(private readonly generarYListarAlertas: GenerarYListarAlertasUseCase) {}

  @Get()
  listar() {
    return this.generarYListarAlertas.ejecutar();
  }
}