import { BaseCommand } from 'src/shared/command/base.command';

export class EndRegistrationCommand extends BaseCommand {
  constructor(corelationId?: string) {
    super(corelationId);
  }
}
