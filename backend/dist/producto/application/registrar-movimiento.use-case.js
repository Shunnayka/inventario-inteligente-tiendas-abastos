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
exports.RegistrarMovimientoUseCase = void 0;
const common_1 = require("@nestjs/common");
const producto_repository_port_1 = require("../domain/ports/producto.repository.port");
const movimiento_repository_port_1 = require("../domain/ports/movimiento.repository.port");
let RegistrarMovimientoUseCase = class RegistrarMovimientoUseCase {
    constructor(productoRepo, movimientoRepo) {
        this.productoRepo = productoRepo;
        this.movimientoRepo = movimientoRepo;
    }
    async ejecutar(input) {
        const producto = await this.productoRepo.buscarPorId(input.idProducto);
        if (!producto)
            throw new common_1.NotFoundException('Producto no encontrado.');
        let nuevoStock = producto.stockActual;
        if (input.tipo === 'SALIDA') {
            if (input.cantidad > producto.stockActual) {
                throw new common_1.BadRequestException('Stock insuficiente para registrar la salida.');
            }
            nuevoStock -= input.cantidad;
        }
        else {
            nuevoStock += input.cantidad;
        }
        await this.movimientoRepo.registrar({
            idProducto: input.idProducto,
            idUsuario: input.idUsuario,
            tipo: input.tipo,
            cantidad: input.cantidad,
            origen: input.origen,
        });
        return this.productoRepo.actualizarStock(input.idProducto, nuevoStock);
    }
};
exports.RegistrarMovimientoUseCase = RegistrarMovimientoUseCase;
exports.RegistrarMovimientoUseCase = RegistrarMovimientoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(producto_repository_port_1.PRODUCTO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(movimiento_repository_port_1.MOVIMIENTO_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], RegistrarMovimientoUseCase);
//# sourceMappingURL=registrar-movimiento.use-case.js.map