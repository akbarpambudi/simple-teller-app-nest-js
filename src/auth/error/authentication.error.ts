import { CodedError, ErrorType } from 'src/shared/error/coded-error';

export class AuthenticationError extends CodedError {
  constructor(message: string) {
    super('error.auth', message, ErrorType.UNAUTHORIZED);
  }
}
