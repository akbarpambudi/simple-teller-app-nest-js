import { TransactionSplitDto } from './transaction-split.dto';

export interface TransactionDto {
  id: string;
  transactionDate: Date;
  description: string;
  actor: string;
  splits: TransactionSplitDto[];
}
