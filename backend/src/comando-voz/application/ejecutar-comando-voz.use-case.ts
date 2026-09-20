import { Inject, Injectable } from '@nestjs/common';
import type { ProductoDominio, ProductoRepositoryPort } from '../../producto/domain/ports/producto.repository.port';
import { PRODUCTO_REPOSITORY } from '../../producto/domain/ports/producto.repository.port';
import type { MovimientoRepositoryPort } from '../../producto/domain/ports/movimiento.repository.port';
import { MOVIMIENTO_REPOSITORY } from '../../producto/domain/ports/movimiento.repository.port';
import type { ComandoVozRepositoryPort } from '../domain/ports/comando-voz.repository.port';
import { COMANDO_VOZ_REPOSITORY } from '../domain/ports/comando-voz.repository.port';
import { interpretarComando } from '../domain/interpretar-comando';

export interface EjecutarComandoVozInput {
  transcripcion: string;
  idUsuario: number;
}

export interface EjecutarComandoVozOutput {
  exito: boolean;
  mensaje: string;
  producto?: ProductoDominio;
}

@Injectable()
export class EjecutarComandoVozUseCase {
  constructor(
    @Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepositoryPort,
    @Inject(MOVIMIENTO_REPOSITORY) private readonly movimientoRepo: MovimientoRepositoryPort,
    @Inject(COMANDO_VOZ_REPOSITORY) private readonly comandoVozRepo: ComandoVozRepositoryPort,
  ) {}

  async ejecutar(input: EjecutarComandoVozInput): Promise<EjecutarComandoVozOutput> {
    const comando = interpretarComando(input.transcripcion);

    if (!comando) {
      await this.comandoVozRepo.guardar({
        idUsuario: input.idUsuario,
        idProducto: null,
        transcripcion: input.transcripcion,
        accion: 'DESCONOCIDO',
        resultado: 'FALLIDO',
      });
      return { exito: false, mensaje: 'No pude interpretar el comando.' };
    }

    const coincidencias = await this.productoRepo.buscarPorNombreParcial(comando.nombreProducto);
    const producto = coincidencias[0];

    if (!producto) {
      await this.comandoVozRepo.guardar({
        idUsuario: input.idUsuario,
        idProducto: null,
        transcripcion: input.transcripcion,
        accion: comando.accion,
        resultado: 'FALLIDO',
      });
      return { exito: false, mensaje: 'No encontré ese producto.' };
    }

    if (comando.accion === 'CONSULTAR') {
      await this.comandoVozRepo.guardar({
        idUsuario: input.idUsuario,
        idProducto: producto.idProducto,
        transcripcion: input.transcripcion,
        accion: comando.accion,
        resultado: 'EXITOSO',
      });
      return {
        exito: true,
        mensaje: `${producto.nombre}: quedan ${producto.stockActual} unidades.`,
        producto,
      };
    }

    const cantidad = comando.cantidad ?? 0;

    if (comando.accion === 'VENDER' && cantidad > producto.stockActual) {
      await this.comandoVozRepo.guardar({
        idUsuario: input.idUsuario,
        idProducto: producto.idProducto,
        transcripcion: input.transcripcion,
        accion: comando.accion,
        resultado: 'FALLIDO',
      });
      return { exito: false, mensaje: 'Stock insuficiente.' };
    }

    const nuevoStock =
      comando.accion === 'VENDER' ? producto.stockActual - cantidad : producto.stockActual + cantidad;

    await this.movimientoRepo.registrar({
      idProducto: producto.idProducto,
      idUsuario: input.idUsuario,
      tipo: comando.accion === 'VENDER' ? 'SALIDA' : 'ENTRADA',
      cantidad,
      origen: 'VOZ',
    });

    const productoActualizado = await this.productoRepo.actualizarStock(producto.idProducto, nuevoStock);

    await this.comandoVozRepo.guardar({
      idUsuario: input.idUsuario,
      idProducto: producto.idProducto,
      transcripcion: input.transcripcion,
      accion: comando.accion,
      resultado: 'EXITOSO',
    });

    return {
      exito: true,
      mensaje: `${comando.accion === 'VENDER' ? 'Venta registrada' : 'Ingreso registrado'} — ${productoActualizado.nombre} ahora tiene ${productoActualizado.stockActual} unidades.`,
      producto: productoActualizado,
    };
  }
}