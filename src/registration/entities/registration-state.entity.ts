import { AggregateRoot } from '@nestjs/cqrs';
import { Gender } from 'src/customer/enum/gender.enum';
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';
import { CustomerCreatedEvent } from 'src/customer/event/customer-created.event';
import { CreateUserCommand } from 'src/user/command/create-user.command';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import uuid = require('uuid');
import { StartRegistrationCommand } from './../command/start-registration.command';
import { classToClass, plainToClass } from 'class-transformer';
import { RegistrationStartedEvent } from '../event/registration-started.event';
import { CreateCustomerCommand } from 'src/customer/command/create-customer.command';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateAccountCommand } from 'src/account/command/create-account.command';
import { AccountRegistrationDto } from 'src/account/dto/account.dto';
import { UserCreatedEvent } from 'src/user/event/user-created.event';
import { AccountCreatedEvent } from 'src/account/event/account-created.event';
import { EndRegistrationCommand } from '../command/end-registration.command';
import { RegistrationEndedEvent } from '../event/registration-ended.event';

export type RegistrationStep =
  | 'start'
  | 'createUser'
  | 'createCustomer'
  | 'createAccount'
  | 'closing'
  | 'end';

@Entity()
export class RegistrationState extends AggregateRoot {
  @PrimaryColumn()
  id?: string;
  @Column({ nullable: true })
  password?: string;
  @Column({ nullable: true })
  name?: string;
  @Column({ nullable: true })
  idCardType?: string;
  @Column({ nullable: true })
  idCardNumber?: string;
  @Column({ nullable: true })
  gender?: Gender;
  @Column({ nullable: true })
  address?: string;
  @Column({ nullable: true })
  customerId?: string;
  @Column({ nullable: true })
  userId?: string;
  @Column()
  registrationStep: RegistrationStep;
  static start(command: StartRegistrationCommand): RegistrationState {
    const registrationState = plainToClass(
      RegistrationState,
      command.properties,
    );
    registrationState.registrationStep = 'start';
    //registrationState.autoCommit = false;
    registrationState.apply(new RegistrationStartedEvent(command.properties));

    return registrationState;
  }

  applyRegistrationStartedEvent(
    event: RegistrationStartedEvent,
  ): RegistrationState {
    this.registrationStep = 'createUser';
    return this;
  }

  applyUserCreatedEvent(event: UserCreatedEvent): RegistrationState {
    this.registrationStep = 'createCustomer';
    this.userId = event.properties.userId;
    return this;
  }

  applyCustomerCreatedEvent(event: CustomerCreatedEvent): RegistrationState {
    this.registrationStep = 'createAccount';
    this.customerId = event.properties.id;
    return this;
  }

  applyAccountCreatedEvent(event: CustomerCreatedEvent): RegistrationState {
    this.registrationStep = 'closing';
    return this;
  }

  applyEndRegistration(event: RegistrationEndedEvent): RegistrationState {
    this.registrationStep = 'end';
    return this;
  }

  createUser(): CreateUserCommand {
    const createUserDto = new CreateUserDto();
    createUserDto.password = this.password;
    createUserDto.name = this.name;
    createUserDto.id = uuid.v4();
    console.log(createUserDto);
    return new CreateUserCommand(createUserDto, this.id);
  }

  createCustomer(): CreateCustomerCommand {
    const createCustomerDto = plainToClass(CreateCustomerDto, this);
    createCustomerDto.id = uuid.v4();
    createCustomerDto.userId = this.userId;
    return new CreateCustomerCommand(createCustomerDto, this.id);
  }

  createAccount(): CreateAccountCommand {
    const createAccountDto = new AccountRegistrationDto();
    createAccountDto.creator = this.userId;
    createAccountDto.customerId = this.customerId;
    createAccountDto.id = uuid.v4();
    return new CreateAccountCommand(createAccountDto, this.id);
  }

  end(): EndRegistrationCommand {
    return new EndRegistrationCommand(this.id);
  }
}
