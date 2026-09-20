import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { HashServicePort } from '../../domain/ports/hash.service.port';

const RONDAS = 10;

@Injectable()
export class BcryptHashService implements HashServicePort {
  hash(texto: string): Promise<string> {
    return bcrypt.hash(texto, RONDAS);
  }

  comparar(texto: string, hash: string): Promise<boolean> {
    return bcrypt.compare(texto, hash);
  }
}