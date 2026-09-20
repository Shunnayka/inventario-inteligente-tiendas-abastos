import { IsIn, IsInt, IsPositive } from 'class-validator';

export class RegistrarMovimientoDto {
  @IsInt()
  idUsuario: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsIn(['ENTRADA', 'SALIDA', 'AJUSTE'])
  tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';

  @IsIn(['MANUAL', 'ESCANER', 'VOZ'])
  origen: 'MANUAL' | 'ESCANER' | 'VOZ';
}