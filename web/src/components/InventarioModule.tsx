// components/InventarioModule.tsx
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';
import type { NuevoProducto, Producto } from '@sgb/shared';

interface Props {
  productos: Producto[];
  cargando: boolean;
  onCrear: (nuevo: NuevoProducto) => Promise<Producto>;
}

export function InventarioModule({ productos, cargando, onCrear }: Props) {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [nombre, setNombre] = useState('');
  const [precioVenta, setPrecioVenta] = useState(1);
  const [stockActual, setStockActual] = useState(10);
  const [stockMinimo, setStockMinimo] = useState(5);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [escaneando, setEscaneando] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  // Escaneo real de cámara con @zxing/browser (funciona igual en el navegador
  // normal y dentro de Electron, que es Chromium con getUserMedia).
  useEffect(() => {
    if (!escaneando || !videoRef.current) return;

    let cancelado = false;
    const lector = new BrowserMultiFormatReader();

    lector
      .decodeFromVideoDevice(undefined, videoRef.current, (resultado, _error, controls) => {
        controlsRef.current = controls;
        if (cancelado || !resultado) return;
        const codigo = resultado.getText();
        setCodigoBarras(codigo);
        setNombre((prev) => prev || 'Producto escaneado');
        setMensaje(`Código leído: ${codigo}`);
        setEscaneando(false);
      })
      .catch((err: unknown) => {
        if (cancelado) return;
        const denegado = err instanceof Error && err.name === 'NotAllowedError';
        setMensaje(denegado ? 'Permiso de cámara denegado.' : 'No se pudo acceder a la cámara.');
        setEscaneando(false);
      });

    return () => {
      cancelado = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [escaneando]);

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
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : 'No se pudo registrar el producto.');
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

        {escaneando ? (
          <div className="escaner">
            <video ref={videoRef} className="escaner-video" muted playsInline />
            <button type="button" className="ghost" onClick={() => setEscaneando(false)}>
              Cancelar escaneo
            </button>
          </div>
        ) : (
          <button type="button" className="ghost" onClick={() => setEscaneando(true)}>
            📷 Escanear código de barras
          </button>
        )}

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
