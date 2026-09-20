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
exports.PrismaAlertaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
function aDominio(row) {
    return {
        idAlerta: row.idAlerta,
        idProducto: row.idProducto,
        consumoPromedioDiario: Number(row.consumoPromedioDiario),
        diasRestantes: row.diasRestantes,
        nivelCriticidad: row.nivelCriticidad,
        atendida: row.atendida,
    };
}
let PrismaAlertaRepository = class PrismaAlertaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buscarPorProducto(idProducto) {
        const row = await this.prisma.alertaPrediccion.findFirst({
            where: { idProducto, atendida: false },
            orderBy: { fechaGeneracion: 'desc' },
        });
        return row ? aDominio(row) : null;
    }
    async crear(datos) {
        const row = await this.prisma.alertaPrediccion.create({
            data: {
                idProducto: datos.idProducto,
                consumoPromedioDiario: datos.consumoPromedioDiario,
                diasRestantes: datos.diasRestantes,
                nivelCriticidad: datos.nivelCriticidad,
                atendida: false,
            },
        });
        return aDominio(row);
    }
    async actualizar(idAlerta, datos) {
        const row = await this.prisma.alertaPrediccion.update({
            where: { idAlerta },
            data: {
                consumoPromedioDiario: datos.consumoPromedioDiario,
                diasRestantes: datos.diasRestantes,
                nivelCriticidad: datos.nivelCriticidad,
                fechaGeneracion: new Date(),
                atendida: false,
            },
        });
        return aDominio(row);
    }
};
exports.PrismaAlertaRepository = PrismaAlertaRepository;
exports.PrismaAlertaRepository = PrismaAlertaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAlertaRepository);
//# sourceMappingURL=prisma-alerta.repository.js.map