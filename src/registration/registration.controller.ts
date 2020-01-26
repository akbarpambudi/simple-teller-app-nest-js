import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StartRegistrationDto } from './dto/start-registration.dto';
import { StartRegistrationCommand } from './command/start-registration.command';

@Controller('/registration')
export class RegistrationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async startRegistration(@Body() registration: StartRegistrationDto) {
    await this.commandBus.execute(new StartRegistrationCommand(registration));
  }
}
