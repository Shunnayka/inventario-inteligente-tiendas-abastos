export function calcularNivelCriticidad(
  stockActual: number,
  stockMinimo: number,
): 'BAJO' | 'MEDIO' | 'ALTO' {
  if (stockActual === 0) return 'ALTO';
  if (stockActual <= stockMinimo / 2) return 'MEDIO';
  return 'BAJO';
}