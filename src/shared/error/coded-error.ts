export enum ErrorType {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
}

export class CodedError extends Error {
  code: string;
  _message: string;
  _errorType: ErrorType;

  static fromError(err: Error): CodedError {
    return new CodedError('error.unmapped', err.message);
  }

  constructor(
    code: string,
    message: string,
    type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
  ) {
    super();
    this.code = code;
    this._message = message;
    this._errorType = type;
  }

  get message() {
    return this._message;
  }

  get formattedError() {
    return this.createFormattedError(this.code, this._message);
  }

  get type() {
    return this._errorType;
  }

  private createFormattedError(code: string, message: string) {
    return `${code}:${message}`;
  }
}
