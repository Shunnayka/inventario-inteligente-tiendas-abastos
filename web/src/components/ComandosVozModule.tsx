// components/ComandosVozModule.tsx
import { useState } from 'react';
import type { ComandoVozResultado } from '../types';

interface Props {
  procesando: boolean;
  ultimoResultado: ComandoVozResultado | null;
  onEjecutar: (transcripcion: string) => Promise<ComandoVozResultado>;
}

export function ComandosVozModule({ procesando, ultimoResultado, onEjecutar }: Props) {
  const [texto, setTexto] = useState('');
  const [microfonoActivo, setMicrofonoActivo] = useState(false);

  const ejecutar = async () => {
    if (!texto.trim()) return;
    await onEjecutar(texto.trim());
    setTexto('');
  };

  return (
    <section>
      <h1>Comandos de voz</h1>
      <div className="card">
        <p className="ayuda">
          Escribe un comando, por ejemplo: <em>vender 2 arroz</em> o <em>ingresar 5 arroz</em>. En el
          cliente móvil/escritorio este mismo cuadro se alimenta de la Web Speech API o del
          reconocimiento nativo, pero llama al mismo <code>comandoVozService.ejecutar()</code>.
        </p>
        <button type="button" className="ghost" onClick={() => setMicrofonoActivo((v) => !v)}>
          {microfonoActivo ? '🎙️ Escuchando… (simulado)' : '🎤 Activar micrófono'}
        </button>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe el comando aquí…"
          onKeyDown={(e) => e.key === 'Enter' && ejecutar()}
        />
        <button className="primary" onClick={ejecutar} disabled={procesando}>
          {procesando ? 'Procesando…' : 'Ejecutar comando'}
        </button>
        {ultimoResultado && (
          <p className={ultimoResultado.exito ? 'resultado-ok' : 'error-text'}>{ultimoResultado.mensaje}</p>
        )}
      </div>
    </section>
  );
}