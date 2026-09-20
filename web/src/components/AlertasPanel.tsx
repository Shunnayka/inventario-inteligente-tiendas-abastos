// components/AlertasPanel.tsx
import type { Producto } from '../types';

interface Props {
  productosCriticos: Producto[];
}

export function AlertasPanel({ productosCriticos }: Props) {
  return (
    <section>
      <h1>Alertas de desabastecimiento</h1>
      <div className="card">
        {productosCriticos.length === 0 && <p className="ayuda">Sin alertas por ahora.</p>}
        {productosCriticos.map((p) => (
          <div className="alerta-item" key={p.idProducto}>
            <span>{p.nombre} — quedan {p.stockActual} unidades (mínimo {p.stockMinimo})</span>
            <span className="badge-alerta">Reabastecer</span>
          </div>
        ))}
      </div>
    </section>
  );
}