import { EntityRepository, Repository } from 'typeorm';
import { AccountNumberSequence } from '../entities/account-number-sequence.entity';

@EntityRepository(AccountNumberSequence)
export class AccountNumberSequenceRepository extends Repository<
  AccountNumberSequence
> {}
