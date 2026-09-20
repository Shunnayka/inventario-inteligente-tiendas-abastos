export interface ComandoInterpretado {
    accion: 'VENDER' | 'INGRESAR' | 'CONSULTAR';
    cantidad: number | null;
    nombreProducto: string;
}
export declare function interpretarComando(transcripcion: string): ComandoInterpretado | null;
