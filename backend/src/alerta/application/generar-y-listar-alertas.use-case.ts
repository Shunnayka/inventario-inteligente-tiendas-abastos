import { Inject, Injectable } from '@nestjs/common';
import type { ProductoRepositoryPort } from '../../producto/domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../../producto/domain/ports/producto.repository.port';
import type { AlertaRepositoryPort } from '../domain/ports/alerta.repository.port';
import { ALERTA_REPOSITORY } from '../domain/ports/alerta.repository.port';
import { calcularNivelCriticidad } from '../domain/calcular-nivel-criticidad';

export type GenerarYListarAlertasInput = void;

export interface AlertaResumen {
  idAlerta: number;
  idProducto: number;
  nombreProducto: string;
  diasRestantes: number;
  nivelCriticidad: 'BAJO' | 'MEDIO' | 'ALTO';
}
export type GenerarYListarAlertasOutput = AlertaResumen[];

const CONSUMO_PROMEDIO_DIARIO = 1;

@Injectable()
export class GenerarYListarAlertasUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
    @Inject(ALERTA_REPOSITORY) private readonly alertaRepo: AlertaRepositoryPort,
  ) {}

  async ejecutar(): Promise<GenerarYListarAlertasOutput> {
    const productos = await this.productoRepo.listar();
    const criticos = productos.filter((p) => p.stockActual <= p.stockMinimo);

    const resultado: AlertaResumen[] = [];

    for (const producto of criticos) {
      const nivelCriticidad = calcularNivelCriticidad(producto.stockActual, producto.stockMinimo);
      const diasRestantes = producto.stockActual;

      const existente = await this.alertaRepo.buscarPorProducto(producto.idProducto);
      const alerta = existente
        ? await this.alertaRepo.actualizar(existente.idAlerta, {
            consumoPromedioDiario: CONSUMO_PROMEDIO_DIARIO,
            diasRestantes,
            nivelCriticidad,
          })
        : await this.alertaRepo.crear({
            idProducto: producto.idProducto,
            consumoPromedioDiario: CONSUMO_PROMEDIO_DIARIO,
            diasRestantes,
            nivelCriticidad,
          });

      resultado.push({
        idAlerta: alerta.idAlerta,
        idProducto: producto.idProducto,
        nombreProducto: producto.nombre,
        diasRestantes,
        nivelCriticidad,
      });
    }

    return resultado;
  }
}