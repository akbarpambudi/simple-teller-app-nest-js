import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './services/customer.service';

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
  providers: [CustomerService],
})
export class CustomerModule {}
