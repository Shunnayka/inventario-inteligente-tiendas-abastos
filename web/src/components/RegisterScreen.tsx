import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  onRegistrar: (nombre: string, correo: string, contrasena: string) => Promise<boolean>;
  onIrALogin: () => void;
  cargando: boolean;
  error: string | null;
}

export function RegisterScreen({ onRegistrar, onIrALogin, cargando, error }: Props) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      setErrorLocal('Las contraseñas no coinciden.');
      return;
    }
    setErrorLocal(null);
    await onRegistrar(nombre, correo, contrasena);
  };

  return (
    <div className="screen-center">
      <form className="card" style={{ maxWidth: 360 }} onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label htmlFor="correoReg">Correo</label>
        <input id="correoReg" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="username" />
        <label htmlFor="contrasenaReg">Contraseña</label>
        <input
          id="contrasenaReg"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          autoComplete="new-password"
        />
        <label htmlFor="confirmarContrasena">Confirmar contraseña</label>
        <input
          id="confirmarContrasena"
          type="password"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          autoComplete="new-password"
        />
        {(errorLocal || error) && <p className="error-text">{errorLocal ?? error}</p>}
        <button className="primary" type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta…' : 'Registrarse'}
        </button>
        <p className="link-registro" onClick={onIrALogin}>¿Ya tienes cuenta? Inicia sesión</p>
      </form>
    </div>
  );
}