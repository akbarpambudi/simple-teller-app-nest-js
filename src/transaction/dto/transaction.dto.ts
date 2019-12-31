import { TransactionSplitDto } from './transaction-split.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  transactionDate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  actor: string;
  @ApiProperty()
  splits: TransactionSplitDto[];
}
