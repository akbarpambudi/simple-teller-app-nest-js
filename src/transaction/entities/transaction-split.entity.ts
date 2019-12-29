import { TransactionType } from '../enum/transaction-type.enum';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';
@Entity()
export class TransactionSplit {
  @PrimaryGeneratedColumn()
  id: Number;
  @Column()
  accountNumber: string;
  @Column()
  amount: number;
  @Column()
  type: TransactionType;
  @ManyToOne(
    type => Transaction,
    transaction => transaction.splits,
  )
  transaction: Transaction;
}
