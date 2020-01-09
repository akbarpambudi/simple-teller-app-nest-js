import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './../dto/create-customer.dto';
import { CustomerRepository } from '../repository/customer.repository';
import { Customer } from '../entities/customer.entity';
import { IdentityCard } from 'src/shared/entities/types/identity-card';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}
  async createCustomer(dto: CreateCustomerDto): Promise<void> {
    const newCustomer = new Customer();
    newCustomer.id = dto.id;
    newCustomer.name = dto.name;
    newCustomer.address = dto.address;
    newCustomer.gender = dto.gender;
    newCustomer.idCard = IdentityCard.fromTypeAndValue(
      dto.idCardType,
      dto.idCardNumber,
    );
    newCustomer.userId = dto.userId;
    await this.repository.save(newCustomer);
  }
}
