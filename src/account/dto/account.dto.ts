import { IsNotEmpty, IsUUID } from 'class-validator';
export class AccountRegistrationDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsNotEmpty()
  customerId: string;
  @IsNotEmpty()
  creator: string;
}

export interface AccountDto {
  id: string;
  balance: number;
  accountNumber: string;
}

export interface AccountWithdrawalDto {
  accountNumber: string;
  amount: number;
}

export interface AccountDepositDto {
  accountNumber: string;
  amount: number;
}
