import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  AccountNumberSequence,
} from './account/entities/account.entity';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'simple-bank',
      entities: [Account, AccountNumberSequence],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
