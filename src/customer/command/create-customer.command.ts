import {
  CustomerProperties,
  CreateCustomerDto,
} from '../dto/create-customer.dto';
import { BaseCommand } from 'src/shared/command/base.command';

export class CreateCustomerCommand extends BaseCommand {
  constructor(
    public readonly properties: CreateCustomerDto,
    corelationId?: string,
  ) {
    super(corelationId);
  }
}
