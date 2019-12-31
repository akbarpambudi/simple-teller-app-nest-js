import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AccountRegistrationDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  customerId: string;
  @IsNotEmpty()
  @ApiProperty()
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
