import { BaseCommandHandler } from 'src/shared/command/base.command';
import { EndRegistrationCommand } from '../end-registration.command';
import { RegistrationState } from 'src/registration/entities/registration-state.entity';
import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { RegistrationEndedEvent } from 'src/registration/event/registration-ended.event';
import { InjectRepository } from '@nestjs/typeorm';
@CommandHandler(EndRegistrationCommand)
export class EndRegistrationCommandHandler
  extends BaseCommandHandler<EndRegistrationCommand, RegistrationState>
  implements ICommandHandler<EndRegistrationCommand> {
  constructor(
    @InjectRepository(RegistrationState)
    private readonly repository: Repository<RegistrationState>,
    publisher: EventPublisher,
  ) {
    super(publisher);
  }

  async executeCommand(command: EndRegistrationCommand): Promise<any> {
    const state = await this.repository.findOne(command.correlationId);
    state.apply(new RegistrationEndedEvent());
    this.commitEvents(state);
  }
}
