import { AccountService, AccountNumberGenerator } from './interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { AccountRegistrationDto } from '../dto/account.dto';
import { AccountRepository } from './../repository/account.repository';
import { Account } from './../entities/account.entity';
import { ACCOUNT_NUMBER_GENERATOR } from '../di-token.constant';

@Injectable()
export class AccountServiceImpl implements AccountService {
  constructor(
    private repository: AccountRepository,
    @Inject(ACCOUNT_NUMBER_GENERATOR)
    private accountNumberGenerator: AccountNumberGenerator,
  ) {}

  async registerAccount(
    accountRegistration: AccountRegistrationDto,
  ): Promise<void> {
    const account = new Account();
    account.accountNumber = await this.accountNumberGenerator.next();
    account.balance = 0;
    account.creator = accountRegistration.creator;
    account.customerId = accountRegistration.customerId;
    account.id = accountRegistration.id;
    await this.repository.save(account);
  }
}
