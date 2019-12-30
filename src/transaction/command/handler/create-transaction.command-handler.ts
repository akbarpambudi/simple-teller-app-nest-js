import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../create-transaction.command';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionRepository } from 'src/transaction/repository/transaction.repository';
import { Injectable } from '@nestjs/common';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler
  implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    private readonly repository: TransactionRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<any> {
    const transaction = Transaction.FromCreateAccountCommand(command);
    console.log(transaction.splits);
    const insertedTransaction = this.publisher.mergeObjectContext(
      await this.repository.save(transaction),
    );
    insertedTransaction.commit();
  }
}
