import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegistrarUsuarioUseCase } from '../../application/registrar-usuario.use-case';
import { IniciarSesionUseCase } from '../../application/iniciar-sesion.use-case';
import { RegistrarUsuarioDto } from '../../dto/registrar-usuario.dto';
import { LoginDto } from '../../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registrarUsuario: RegistrarUsuarioUseCase,
    private readonly iniciarSesion: IniciarSesionUseCase,
  ) {}

  @Post('register')
  @HttpCode(201)
  registrar(@Body() dto: RegistrarUsuarioDto) {
    return this.registrarUsuario.ejecutar(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.iniciarSesion.ejecutar(dto);
  }
}