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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsuarioRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PrismaUsuarioRepository = class PrismaUsuarioRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buscarPorCorreo(correo) {
        const row = await this.prisma.usuario.findUnique({ where: { correo } });
        if (!row)
            return null;
        return {
            idUsuario: row.idUsuario,
            idRol: row.idRol,
            nombre: row.nombre,
            correo: row.correo,
            contrasenaHash: row.contrasenaHash,
            estado: row.estado,
        };
    }
    async crear(datos) {
        const row = await this.prisma.usuario.create({
            data: {
                idRol: datos.idRol,
                nombre: datos.nombre,
                correo: datos.correo,
                contrasenaHash: datos.contrasenaHash,
            },
        });
        return {
            idUsuario: row.idUsuario,
            idRol: row.idRol,
            nombre: row.nombre,
            correo: row.correo,
            contrasenaHash: row.contrasenaHash,
            estado: row.estado,
        };
    }
};
exports.PrismaUsuarioRepository = PrismaUsuarioRepository;
exports.PrismaUsuarioRepository = PrismaUsuarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsuarioRepository);
//# sourceMappingURL=prisma-usuario.repository.js.map