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
exports.RegistrarProductoUseCase = void 0;
const common_1 = require("@nestjs/common");
const producto_repository_port_1 = require("../domain/ports/producto.repository.port");
let RegistrarProductoUseCase = class RegistrarProductoUseCase {
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    async ejecutar(input) {
        const existente = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras);
        if (existente) {
            throw new common_1.ConflictException('Ya existe un producto con ese código de barras.');
        }
        return this.productoRepo.crear(input);
    }
};
exports.RegistrarProductoUseCase = RegistrarProductoUseCase;
exports.RegistrarProductoUseCase = RegistrarProductoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(producto_repository_port_1.PRODUCTO_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], RegistrarProductoUseCase);
//# sourceMappingURL=registrar-producto.use-case.js.map