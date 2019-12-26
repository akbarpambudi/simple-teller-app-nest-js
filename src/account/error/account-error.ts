import { CodedError, ErrorType } from 'src/shared/error/coded-error';

export class AccountTransactionError extends CodedError {
  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
  ) {
    super('error.account.trx', message, type);
  }
}
