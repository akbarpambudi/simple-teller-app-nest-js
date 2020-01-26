import { BaseEvent } from 'src/shared/command/base.event';
import { StartRegistrationDto } from '../dto/start-registration.dto';

export class RegistrationStartedEvent extends BaseEvent {
  constructor(public readonly initialState: StartRegistrationDto) {
    super();
  }
}
