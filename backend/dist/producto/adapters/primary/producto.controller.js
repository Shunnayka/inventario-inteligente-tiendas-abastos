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
exports.ProductoController = void 0;
const common_1 = require("@nestjs/common");
const listar_productos_use_case_1 = require("../../application/listar-productos.use-case");
const buscar_producto_por_codigo_use_case_1 = require("../../application/buscar-producto-por-codigo.use-case");
const registrar_producto_use_case_1 = require("../../application/registrar-producto.use-case");
const registrar_movimiento_use_case_1 = require("../../application/registrar-movimiento.use-case");
const registrar_producto_dto_1 = require("../../dto/registrar-producto.dto");
const registrar_movimiento_dto_1 = require("../../dto/registrar-movimiento.dto");
let ProductoController = class ProductoController {
    constructor(listarProductos, buscarPorCodigo, registrarProducto, registrarMovimiento) {
        this.listarProductos = listarProductos;
        this.buscarPorCodigo = buscarPorCodigo;
        this.registrarProducto = registrarProducto;
        this.registrarMovimiento = registrarMovimiento;
    }
    listar() {
        return this.listarProductos.ejecutar();
    }
    async buscarPorCodigoBarras(codigo) {
        const producto = await this.buscarPorCodigo.ejecutar({ codigoBarras: codigo });
        if (!producto)
            throw new common_1.NotFoundException('Producto no encontrado.');
        return producto;
    }
    crear(dto) {
        return this.registrarProducto.ejecutar(dto);
    }
    registrarMovimientoProducto(idProducto, dto) {
        return this.registrarMovimiento.ejecutar({ idProducto, ...dto });
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('codigo/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "buscarPorCodigoBarras", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registrar_producto_dto_1.RegistrarProductoDto]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "crear", null);
__decorate([
    (0, common_1.Post)(':id/movimientos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, registrar_movimiento_dto_1.RegistrarMovimientoDto]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "registrarMovimientoProducto", null);
exports.ProductoController = ProductoController = __decorate([
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [listar_productos_use_case_1.ListarProductosUseCase,
        buscar_producto_por_codigo_use_case_1.BuscarProductoPorCodigoUseCase,
        registrar_producto_use_case_1.RegistrarProductoUseCase,
        registrar_movimiento_use_case_1.RegistrarMovimientoUseCase])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map