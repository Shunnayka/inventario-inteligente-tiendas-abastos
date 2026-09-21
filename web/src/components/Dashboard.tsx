// components/Dashboard.tsx
import type { Producto } from '@sgb/shared';

interface Props {
  productos: Producto[];
  alertasActivas: number;
  cargando: boolean;
}

export function Dashboard({ productos, alertasActivas, cargando }: Props) {
  const stockTotal = productos.reduce((acc, p) => acc + p.stockActual, 0);

  return (
    <section>
      <h1>Resumen del día</h1>
      <div className="grid-metricas">
        <div className="card metrica">
          <span className="metrica-valor">{cargando ? '…' : productos.length}</span>
          <span className="metrica-etiqueta">Productos registrados</span>
        </div>
        <div className="card metrica">
          <span className="metrica-valor">{cargando ? '…' : stockTotal}</span>
          <span className="metrica-etiqueta">Unidades en stock</span>
        </div>
        <div className="card metrica critico">
          <span className="metrica-valor">{cargando ? '…' : alertasActivas}</span>
          <span className="metrica-etiqueta">Alertas activas</span>
        </div>
      </div>
    </section>
  );
}