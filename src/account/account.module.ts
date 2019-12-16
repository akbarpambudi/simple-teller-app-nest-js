import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountNumberSequence, Account } from './entities/account.entity';

@Module({
  controllers: [AccountController],
  imports: [TypeOrmModule.forFeature([Account, AccountNumberSequence])],
})
export class AccountModule {}
