import { TransactionType } from '../enum/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionSplitDto {
  @ApiProperty()
  accountNumber: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  type: string;
}
