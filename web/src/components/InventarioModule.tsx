// components/InventarioModule.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { NuevoProducto, Producto } from '../types';

interface Props {
  productos: Producto[];
  cargando: boolean;
  onCrear: (nuevo: NuevoProducto) => Promise<Producto>;
}

const codigosSimulados = ['7501234560004', '7501234560005', '7501234560006'];

export function InventarioModule({ productos, cargando, onCrear }: Props) {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [nombre, setNombre] = useState('');
  const [precioVenta, setPrecioVenta] = useState(1);
  const [stockActual, setStockActual] = useState(10);
  const [stockMinimo, setStockMinimo] = useState(5);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const simularEscaneo = () => {
    const codigo = codigosSimulados[Math.floor(Math.random() * codigosSimulados.length)];
    setCodigoBarras(codigo);
    setNombre((prev) => prev || 'Producto escaneado');
    setMensaje(`Código leído: ${codigo}`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!codigoBarras || !nombre) {
      setMensaje('Completa código y nombre.');
      return;
    }
    try {
      await onCrear({ idCategoria: 1, codigoBarras, nombre, precioVenta, stockActual, stockMinimo });
      setMensaje(`Producto "${nombre}" registrado.`);
      setCodigoBarras('');
      setNombre('');
    } catch (err: any) {
      setMensaje(err.message);
    }
  };

  return (
    <section>
      <h1>Inventario</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="fila">
          <div>
            <label>Código de barras</label>
            <input value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} />
          </div>
          <div>
            <label>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <label>Precio</label>
            <input type="number" step="0.01" value={precioVenta} onChange={(e) => setPrecioVenta(Number(e.target.value))} />
          </div>
        </div>
        <div className="fila">
          <div>
            <label>Stock inicial</label>
            <input type="number" value={stockActual} onChange={(e) => setStockActual(Number(e.target.value))} />
          </div>
          <div>
            <label>Stock mínimo</label>
            <input type="number" value={stockMinimo} onChange={(e) => setStockMinimo(Number(e.target.value))} />
          </div>
        </div>
        <button type="button" className="ghost" onClick={simularEscaneo}>
          📷 Simular escaneo de cámara
        </button>
        <button type="submit" className="primary">
          Registrar producto
        </button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>

      <div className="card">
        <table>
          <thead>
            <tr><th>Código</th><th>Producto</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {cargando && <tr><td colSpan={3}>Cargando…</td></tr>}
            {!cargando && productos.length === 0 && <tr><td colSpan={3}>Sin productos todavía.</td></tr>}
            {productos.map((p) => (
              <tr key={p.idProducto}>
                <td>{p.codigoBarras}</td>
                <td>{p.nombre}</td>
                <td className={p.stockActual <= p.stockMinimo ? 'low' : ''}>
                  {p.stockActual}{p.stockActual <= p.stockMinimo ? ' ⚠' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}