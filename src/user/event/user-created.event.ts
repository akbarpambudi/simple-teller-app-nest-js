import { BaseEvent } from 'src/shared/command/base.event';

export interface UserCreatedProperties {
  userId: string;
  username: string;
}

export class UserCreatedEvent extends BaseEvent {
  constructor(public readonly properties: UserCreatedProperties) {
    super();
  }
}
