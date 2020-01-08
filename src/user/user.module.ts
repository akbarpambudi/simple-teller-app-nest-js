import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { BcryptPasswordEncryptionService } from './services/encryption/bcrypt-password-encryption.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, BcryptPasswordEncryptionService],
  exports: [UserService, BcryptPasswordEncryptionService],
  controllers: [UserController],
})
export class UserModule {}
