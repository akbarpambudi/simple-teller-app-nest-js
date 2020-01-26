import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserService } from 'src/user/services/user.service';
import { BaseCommandHandler } from 'src/shared/command/base.command';
import { User } from 'src/user/entities/user.entity';
import { UserCreatedEvent } from 'src/user/event/user-created.event';
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  extends BaseCommandHandler<CreateUserCommand, User>
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    publisher: EventPublisher,
  ) {
    super(publisher);
  }

  async executeCommand(command: CreateUserCommand): Promise<any> {
    console.log('command', command);
    const createdUser = await this.userService.createUser(command.properties);
    createdUser.apply(
      new UserCreatedEvent({
        userId: createdUser.id,
        username: createdUser.username,
      }),
    );
    this.commitEvents(createdUser);
  }
}
