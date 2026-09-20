"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const alerta_controller_1 = require("./adapters/primary/alerta.controller");
const prisma_alerta_repository_1 = require("./adapters/secondary/prisma-alerta.repository");
const prisma_producto_repository_1 = require("../producto/adapters/secondary/prisma-producto.repository");
const generar_y_listar_alertas_use_case_1 = require("./application/generar-y-listar-alertas.use-case");
const alerta_repository_port_1 = require("./domain/ports/alerta.repository.port");
const producto_repository_port_1 = require("../producto/domain/ports/producto.repository.port");
let AlertaModule = class AlertaModule {
};
exports.AlertaModule = AlertaModule;
exports.AlertaModule = AlertaModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [alerta_controller_1.AlertaController],
        providers: [
            generar_y_listar_alertas_use_case_1.GenerarYListarAlertasUseCase,
            { provide: alerta_repository_port_1.ALERTA_REPOSITORY, useClass: prisma_alerta_repository_1.PrismaAlertaRepository },
            { provide: producto_repository_port_1.PRODUCTO_REPOSITORY, useClass: prisma_producto_repository_1.PrismaProductoRepository },
        ],
    })
], AlertaModule);
//# sourceMappingURL=alerta.module.js.map