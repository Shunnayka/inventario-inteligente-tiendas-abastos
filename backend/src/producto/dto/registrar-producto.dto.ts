import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class RegistrarProductoDto {
  @IsInt()
  idCategoria: number;

  @IsString()
  @MinLength(3)
  codigoBarras: string;

  @IsString()
  @MinLength(2)
  nombre: string;

  @IsNumber()
  @IsPositive()
  precioVenta: number;

  @IsInt()
  @Min(0)
  stockActual: number;

  @IsInt()
  @Min(0)
  stockMinimo: number;
}