import { TransactionSplitDto } from '../dto/transaction-split.dto';

export class TransactionCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly transactionDate: Date,
    public readonly description: String,
    public readonly actor: String,
    public readonly splits: TransactionSplitDto[],
  ) {}
}
