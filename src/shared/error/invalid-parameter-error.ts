import { CodedError, ErrorType } from './coded-error';

export class InvalidParameterError extends CodedError {
  constructor(subCode: string, message: string) {
    super(
      `error.param.invalid${subCode ? '.' + subCode : ''}`,
      message,
      ErrorType.INTERNAL_SERVER_ERROR,
    );
  }
}
