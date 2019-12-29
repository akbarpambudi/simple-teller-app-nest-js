import { TransactionSplitDto } from '../dto/transaction-split.dto';

export class CreateTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly transactionDate: Date,
    public readonly description: string,
    public readonly actor: string,
    public readonly splits: TransactionSplitDto[],
  ) {}
}
