import { CreateUserDto } from '../dto/create-user.dto';
import { BaseCommand } from 'src/shared/command/base.command';

export class CreateUserCommand extends BaseCommand {
  constructor(
    public readonly properties: CreateUserDto,
    corelationId?: string,
  ) {
    super(corelationId);
  }
}
