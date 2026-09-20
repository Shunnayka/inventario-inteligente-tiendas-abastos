import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegistrarUsuarioDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contrasena: string;
}