import { CodedError } from 'src/shared/error/coded-error';

export class AccountTransactionError extends CodedError {
  constructor(message: string) {
    super('error.account.trx', message);
  }
}
