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
exports.ComandoVozController = void 0;
const common_1 = require("@nestjs/common");
const ejecutar_comando_voz_use_case_1 = require("../../application/ejecutar-comando-voz.use-case");
const ejecutar_comando_voz_dto_1 = require("../../dto/ejecutar-comando-voz.dto");
let ComandoVozController = class ComandoVozController {
    constructor(ejecutarComandoVoz) {
        this.ejecutarComandoVoz = ejecutarComandoVoz;
    }
    ejecutar(dto) {
        return this.ejecutarComandoVoz.ejecutar(dto);
    }
};
exports.ComandoVozController = ComandoVozController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ejecutar_comando_voz_dto_1.EjecutarComandoVozDto]),
    __metadata("design:returntype", void 0)
], ComandoVozController.prototype, "ejecutar", null);
exports.ComandoVozController = ComandoVozController = __decorate([
    (0, common_1.Controller)('comandos-voz'),
    __metadata("design:paramtypes", [ejecutar_comando_voz_use_case_1.EjecutarComandoVozUseCase])
], ComandoVozController);
//# sourceMappingURL=comando-voz.controller.js.map