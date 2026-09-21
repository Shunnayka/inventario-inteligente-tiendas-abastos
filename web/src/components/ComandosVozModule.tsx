import { useEffect, useRef, useState } from 'react';
import type { ComandoVozResultado } from '@sgb/shared';

interface Props {
  procesando: boolean;
  ultimoResultado: ComandoVozResultado | null;
  onEjecutar: (transcripcion: string) => Promise<ComandoVozResultado>;
}

// El navegador expone SpeechRecognition con prefijo en Chrome/Edge/Electron
// (Chromium) y sin soporte en Firefox; se detecta en tiempo de ejecución.
type SpeechRecognitionCtor = typeof SpeechRecognition;

function obtenerSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof SpeechRecognition !== 'undefined') return SpeechRecognition;
  if (typeof webkitSpeechRecognition !== 'undefined') return webkitSpeechRecognition;
  return null;
}

export function ComandosVozModule({ procesando, ultimoResultado, onEjecutar }: Props) {
  const [texto, setTexto] = useState('');
  const [escuchando, setEscuchando] = useState(false);
  const [errorVoz, setErrorVoz] = useState<string | null>(null);
  const reconocimientoRef = useRef<SpeechRecognition | null>(null);
  const soportaVoz = obtenerSpeechRecognitionCtor() !== null;

  useEffect(() => {
    return () => {
      reconocimientoRef.current?.stop();
    };
  }, []);

  const ejecutar = async () => {
    if (!texto.trim()) return;
    await onEjecutar(texto.trim());
    setTexto('');
  };

  const alternarMicrofono = () => {
    const Ctor = obtenerSpeechRecognitionCtor();
    if (!Ctor) {
      setErrorVoz('Este navegador no soporta reconocimiento de voz. Escribe el comando manualmente.');
      return;
    }

    if (escuchando) {
      reconocimientoRef.current?.stop();
      return;
    }

    setErrorVoz(null);
    const reconocimiento = new Ctor();
    reconocimiento.lang = 'es-ES';
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onresult = (evento: SpeechRecognitionEvent) => {
      const transcripcion = evento.results[0]?.[0]?.transcript;
      if (transcripcion) setTexto(transcripcion);
    };
    reconocimiento.onerror = (evento: SpeechRecognitionErrorEvent) => {
      setErrorVoz(
        evento.error === 'not-allowed' ? 'Permiso de micrófono denegado.' : 'No se pudo reconocer el audio.',
      );
      setEscuchando(false);
    };
    reconocimiento.onend = () => setEscuchando(false);

    reconocimientoRef.current = reconocimiento;
    reconocimiento.start();
    setEscuchando(true);
  };

  return (
    <section>
      <h1>Comandos de voz</h1>
      <div className="card">
        <p className="ayuda">
          Di algo como <em>vender 2 arroz</em> o <em>ingresar 5 arroz</em>, o escríbelo directamente en el
          cuadro de abajo.
        </p>
        <button type="button" className="ghost" onClick={alternarMicrofono} disabled={!soportaVoz}>
          {escuchando ? '🎙️ Escuchando… (clic para detener)' : '🎤 Activar micrófono'}
        </button>
        {errorVoz && <p className="error-text">{errorVoz}</p>}
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
