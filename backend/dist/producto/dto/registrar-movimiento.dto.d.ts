export declare class RegistrarMovimientoDto {
    idUsuario: number;
    cantidad: number;
    tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
    origen: 'MANUAL' | 'ESCANER' | 'VOZ';
}
