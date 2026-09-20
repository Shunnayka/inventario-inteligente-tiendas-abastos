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
exports.GenerarYListarAlertasUseCase = void 0;
const common_1 = require("@nestjs/common");
const producto_repository_port_1 = require("../../producto/domain/ports/producto.repository.port");
const alerta_repository_port_1 = require("../domain/ports/alerta.repository.port");
const calcular_nivel_criticidad_1 = require("../domain/calcular-nivel-criticidad");
const CONSUMO_PROMEDIO_DIARIO = 1;
let GenerarYListarAlertasUseCase = class GenerarYListarAlertasUseCase {
    constructor(productoRepo, alertaRepo) {
        this.productoRepo = productoRepo;
        this.alertaRepo = alertaRepo;
    }
    async ejecutar() {
        const productos = await this.productoRepo.listar();
        const criticos = productos.filter((p) => p.stockActual <= p.stockMinimo);
        const resultado = [];
        for (const producto of criticos) {
            const nivelCriticidad = (0, calcular_nivel_criticidad_1.calcularNivelCriticidad)(producto.stockActual, producto.stockMinimo);
            const diasRestantes = producto.stockActual;
            const existente = await this.alertaRepo.buscarPorProducto(producto.idProducto);
            const alerta = existente
                ? await this.alertaRepo.actualizar(existente.idAlerta, {
                    consumoPromedioDiario: CONSUMO_PROMEDIO_DIARIO,
                    diasRestantes,
                    nivelCriticidad,
                })
                : await this.alertaRepo.crear({
                    idProducto: producto.idProducto,
                    consumoPromedioDiario: CONSUMO_PROMEDIO_DIARIO,
                    diasRestantes,
                    nivelCriticidad,
                });
            resultado.push({
                idAlerta: alerta.idAlerta,
                idProducto: producto.idProducto,
                nombreProducto: producto.nombre,
                diasRestantes,
                nivelCriticidad,
            });
        }
        return resultado;
    }
};
exports.GenerarYListarAlertasUseCase = GenerarYListarAlertasUseCase;
exports.GenerarYListarAlertasUseCase = GenerarYListarAlertasUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(producto_repository_port_1.PRODUCTO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(alerta_repository_port_1.ALERTA_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], GenerarYListarAlertasUseCase);
//# sourceMappingURL=generar-y-listar-alertas.use-case.js.map