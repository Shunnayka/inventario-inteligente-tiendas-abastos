import { ListarProductosUseCase } from '../../application/listar-productos.use-case';
import { BuscarProductoPorCodigoUseCase } from '../../application/buscar-producto-por-codigo.use-case';
import { RegistrarProductoUseCase } from '../../application/registrar-producto.use-case';
import { RegistrarMovimientoUseCase } from '../../application/registrar-movimiento.use-case';
import { RegistrarProductoDto } from '../../dto/registrar-producto.dto';
import { RegistrarMovimientoDto } from '../../dto/registrar-movimiento.dto';
export declare class ProductoController {
    private readonly listarProductos;
    private readonly buscarPorCodigo;
    private readonly registrarProducto;
    private readonly registrarMovimiento;
    constructor(listarProductos: ListarProductosUseCase, buscarPorCodigo: BuscarProductoPorCodigoUseCase, registrarProducto: RegistrarProductoUseCase, registrarMovimiento: RegistrarMovimientoUseCase);
    listar(): Promise<import("../../application/listar-productos.use-case").ListarProductosOutput>;
    buscarPorCodigoBarras(codigo: string): Promise<import("../../domain/ports/producto.repository.port").ProductoDominio>;
    crear(dto: RegistrarProductoDto): Promise<import("../../domain/ports/producto.repository.port").ProductoDominio>;
    registrarMovimientoProducto(idProducto: number, dto: RegistrarMovimientoDto): Promise<import("../../domain/ports/producto.repository.port").ProductoDominio>;
}
