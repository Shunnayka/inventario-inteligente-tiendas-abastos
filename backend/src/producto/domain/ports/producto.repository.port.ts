export interface ProductoDominio {
  idProducto: number;
  idCategoria: number;
  codigoBarras: string;
  nombre: string;
  precioVenta: number;
  stockActual: number;
  stockMinimo: number;
}

export const PRODUCTO_REPOSITORY = 'PRODUCTO_REPOSITORY';

export interface ProductoRepositoryPort {
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