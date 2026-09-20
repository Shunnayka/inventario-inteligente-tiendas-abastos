"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComandoVozModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const comando_voz_controller_1 = require("./adapters/primary/comando-voz.controller");
const prisma_comando_voz_repository_1 = require("./adapters/secondary/prisma-comando-voz.repository");
const prisma_producto_repository_1 = require("../producto/adapters/secondary/prisma-producto.repository");
const prisma_movimiento_repository_1 = require("../producto/adapters/secondary/prisma-movimiento.repository");
const ejecutar_comando_voz_use_case_1 = require("./application/ejecutar-comando-voz.use-case");
const comando_voz_repository_port_1 = require("./domain/ports/comando-voz.repository.port");
const producto_repository_port_1 = require("../producto/domain/ports/producto.repository.port");
const movimiento_repository_port_1 = require("../producto/domain/ports/movimiento.repository.port");
let ComandoVozModule = class ComandoVozModule {
};
exports.ComandoVozModule = ComandoVozModule;
exports.ComandoVozModule = ComandoVozModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [comando_voz_controller_1.ComandoVozController],
        providers: [
            ejecutar_comando_voz_use_case_1.EjecutarComandoVozUseCase,
            { provide: comando_voz_repository_port_1.COMANDO_VOZ_REPOSITORY, useClass: prisma_comando_voz_repository_1.PrismaComandoVozRepository },
            { provide: producto_repository_port_1.PRODUCTO_REPOSITORY, useClass: prisma_producto_repository_1.PrismaProductoRepository },
            { provide: movimiento_repository_port_1.MOVIMIENTO_REPOSITORY, useClass: prisma_movimiento_repository_1.PrismaMovimientoRepository },
        ],
    })
], ComandoVozModule);
//# sourceMappingURL=comando-voz.module.js.map