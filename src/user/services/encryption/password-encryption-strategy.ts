export interface PasswordEncryptionStrategy {
  encrypt(rawPassword: string): Promise<string>;
  validate(suspect: string, password: string): Promise<boolean>;
}
