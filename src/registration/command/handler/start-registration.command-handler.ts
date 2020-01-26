import { BaseCommandHandler } from 'src/shared/command/base.command';
import { StartRegistrationCommand } from '../start-registration.command';
import { RegistrationState } from 'src/registration/entities/registration-state.entity';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@CommandHandler(StartRegistrationCommand)
export class StartRegistrationCommandHandler
  extends BaseCommandHandler<StartRegistrationCommand, RegistrationState>
  implements ICommandHandler<StartRegistrationCommand> {
  constructor(
    @InjectRepository(RegistrationState)
    private readonly repository: Repository<RegistrationState>,
    publisher: EventPublisher,
  ) {
    super(publisher);
  }

  async executeCommand(command: StartRegistrationCommand): Promise<any> {
    const registrationState = RegistrationState.start(command);
    await this.repository.save(registrationState);
    this.commitEvents(registrationState);
  }
}
