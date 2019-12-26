import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountNumberSequence } from './entities/account-number-sequence.entity';
import { AccountServiceImpl } from './services/account.service';
import { AccountNumberSequenceService } from './services/account-number-sequence.service';
import {
  ACCOUNT_SERVICE,
  ACCOUNT_NUMBER_GENERATOR,
  ACCOUNT_TRANSACTION_SERVICE,
} from './di-token.constant';
import { SharedModule } from 'src/shared/shared.module';
import { AccountTransactionServiceImpl } from './services/account-transaction.service';
import { AccountTransactionController } from './controllers/account-transaction.controller';
import { AccountRepository } from './repository/account.repository';
@Module({
  controllers: [AccountController, AccountTransactionController],
  imports: [
    TypeOrmModule.forFeature([AccountRepository, AccountNumberSequence]),
    SharedModule,
  ],
  providers: [
    { provide: ACCOUNT_SERVICE, useClass: AccountServiceImpl },
    {
      provide: ACCOUNT_NUMBER_GENERATOR,
      useClass: AccountNumberSequenceService,
    },
    {
      provide: ACCOUNT_TRANSACTION_SERVICE,
      useClass: AccountTransactionServiceImpl,
    },
  ],
})
export class AccountModule {}
