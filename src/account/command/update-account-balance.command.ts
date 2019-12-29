import { ICommand } from '@nestjs/cqrs';
import { TransactionType } from '../enum/transaction-type.enum';

export class UpdateAccountBalanceCommand implements ICommand {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly type: TransactionType,
  ) {}
}
