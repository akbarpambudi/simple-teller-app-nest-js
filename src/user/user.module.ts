import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { BcryptPasswordEncryptionService } from './services/encryption/bcrypt-password-encryption.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './command/handler/create-user.command-handler';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, BcryptPasswordEncryptionService, ...commandHandlers],
  exports: [UserService, BcryptPasswordEncryptionService, ...commandHandlers],
  controllers: [UserController],
})
export class UserModule {}
