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

const commandHandlers = [CreateTransactionCommandHandler];
const sagas = [CreateTransactionSaga];
@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, TransactionSplit]),
    CqrsModule,
  ],
  controllers: [TransactionController],
  providers: [...commandHandlers, ...sagas],
})
export class TransactionModule {}
