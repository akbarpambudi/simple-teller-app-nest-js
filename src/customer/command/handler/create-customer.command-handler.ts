import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../create-customer.command';
import { CustomerService } from 'src/customer/services/customer.service';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { BaseCommandHandler } from 'src/shared/command/base.command';
import { Customer } from 'src/customer/entities/customer.entity';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  extends BaseCommandHandler<CreateCustomerCommand, Customer>
  implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    private readonly customerService: CustomerService,
    publisher: EventPublisher,
  ) {
    super(publisher);
  }

  async executeCommand(command: CreateCustomerCommand): Promise<void> {
    const createdCustomer = await this.customerService.createCustomer(
      command.properties,
    );
    this.commitEvents(createdCustomer);
  }
}
