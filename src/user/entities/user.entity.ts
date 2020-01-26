import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';
import { UserModule } from '../user.module';
import { AggregateRoot } from '@nestjs/cqrs';

export class BruteForcePreventive {
  @Column()
  invalidAccessThreshold: number;
  @Column()
  invalidAccessCounter: number;

  get hasReachInvalidAccessCounterThreshold(): boolean {
    return this.invalidAccessCounter >= this.invalidAccessThreshold;
  }

  increaseInvalidAccessCounter() {
    this.invalidAccessCounter++;
  }

  resetInvalidAccessCounter() {
    this.invalidAccessCounter = 0;
  }
}

@Entity()
@Unique('username', ['username'])
export class User extends AggregateRoot {
  @PrimaryColumn()
  id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  isActive: boolean;
  @Column(type => BruteForcePreventive)
  bruteForcePreventive: BruteForcePreventive;
}
