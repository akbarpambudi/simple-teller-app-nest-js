import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncryptionStrategy } from './../../user/services/encryption/password-encryption-strategy';
import { BcryptPasswordEncryptionService } from 'src/user/services/encryption/bcrypt-password-encryption.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthenticationError } from './../error/authentication.error';
import { UserService } from 'src/user/services/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(BcryptPasswordEncryptionService)
    private readonly encryptionStrategy: PasswordEncryptionStrategy,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user && user.isActive) {
      const isPasswordValid = await this.encryptionStrategy.validate(
        password,
        user.password,
      );
      if (isPasswordValid) {
        user.bruteForcePreventive.resetInvalidAccessCounter();
        this.userRepository.save(user);
        const payload = { username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else if (
        user.bruteForcePreventive.hasReachInvalidAccessCounterThreshold
      ) {
        user.isActive = false;
        this.userRepository.save(user);
      } else {
        user.bruteForcePreventive.increaseInvalidAccessCounter();
        this.userRepository.save(user);
      }
    } else if (user && !user.isActive) {
      throw new AuthenticationError('account is blocked');
    }
    throw new AuthenticationError('invalid username or password');
  }
}
