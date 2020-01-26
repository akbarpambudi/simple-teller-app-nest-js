import { CustomerProperties } from '../dto/create-customer.dto';
import { BaseEvent } from 'src/shared/command/base.event';

export class CustomerCreatedEvent extends BaseEvent {
  constructor(public readonly properties: CustomerProperties) {
    super();
  }
}
