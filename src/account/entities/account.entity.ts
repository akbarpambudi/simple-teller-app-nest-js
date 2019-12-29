import { Entity, PrimaryColumn, Column, Index, Unique } from 'typeorm';

@Entity()
export class Account {
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
