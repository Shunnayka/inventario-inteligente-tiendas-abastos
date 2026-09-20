// components/Sidebar.tsx
export type Pantalla = 'dashboard' | 'inventario' | 'voz' | 'alertas';

interface Props {
  activa: Pantalla;
  onCambiar: (p: Pantalla) => void;
  alertasActivas: number;
  onSalir: () => void;
}

const ITEMS: { id: Pantalla; etiqueta: string }[] = [
  { id: 'dashboard', etiqueta: 'Panel principal' },
  { id: 'inventario', etiqueta: 'Inventario' },
  { id: 'voz', etiqueta: 'Comandos de voz' },
  { id: 'alertas', etiqueta: 'Alertas' },
];

export function Sidebar({ activa, onCambiar, alertasActivas, onSalir }: Props) {
  return (
    <nav className="sidebar">
      <div className="brand">SGB Inventario</div>
      {ITEMS.map((item) => (
        <button key={item.id} className={activa === item.id ? 'nav-item activo' : 'nav-item'} onClick={() => onCambiar(item.id)}>
          {item.etiqueta}
          {item.id === 'alertas' && alertasActivas > 0 && <span className="badge">{alertasActivas}</span>}
        </button>
      ))}
      <button className="nav-item salir" onClick={onSalir}>
        Cerrar sesión
      </button>
    </nav>
  );
}