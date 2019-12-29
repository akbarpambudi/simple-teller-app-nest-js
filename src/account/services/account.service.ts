import { AccountService, AccountNumberGenerator } from './interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { AccountRegistrationDto, AccountDto } from '../dto/account.dto';
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

  async getAccountById(id: string): Promise<AccountDto> {
    const account = await this.repository.findOne(id);
    if (account == null) throw new Error(`customer with id ${id} not found`);
    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      id: account.id,
    };
  }

  async getAccountByAccountNumber(accountNumber: string): Promise<AccountDto> {
    const account = await this.repository.findByAccountNumber(accountNumber);
    if (account == null) {
      throw new Error(
        `customer with account number ${accountNumber} was not found`,
      );
    }
    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      id: account.id,
    };
  }
}
