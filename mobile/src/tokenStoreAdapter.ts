// Respalda tokenStore (paquete compartido) con AsyncStorage para que la sesión
// persista entre reinicios de la app. AsyncStorage es asíncrono pero la interfaz
// de tokenStore es síncrona, así que se mantiene una copia en memoria que se
// precarga una vez al arrancar (ver cargarTokenInicial en App.tsx).
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TokenStoreAdapter } from '@sgb/shared';

const CLAVE = 'sgb_token';
let cache: string | null = null;

export async function cargarTokenInicial(): Promise<void> {
  cache = await AsyncStorage.getItem(CLAVE);
}

export const asyncStorageTokenAdapter: TokenStoreAdapter = {
  get(): string | null {
    return cache;
  },
  set(token: string): void {
    cache = token;
    AsyncStorage.setItem(CLAVE, token).catch(() => {});
  },
  clear(): void {
    cache = null;
    AsyncStorage.removeItem(CLAVE).catch(() => {});
  },
};
