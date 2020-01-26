import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RegistrationEndedEvent } from '../registration-ended.event';
import { Repository } from 'typeorm';
import { RegistrationState } from 'src/registration/entities/registration-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
@EventsHandler(RegistrationEndedEvent)
export class RegistrationEndedEventHandler
  implements IEventHandler<RegistrationEndedEvent> {
  constructor(
    @InjectRepository(RegistrationState)
    private readonly repository: Repository<RegistrationState>,
  ) {}
  async handle(event: RegistrationEndedEvent) {
    const state = await this.repository.findOne(event.correlationId);
    const modifiedState = state.applyEndRegistration(event);
    await this.repository.save(state);
  }
}
