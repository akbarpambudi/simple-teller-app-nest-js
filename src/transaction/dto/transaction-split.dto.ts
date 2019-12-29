import { TransactionType } from '../enum/transaction-type.enum';

export interface TransactionSplitDto {
  accountNumber: string;
  amount: number;
  type: TransactionType;
}
