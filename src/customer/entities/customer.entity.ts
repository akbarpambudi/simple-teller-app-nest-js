import { Gender } from '../enum/gender.enum';
import { IdentityCard } from 'src/shared/entities/types/identity-card';
import {
  PrimaryGeneratedColumn,
  Table,
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: string;
  @Column(type => IdentityCard)
  idCard: IdentityCard;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  gender: Gender;
  @Column()
  userId: string;
}
