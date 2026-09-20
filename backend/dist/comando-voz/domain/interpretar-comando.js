"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpretarComando = interpretarComando;
function interpretarComando(transcripcion) {
    const texto = transcripcion.trim().toLowerCase();
    const consultarMatch = texto.match(/^(?:consultar|cu[aá]nto queda)\s+(?:de\s+)?(.+)$/);
    if (consultarMatch) {
        return { accion: 'CONSULTAR', cantidad: null, nombreProducto: consultarMatch[1].trim() };
    }
    const accionMatch = texto.match(/^(vender|ingresar)\s+(\d+)\s+(.+)$/);
    if (accionMatch) {
        const [, verbo, cantidadStr, producto] = accionMatch;
        return {
            accion: verbo === 'vender' ? 'VENDER' : 'INGRESAR',
            cantidad: parseInt(cantidadStr, 10),
            nombreProducto: producto.trim(),
        };
    }
    return null;
}
//# sourceMappingURL=interpretar-comando.js.map