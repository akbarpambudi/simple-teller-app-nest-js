import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { CreateTransactionSaga } from './saga/create-transaction.saga';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionCommandHandler } from './command/handler/create-transaction.command-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionSplit } from './entities/transaction-split.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { SharedModule } from 'src/shared/shared.module';

const commandHandlers = [CreateTransactionCommandHandler];
const sagas = [CreateTransactionSaga];
@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([TransactionRepository, TransactionSplit]),
  ],
  controllers: [TransactionController],
  providers: [...commandHandlers, ...sagas],
})
export class TransactionModule {}
