import { StartRegistrationDto } from '../dto/start-registration.dto';
import { BaseCommand } from 'src/shared/command/base.command';

export class StartRegistrationCommand extends BaseCommand {
  constructor(public readonly properties: StartRegistrationDto) {
    super(properties.id);
  }
}
