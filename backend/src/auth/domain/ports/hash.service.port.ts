export const HASH_SERVICE = 'HASH_SERVICE';

export interface HashServicePort {
  hash(texto: string): Promise<string>;
  comparar(texto: string, hash: string): Promise<boolean>;
}