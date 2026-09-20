"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_controller_1 = require("./adapters/primary/auth.controller");
const prisma_usuario_repository_1 = require("./adapters/secondary/prisma-usuario.repository");
const bcrypt_hash_service_1 = require("./adapters/secondary/bcrypt-hash.service");
const registrar_usuario_use_case_1 = require("./application/registrar-usuario.use-case");
const iniciar_sesion_use_case_1 = require("./application/iniciar-sesion.use-case");
const usuario_repository_port_1 = require("./domain/ports/usuario.repository.port");
const hash_service_port_1 = require("./domain/ports/hash.service.port");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            registrar_usuario_use_case_1.RegistrarUsuarioUseCase,
            iniciar_sesion_use_case_1.IniciarSesionUseCase,
            { provide: usuario_repository_port_1.USUARIO_REPOSITORY, useClass: prisma_usuario_repository_1.PrismaUsuarioRepository },
            { provide: hash_service_port_1.HASH_SERVICE, useClass: bcrypt_hash_service_1.BcryptHashService },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map