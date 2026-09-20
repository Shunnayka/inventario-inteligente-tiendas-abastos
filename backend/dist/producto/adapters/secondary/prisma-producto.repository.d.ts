import { PrismaService } from '../../../prisma/prisma.service';
import type { ProductoDominio, ProductoRepositoryPort } from '../../domain/ports/producto.repository.port';
export declare class PrismaProductoRepository implements ProductoRepositoryPort {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listar(): Promise<ProductoDominio[]>;
    buscarPorId(idProducto: number): Promise<ProductoDominio | null>;
    buscarPorCodigoBarras(codigo: string): Promise<ProductoDominio | null>;
    buscarPorNombreParcial(nombre: string): Promise<ProductoDominio[]>;
    crear(datos: {
        idCategoria: number;
        codigoBarras: string;
        nombre: string;
        precioVenta: number;
        stockActual: number;
        stockMinimo: number;
    }): Promise<ProductoDominio>;
    actualizarStock(idProducto: number, nuevoStock: number): Promise<ProductoDominio>;
}
