import { Column } from 'typeorm';
import { InvalidParameterError } from 'src/shared/error/invalid-parameter-error';

export type IdentityCardTypes = 'ktp' | 'kitas' | 'passport';

export class IdentityCard {
  @Column()
  value: string;
  @Column()
  type: IdentityCardTypes;

  static fromTypeAndValue(
    type: string,
    value: IdentityCardTypes,
  ): IdentityCard {
    const idCard = new IdentityCard();
    idCard.value = value;
    idCard.type = value;
    return idCard;
  }
}
