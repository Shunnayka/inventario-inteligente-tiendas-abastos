import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  onLogin: (correo: string, contrasena: string) => Promise<boolean>;
  onIrARegistro: () => void;
  cargando: boolean;
  error: string | null;
}

export function LoginScreen({ onLogin, onIrARegistro, cargando, error }: Props) {
  const [correo, setCorreo] = useState('tendero@abastos.ec');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onLogin(correo, contrasena);
  };

  return (
    <div className="screen-center">
      <form className="card" style={{ maxWidth: 360 }} onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <label htmlFor="correo">Correo</label>
        <input id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="username" />
        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          autoComplete="current-password"
        />
        {error && <p className="error-text">{error}</p>}
        <button className="primary" type="submit" disabled={cargando}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
        <p className="link-registro" onClick={onIrARegistro}>¿No tienes cuenta? Regístrate aquí</p>
      </form>
    </div>
  );
}