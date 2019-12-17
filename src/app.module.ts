import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entities/account.entity';
import { AccountNumberSequence } from './account/entities/account-number-sequence.entity';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'simple-bank',
      entities: [Account, AccountNumberSequence],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
