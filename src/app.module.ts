import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entities/account.entity';
import { AccountNumberSequence } from './account/entities/account-number-sequence.entity';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entities/transaction.entity';
import { TransactionSplit } from './transaction/entities/transaction-split.entity';

@Module({
  imports: [
    AccountModule,
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'simple-bank',
      entities: [Account, AccountNumberSequence, Transaction, TransactionSplit],
      synchronize: true,
      extra: {
        connectionLimit: 200,
        max: 200,
      },
    }),
  ],
})
export class AppModule {}
