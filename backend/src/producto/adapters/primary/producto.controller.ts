import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ListarProductosUseCase } from '../../application/listar-productos.use-case';
import { BuscarProductoPorCodigoUseCase } from '../../application/buscar-producto-por-codigo.use-case';
import { RegistrarProductoUseCase } from '../../application/registrar-producto.use-case';
import { RegistrarMovimientoUseCase } from '../../application/registrar-movimiento.use-case';
import { RegistrarProductoDto } from '../../dto/registrar-producto.dto';
import { RegistrarMovimientoDto } from '../../dto/registrar-movimiento.dto';

@Controller('productos')
export class ProductoController {
  constructor(
    private readonly listarProductos: ListarProductosUseCase,
    private readonly buscarPorCodigo: BuscarProductoPorCodigoUseCase,
    private readonly registrarProducto: RegistrarProductoUseCase,
    private readonly registrarMovimiento: RegistrarMovimientoUseCase,
  ) {}

  @Get()
  listar() {
    return this.listarProductos.ejecutar();
  }

  @Get('codigo/:codigo')
  async buscarPorCodigoBarras(@Param('codigo') codigo: string) {
    const producto = await this.buscarPorCodigo.ejecutar({ codigoBarras: codigo });
    if (!producto) throw new NotFoundException('Producto no encontrado.');
    return producto;
  }

  @Post()
  crear(@Body() dto: RegistrarProductoDto) {
    return this.registrarProducto.ejecutar(dto);
  }

  @Post(':id/movimientos')
  registrarMovimientoProducto(
    @Param('id', ParseIntPipe) idProducto: number,
    @Body() dto: RegistrarMovimientoDto,
  ) {
    return this.registrarMovimiento.ejecutar({ idProducto, ...dto });
  }
}