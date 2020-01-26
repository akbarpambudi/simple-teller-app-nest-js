import { Gender } from '../enum/gender.enum';
import { IdentityCardTypes } from 'src/shared/entities/types/identity-card';
import { IsNotEmpty, IsUUID } from 'class-validator';

export interface CustomerProperties {
  id: string;
  name: string;
  idCardType: string;
  idCardNumber: string;
  gender: Gender;
  address: string;
  userId: string;
}
export class CreateCustomerDto implements CustomerProperties {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  idCardType: string;

  @IsNotEmpty()
  idCardNumber: IdentityCardTypes;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  address: string;

  userId: string;
}
