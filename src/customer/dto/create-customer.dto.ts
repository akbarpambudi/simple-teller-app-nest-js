import { Gender } from '../enum/gender.enum';
import { IdentityCardTypes } from 'src/shared/entities/types/identity-card';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCustomerDto {
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
