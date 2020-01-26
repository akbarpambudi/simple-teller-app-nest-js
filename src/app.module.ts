import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entities/account.entity';
import { AccountNumberSequence } from './account/entities/account-number-sequence.entity';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entities/transaction.entity';
import { TransactionSplit } from './transaction/entities/transaction-split.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { RegistrationModule } from './registration/registration.module';
import { RegistrationState } from './registration/entities/registration-state.entity';

@Module({
  imports: [
    AccountModule,
    TransactionModule,
    // ,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'simple-bank',
      entities: [
        Account,
        AccountNumberSequence,
        Transaction,
        TransactionSplit,
        User,
        Customer,
        RegistrationState,
      ],
      synchronize: true,
      extra: {
        connectionLimit: 200,
        max: 200,
      },
    }),
    CustomerModule,
    RegistrationModule,
  ],
})
export class AppModule {}
