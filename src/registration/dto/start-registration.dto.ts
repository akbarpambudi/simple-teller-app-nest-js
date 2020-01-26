import { Gender } from 'src/customer/enum/gender.enum';

export class StartRegistrationDto {
  constructor(
    public readonly id: string,
    public readonly password: string,
    public readonly name: string,
    public readonly idCardType: string,
    public readonly idCardNumber: string,
    public readonly gender: Gender,
    public readonly address: string,
    public readonly userId: string,
  ) {}
}
