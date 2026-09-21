// Llama una sola vez a los hooks compartidos (@sgb/shared) y los expone a todas
// las pantallas por contexto, para no repetir el fetch de productos/alertas cada
// vez que se cambia de tab (mismo dato que en web/src/App.tsx, pero como contexto
// en vez de props porque acá hay varias pantallas montadas por separado).
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAlertas, useAuth, useComandoVoz, useProductos } from '@sgb/shared';

function useAppDataValue() {
  const auth = useAuth();
  const productos = useProductos();
  const comandoVoz = useComandoVoz();
  const alertas = useAlertas();
  return { auth, productos, comandoVoz, alertas };
}

type AppDataValue = ReturnType<typeof useAppDataValue>;

const AppDataContext = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const value = useAppDataValue();
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData debe usarse dentro de <AppDataProvider>');
  return ctx;
}
