import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationState } from './entities/registration-state.entity';
import { SharedModule } from 'src/shared/shared.module';
import { StartRegistrationCommandHandler } from './command/handler/start-registration.command-handler';
import { EndRegistrationCommandHandler } from './command/handler/end-registration.command-handler';
import { RegistrationEndedEventHandler } from './event/handler/registration-ended.event-handler';
import { RegistrationSaga } from './saga/registration.saga';
import { RegistrationController } from './registration.controller';
import { UserModule } from 'src/user/user.module';

const commandHandlers = [
  StartRegistrationCommandHandler,
  EndRegistrationCommandHandler,
];
const eventHandlers = [RegistrationEndedEventHandler];
const sagas = [RegistrationSaga];

@Module({
  controllers: [RegistrationController],
  imports: [SharedModule, TypeOrmModule.forFeature([RegistrationState])],
  providers: [...commandHandlers, ...eventHandlers, ...sagas],
})
export class RegistrationModule {}
