import { Entity, PrimaryColumn, Column, Index, Unique } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity()
export class Account extends AggregateRoot {
  @PrimaryColumn()
  id: string;
  @Index()
  @Column({ length: 50, unique: true })
  accountNumber: string;
  @Column({ type: 'bigint' })
  balance: number;
  @Column()
  customerId: string;
  @Column()
  creator: string;

  debit(amount: number): void {
    this.balance = Number(this.balance) - Number(amount);
  }

  credit(amount: number): void {
    this.balance = Number(this.balance) + Number(amount);
  }
}
