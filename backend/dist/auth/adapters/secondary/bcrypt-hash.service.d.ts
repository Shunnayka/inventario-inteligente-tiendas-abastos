import type { HashServicePort } from '../../domain/ports/hash.service.port';
export declare class BcryptHashService implements HashServicePort {
    hash(texto: string): Promise<string>;
    comparar(texto: string, hash: string): Promise<boolean>;
}
