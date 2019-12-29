import { UpdateAccountBalanceCommand } from './../update-account-balance.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject } from '@nestjs/common';
import { AccountTransactionService } from 'src/account/services/interfaces';
import { ACCOUNT_TRANSACTION_SERVICE } from 'src/account/di-token.constant';
import { TransactionType } from 'src/account/enum/transaction-type.enum';
@CommandHandler(UpdateAccountBalanceCommand)
@Injectable()
export class UpdateAccountBalanceCommandHandler
  implements ICommandHandler<UpdateAccountBalanceCommand> {
  constructor(
    @Inject(ACCOUNT_TRANSACTION_SERVICE)
    public readonly service: AccountTransactionService,
  ) {}

  async execute(command: UpdateAccountBalanceCommand): Promise<any> {
    if (command.type == TransactionType.CREDIT) {
      this.service.deposit({
        accountNumber: command.accountNumber,
        amount: command.amount,
      });
    } else if (command.type == TransactionType.DEBIT) {
      this.service.withdrawal({
        accountNumber: command.accountNumber,
        amount: command.amount,
      });
    }
  }
}
