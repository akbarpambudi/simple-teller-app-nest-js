import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;
  @Column({ length: 50 })
  accountNumber: string;
  @Column()
  balance: number;
  @Column()
  customerId: string;
  @Column()
  creator: string;

  debit(amount: number): void {
    this.balance -= amount;
  }

  credit(amount: number): void {
    this.balance += amount;
  }
}
