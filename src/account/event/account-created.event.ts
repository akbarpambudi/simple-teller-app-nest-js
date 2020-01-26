import { BaseEvent } from 'src/shared/command/base.event';

export class AccountCreatedEvent extends BaseEvent {
  constructor(
    private readonly accountId,
    private readonly accountNumber: string,
    private readonly customerId: string,
  ) {
    super();
  }
}
