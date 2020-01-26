import { AccountRegistrationDto } from '../dto/account.dto';
import { BaseCommand } from 'src/shared/command/base.command';

export class CreateAccountCommand extends BaseCommand {
  constructor(
    public readonly properties: AccountRegistrationDto,
    corelationId?: string,
  ) {
    super(corelationId);
  }
}
