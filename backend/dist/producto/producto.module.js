"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const producto_controller_1 = require("./adapters/primary/producto.controller");
const prisma_producto_repository_1 = require("./adapters/secondary/prisma-producto.repository");
const prisma_movimiento_repository_1 = require("./adapters/secondary/prisma-movimiento.repository");
const listar_productos_use_case_1 = require("./application/listar-productos.use-case");
const buscar_producto_por_codigo_use_case_1 = require("./application/buscar-producto-por-codigo.use-case");
const registrar_producto_use_case_1 = require("./application/registrar-producto.use-case");
const registrar_movimiento_use_case_1 = require("./application/registrar-movimiento.use-case");
const producto_repository_port_1 = require("./domain/ports/producto.repository.port");
const movimiento_repository_port_1 = require("./domain/ports/movimiento.repository.port");
let ProductoModule = class ProductoModule {
};
exports.ProductoModule = ProductoModule;
exports.ProductoModule = ProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [producto_controller_1.ProductoController],
        providers: [
            listar_productos_use_case_1.ListarProductosUseCase,
            buscar_producto_por_codigo_use_case_1.BuscarProductoPorCodigoUseCase,
            registrar_producto_use_case_1.RegistrarProductoUseCase,
            registrar_movimiento_use_case_1.RegistrarMovimientoUseCase,
            { provide: producto_repository_port_1.PRODUCTO_REPOSITORY, useClass: prisma_producto_repository_1.PrismaProductoRepository },
            { provide: movimiento_repository_port_1.MOVIMIENTO_REPOSITORY, useClass: prisma_movimiento_repository_1.PrismaMovimientoRepository },
        ],
    })
], ProductoModule);
//# sourceMappingURL=producto.module.js.map