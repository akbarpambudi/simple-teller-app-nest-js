import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './services/customer.service';
import { CreateCustomerCommandHandler } from './command/handler/create-customer.command-handler';
import { SharedModule } from 'src/shared/shared.module';

const commandHandlers = [CreateCustomerCommandHandler];
@Module({
  controllers: [CustomerController],
  imports: [SharedModule, TypeOrmModule.forFeature([CustomerRepository])],
  providers: [CustomerService, ...commandHandlers],
})
export class CustomerModule {}
