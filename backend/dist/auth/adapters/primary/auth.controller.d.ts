import { RegistrarUsuarioUseCase } from '../../application/registrar-usuario.use-case';
import { IniciarSesionUseCase } from '../../application/iniciar-sesion.use-case';
import { RegistrarUsuarioDto } from '../../dto/registrar-usuario.dto';
import { LoginDto } from '../../dto/login.dto';
export declare class AuthController {
    private readonly registrarUsuario;
    private readonly iniciarSesion;
    constructor(registrarUsuario: RegistrarUsuarioUseCase, iniciarSesion: IniciarSesionUseCase);
    registrar(dto: RegistrarUsuarioDto): Promise<import("../../application/registrar-usuario.use-case").RegistrarUsuarioOutput>;
    login(dto: LoginDto): Promise<import("../../application/iniciar-sesion.use-case").IniciarSesionOutput>;
}
