import { AccountRegistrationDto } from '../dto/account.dto';

export interface AccountNumberGenerator {
  next(): Promise<string>;
}

export interface AccountService {
  registerAccount(accountRegistration: AccountRegistrationDto): Promise<void>;
}
