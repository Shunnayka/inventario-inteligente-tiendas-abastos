// services/tokenStore.ts
// En Web usa localStorage; si se importa en un entorno sin `window`
// (React Native, tests, SSR) cae a una variable en memoria.
let memoria: string | null = null;
const hayLocalStorage = typeof window !== 'undefined' && !!window.localStorage;

export const tokenStore = {
  get(): string | null {
    return hayLocalStorage ? window.localStorage.getItem('sgb_token') : memoria;
  },
  set(token: string): void {
    if (hayLocalStorage) window.localStorage.setItem('sgb_token', token);
    else memoria = token;
  },
  clear(): void {
    if (hayLocalStorage) window.localStorage.removeItem('sgb_token');
    else memoria = null;
  },
};