import { AccountTransactionService } from './interfaces';
import { AccountWithdrawalDto, AccountDepositDto } from './../dto/account.dto';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { AccountTransactionError } from '../error/account-error';
import { ErrorType } from 'src/shared/error/coded-error';
@Injectable()
export class AccountTransactionServiceImpl
  implements AccountTransactionService {
  constructor(private repository: AccountRepository) {}

  async withdrawal(dto: AccountWithdrawalDto): Promise<void> {
    const account = await this.repository.findByAccountNumber(
      dto.accountNumber,
    );
    if (account == null) {
      throw new AccountTransactionError(
        'Account not found',
        ErrorType.BAD_REQUEST,
      );
    }
    if (account.balance < dto.amount) {
      throw new AccountTransactionError(
        'Insufficient Balance',
        ErrorType.BAD_REQUEST,
      );
    }
    account.debit(dto.amount);
    this.repository.save(account);
  }
  async deposit(dto: AccountDepositDto): Promise<void> {
    const account = await this.repository.findByAccountNumber(
      dto.accountNumber,
    );
    if (account == null) {
      throw new AccountTransactionError(
        'Account not found',
        ErrorType.BAD_REQUEST,
      );
    }
    account.credit(dto.amount);
    this.repository.save(account);
  }
}
