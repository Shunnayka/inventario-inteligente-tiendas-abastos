// services/tokenStore.ts
// En Web usa localStorage. Otras plataformas (React Native) pueden inyectar un
// adapter propio (p.ej. respaldado por AsyncStorage) con `tokenStore.configure(...)`
// desde su punto de entrada; sin adapter, cae a una variable en memoria.
export interface TokenStoreAdapter {
  get(): string | null;
  set(token: string): void;
  clear(): void;
}

let memoria: string | null = null;
let adapter: TokenStoreAdapter | null = null;
const hayLocalStorage = typeof window !== 'undefined' && !!window.localStorage;

export const tokenStore = {
  configure(nuevoAdapter: TokenStoreAdapter | null): void {
    adapter = nuevoAdapter;
  },
  get(): string | null {
    if (adapter) return adapter.get();
    return hayLocalStorage ? window.localStorage.getItem('sgb_token') : memoria;
  },
  set(token: string): void {
    if (adapter) return adapter.set(token);
    if (hayLocalStorage) window.localStorage.setItem('sgb_token', token);
    else memoria = token;
  },
  clear(): void {
    if (adapter) return adapter.clear();
    if (hayLocalStorage) window.localStorage.removeItem('sgb_token');
    else memoria = null;
  },
};