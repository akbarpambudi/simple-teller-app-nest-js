import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountNumberSequence } from './entities/account-number-sequence.entity';
import { AccountServiceImpl } from './services/account.service';
import { AccountNumberSequenceService } from './services/account-number-sequence.service';
import { ACCOUNT_SERVICE, ACCOUNT_NUMBER_GENERATOR } from './di-token.constant';
import { SharedModule } from 'src/shared/shared.module';
@Module({
  controllers: [AccountController],
  imports: [
    TypeOrmModule.forFeature([Account, AccountNumberSequence]),
    SharedModule,
  ],
  providers: [
    { provide: ACCOUNT_SERVICE, useClass: AccountServiceImpl },
    {
      provide: ACCOUNT_NUMBER_GENERATOR,
      useClass: AccountNumberSequenceService,
    },
  ],
})
export class AccountModule {}
