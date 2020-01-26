import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/customer/command/create-customer.command';
import { AccountService } from 'src/account/services/interfaces';
import { Inject } from '@nestjs/common';
import { ACCOUNT_SERVICE } from '../../di-token.constant';
import { CreateAccountCommand } from '../create-account.command';
import { AccountRepository } from 'src/account/repository/account.repository';
import {
  BaseCommand,
  BaseCommandHandler,
} from 'src/shared/command/base.command';
import { Account } from 'src/account/entities/account.entity';

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler
  extends BaseCommandHandler<CreateAccountCommand, Account>
  implements ICommandHandler<CreateAccountCommand> {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
    publisher: EventPublisher,
  ) {
    super(publisher);
  }

  async executeCommand(command: CreateAccountCommand): Promise<any> {
    const createdAccount = await this.accountService.registerAccount(
      command.properties,
    );

    this.commitEvents(createdAccount);
  }
}
