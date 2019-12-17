import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccountNumberSequence {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sequenceNumber: number;
  @Column({ unique: true })
  prefix: string;
  @Column()
  totalLength: number;
}
