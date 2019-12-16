import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;
  @Column({ length: 50 })
  accountNumber: string;
  @Column()
  balance: number;
}

export class AccountNumberSequence {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sequenceNumber: number;
  @Column()
  prefix: string;
}
