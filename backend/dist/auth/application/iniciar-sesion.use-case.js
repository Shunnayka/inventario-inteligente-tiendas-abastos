"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IniciarSesionUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const usuario_repository_port_1 = require("../domain/ports/usuario.repository.port");
const hash_service_port_1 = require("../domain/ports/hash.service.port");
const ROLES = { 1: 'ADMINISTRADOR', 2: 'TENDERO' };
let IniciarSesionUseCase = class IniciarSesionUseCase {
    constructor(usuarioRepo, hashService) {
        this.usuarioRepo = usuarioRepo;
        this.hashService = hashService;
    }
    async ejecutar(input) {
        const usuario = await this.usuarioRepo.buscarPorCorreo(input.correo);
        if (!usuario)
            throw new common_1.UnauthorizedException('Credenciales inválidas.');
        const valido = await this.hashService.comparar(input.contrasena, usuario.contrasenaHash);
        if (!valido)
            throw new common_1.UnauthorizedException('Credenciales inválidas.');
        return {
            token: (0, crypto_1.randomBytes)(24).toString('hex'),
            usuario: {
                idUsuario: usuario.idUsuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: ROLES[usuario.idRol] ?? 'TENDERO',
            },
        };
    }
};
exports.IniciarSesionUseCase = IniciarSesionUseCase;
exports.IniciarSesionUseCase = IniciarSesionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(usuario_repository_port_1.USUARIO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(hash_service_port_1.HASH_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], IniciarSesionUseCase);
//# sourceMappingURL=iniciar-sesion.use-case.js.map