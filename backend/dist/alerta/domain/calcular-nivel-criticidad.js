"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularNivelCriticidad = calcularNivelCriticidad;
function calcularNivelCriticidad(stockActual, stockMinimo) {
    if (stockActual === 0)
        return 'ALTO';
    if (stockActual <= stockMinimo / 2)
        return 'MEDIO';
    return 'BAJO';
}
//# sourceMappingURL=calcular-nivel-criticidad.js.map