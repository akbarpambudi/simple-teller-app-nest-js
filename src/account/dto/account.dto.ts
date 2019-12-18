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
