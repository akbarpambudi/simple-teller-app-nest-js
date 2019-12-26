import {
  AccountRegistrationDto,
  AccountDto,
  AccountWithdrawalDto,
  AccountDepositDto,
} from '../dto/account.dto';

export interface AccountNumberGenerator {
  next(): Promise<string>;
}

export interface AccountService {
  registerAccount(accountRegistration: AccountRegistrationDto): Promise<void>;
  getAccountById(id: string): Promise<AccountDto>;
}

export interface AccountTransactionService {
  withdrawal(dto: AccountWithdrawalDto): Promise<void>;
  deposit(dto: AccountDepositDto): Promise<void>;
}
