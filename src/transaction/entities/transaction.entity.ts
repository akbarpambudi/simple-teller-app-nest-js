import { TransactionSplit } from './transaction-split.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './../command/create-transaction.command';

import {
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToMany,
  Entity,
} from 'typeorm';
import { TransactionCreatedEvent } from '../event/transaction-created.event';
import {
  TransactionType,
  TransactionTypeUtil,
} from '../enum/transaction-type.enum';
@Entity()
export class Transaction extends AggregateRoot {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  description: string;

  @Column()
  actor: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @OneToMany(
    type => TransactionSplit,
    split => split.transaction,
    { cascade: true },
  )
  splits: TransactionSplit[];

  static fromCreateAccountCommand(command: CreateTransactionCommand) {
    const transaction = new Transaction();
    transaction.id = command.id;
    transaction.actor = command.actor;
    transaction.description = command.description;
    transaction.date = new Date();
    transaction.splits = command.splits.map(splitDto => {
      const split = new TransactionSplit();
      split.accountNumber = splitDto.accountNumber;
      split.amount = splitDto.amount;
      split.type = TransactionTypeUtil.fromString(splitDto.type);
      return split;
    });

    transaction.apply(
      new TransactionCreatedEvent(
        transaction.id,
        transaction.date,
        transaction.description,
        transaction.actor,
        command.splits,
      ),
    );
    return transaction;
  }
}
