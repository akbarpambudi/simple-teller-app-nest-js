import { AccountRegistrationDto, AccountDto } from '../dto/account.dto';
import { Observable } from 'rxjs';

export interface AccountNumberGenerator {
  next(): Promise<string>;
}

export interface AccountService {
  registerAccount(accountRegistration: AccountRegistrationDto): Promise<void>;
  getAccountNumberById(id: string): Promise<AccountDto>;
}
