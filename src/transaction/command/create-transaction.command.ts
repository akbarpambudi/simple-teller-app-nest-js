import { TransactionSplitDto } from '../dto/transaction-split.dto';
import { ICommand } from '@nestjs/cqrs';
import { TransactionDto } from '../dto/transaction.dto';

export class CreateTransactionCommand implements ICommand {
  static fromTransactionDto(transactionDto: TransactionDto) {
    return new CreateTransactionCommand(
      transactionDto.id,
      transactionDto.transactionDate,
      transactionDto.description,
      transactionDto.description,
      transactionDto.splits,
    );
  }

  constructor(
    public readonly id: string,
    public readonly transactionDate: Date,
    public readonly description: string,
    public readonly actor: string,
    public readonly splits: TransactionSplitDto[],
  ) {}
}
