import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './services/customer.service';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@Controller('/customer')
export class CustomerController {
  constructor(
    private readonly service: CustomerService,
    private readonly repository: CustomerRepository,
  ) {}

  @Post('/')
  async createCustomer(
    @Request() request: any,
    @Body() requestBody: CreateCustomerDto,
  ): Promise<void> {
    requestBody.userId = request.user.userId;
    await this.service.createCustomer(requestBody);
  }

  @Get('/me')
  async getLoginInCustomer(@Request() request: any): Promise<Customer> {
    const userId = request.user.userId;
    return await this.repository.findOne({ where: { userId: userId } });
  }
}
