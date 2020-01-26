import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { User, BruteForcePreventive } from '../entities/user.entity';
import { BcryptPasswordEncryptionService } from './encryption/bcrypt-password-encryption.service';
import { PasswordEncryptionStrategy } from './encryption/password-encryption-strategy';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly encryptStrategy: BcryptPasswordEncryptionService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = dto.id;
    user.isActive = true;
    user.username = dto.name.replace(/\s/g, '');
    user.password = await this.encryptStrategy.encrypt(dto.password);
    user.bruteForcePreventive = new BruteForcePreventive();
    user.bruteForcePreventive.invalidAccessThreshold = 3;
    user.bruteForcePreventive.invalidAccessCounter = 0;
    return await this.repository.save(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { username: username },
    });
    return user;
  }
}
