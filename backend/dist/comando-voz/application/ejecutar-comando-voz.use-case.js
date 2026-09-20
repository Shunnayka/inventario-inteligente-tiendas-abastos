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
exports.EjecutarComandoVozUseCase = void 0;
const common_1 = require("@nestjs/common");
const producto_repository_port_1 = require("../../producto/domain/ports/producto.repository.port");
const movimiento_repository_port_1 = require("../../producto/domain/ports/movimiento.repository.port");
const comando_voz_repository_port_1 = require("../domain/ports/comando-voz.repository.port");
const interpretar_comando_1 = require("../domain/interpretar-comando");
let EjecutarComandoVozUseCase = class EjecutarComandoVozUseCase {
    constructor(productoRepo, movimientoRepo, comandoVozRepo) {
        this.productoRepo = productoRepo;
        this.movimientoRepo = movimientoRepo;
        this.comandoVozRepo = comandoVozRepo;
    }
    async ejecutar(input) {
        const comando = (0, interpretar_comando_1.interpretarComando)(input.transcripcion);
        if (!comando) {
            await this.comandoVozRepo.guardar({
                idUsuario: input.idUsuario,
                idProducto: null,
                transcripcion: input.transcripcion,
                accion: 'DESCONOCIDO',
                resultado: 'FALLIDO',
            });
            return { exito: false, mensaje: 'No pude interpretar el comando.' };
        }
        const coincidencias = await this.productoRepo.buscarPorNombreParcial(comando.nombreProducto);
        const producto = coincidencias[0];
        if (!producto) {
            await this.comandoVozRepo.guardar({
                idUsuario: input.idUsuario,
                idProducto: null,
                transcripcion: input.transcripcion,
                accion: comando.accion,
                resultado: 'FALLIDO',
            });
            return { exito: false, mensaje: 'No encontré ese producto.' };
        }
        if (comando.accion === 'CONSULTAR') {
            await this.comandoVozRepo.guardar({
                idUsuario: input.idUsuario,
                idProducto: producto.idProducto,
                transcripcion: input.transcripcion,
                accion: comando.accion,
                resultado: 'EXITOSO',
            });
            return {
                exito: true,
                mensaje: `${producto.nombre}: quedan ${producto.stockActual} unidades.`,
                producto,
            };
        }
        const cantidad = comando.cantidad ?? 0;
        if (comando.accion === 'VENDER' && cantidad > producto.stockActual) {
            await this.comandoVozRepo.guardar({
                idUsuario: input.idUsuario,
                idProducto: producto.idProducto,
                transcripcion: input.transcripcion,
                accion: comando.accion,
                resultado: 'FALLIDO',
            });
            return { exito: false, mensaje: 'Stock insuficiente.' };
        }
        const nuevoStock = comando.accion === 'VENDER' ? producto.stockActual - cantidad : producto.stockActual + cantidad;
        await this.movimientoRepo.registrar({
            idProducto: producto.idProducto,
            idUsuario: input.idUsuario,
            tipo: comando.accion === 'VENDER' ? 'SALIDA' : 'ENTRADA',
            cantidad,
            origen: 'VOZ',
        });
        const productoActualizado = await this.productoRepo.actualizarStock(producto.idProducto, nuevoStock);
        await this.comandoVozRepo.guardar({
            idUsuario: input.idUsuario,
            idProducto: producto.idProducto,
            transcripcion: input.transcripcion,
            accion: comando.accion,
            resultado: 'EXITOSO',
        });
        return {
            exito: true,
            mensaje: `${comando.accion === 'VENDER' ? 'Venta registrada' : 'Ingreso registrado'} — ${productoActualizado.nombre} ahora tiene ${productoActualizado.stockActual} unidades.`,
            producto: productoActualizado,
        };
    }
};
exports.EjecutarComandoVozUseCase = EjecutarComandoVozUseCase;
exports.EjecutarComandoVozUseCase = EjecutarComandoVozUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(producto_repository_port_1.PRODUCTO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(movimiento_repository_port_1.MOVIMIENTO_REPOSITORY)),
    __param(2, (0, common_1.Inject)(comando_voz_repository_port_1.COMANDO_VOZ_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EjecutarComandoVozUseCase);
//# sourceMappingURL=ejecutar-comando-voz.use-case.js.map