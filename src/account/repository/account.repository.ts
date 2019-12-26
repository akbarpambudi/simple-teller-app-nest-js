import { EntityRepository, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async findByAccountNumber(accountNumber: string): Promise<Account> {
    return this.findOne({ where: { accountNumber: accountNumber } });
  }
}
