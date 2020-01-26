import {
  AccountRegistrationDto,
  AccountDto,
  AccountWithdrawalDto,
  AccountDepositDto,
} from '../dto/account.dto';
import { Account } from '../entities/account.entity';

export interface AccountNumberGenerator {
  next(): Promise<string>;
}

export interface AccountService {
  registerAccount(
    accountRegistration: AccountRegistrationDto,
  ): Promise<Account>;
  getAccountById(id: string): Promise<AccountDto>;
  getAccountByAccountNumber(accountNumber: string): Promise<AccountDto>;
}

export interface AccountTransactionService {
  withdrawal(dto: AccountWithdrawalDto): Promise<void>;
  deposit(dto: AccountDepositDto): Promise<void>;
}
