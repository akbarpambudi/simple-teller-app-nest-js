export class CodedError extends Error {
  code: string;
  _message: string;

  static fromError(err: Error): CodedError {
    return new CodedError('error.unmapped', err.message);
  }

  constructor(code: string, message: string) {
    super();
    this.code = code;
    this._message = message;
  }

  get message() {
    return this._message;
  }

  get formattedError() {
    return this.createFormattedError(this.code, this._message);
  }

  private createFormattedError(code: string, message: string) {
    return `${code}:${message}`;
  }
}
