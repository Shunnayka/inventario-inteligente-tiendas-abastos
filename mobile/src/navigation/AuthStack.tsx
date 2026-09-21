import { useState } from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

type Modo = 'login' | 'register';

export function AuthStack() {
  const [modo, setModo] = useState<Modo>('login');

  if (modo === 'register') {
    return <RegisterScreen onIrALogin={() => setModo('login')} />;
  }
  return <LoginScreen onIrARegistro={() => setModo('register')} />;
}
