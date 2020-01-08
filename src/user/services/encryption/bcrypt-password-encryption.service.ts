import { Injectable } from '@nestjs/common';
import { PasswordEncryptionStrategy } from './password-encryption-strategy';
import * as bcrypt from 'bcrypt';

const SALT_ROUND = 16;

@Injectable()
export class BcryptPasswordEncryptionService
  implements PasswordEncryptionStrategy {
  async encrypt(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, SALT_ROUND);
  }
  validate(suspect: string, passwordHash: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      bcrypt.compare(suspect, passwordHash, (err, res) =>
        err ? reject(err) : resolve(res),
      ),
    );
  }
}
