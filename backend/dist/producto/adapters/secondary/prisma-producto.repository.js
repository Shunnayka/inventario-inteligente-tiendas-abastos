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
exports.PrismaProductoRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
function aDominio(row) {
    return {
        idProducto: row.idProducto,
        idCategoria: row.idCategoria,
        codigoBarras: row.codigoBarras,
        nombre: row.nombre,
        precioVenta: Number(row.precioVenta),
        stockActual: row.stockActual,
        stockMinimo: row.stockMinimo,
    };
}
let PrismaProductoRepository = class PrismaProductoRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listar() {
        const rows = await this.prisma.producto.findMany();
        return rows.map(aDominio);
    }
    async buscarPorId(idProducto) {
        const row = await this.prisma.producto.findUnique({ where: { idProducto } });
        return row ? aDominio(row) : null;
    }
    async buscarPorCodigoBarras(codigo) {
        const row = await this.prisma.producto.findUnique({ where: { codigoBarras: codigo } });
        return row ? aDominio(row) : null;
    }
    async crear(datos) {
        const row = await this.prisma.producto.create({ data: datos });
        return aDominio(row);
    }
    async actualizarStock(idProducto, nuevoStock) {
        const row = await this.prisma.producto.update({
            where: { idProducto },
            data: { stockActual: nuevoStock },
        });
        return aDominio(row);
    }
};
exports.PrismaProductoRepository = PrismaProductoRepository;
exports.PrismaProductoRepository = PrismaProductoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductoRepository);
//# sourceMappingURL=prisma-producto.repository.js.map