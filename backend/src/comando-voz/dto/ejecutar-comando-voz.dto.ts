import { IsInt, IsString, MinLength } from 'class-validator';

export class EjecutarComandoVozDto {
  @IsString()
  @MinLength(3)
  transcripcion: string;

  @IsInt()
  idUsuario: number;
}