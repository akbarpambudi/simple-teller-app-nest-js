import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType, AggregateRoot } from '@nestjs/cqrs';
import { Observable, of, from, throwError } from 'rxjs';
import { CustomerCreatedEvent } from 'src/customer/event/customer-created.event';
import { map, flatMap, catchError } from 'rxjs/operators';
import { CreateAccountCommand } from 'src/account/command/create-account.command';
import { AccountRegistrationDto } from 'src/account/dto/account.dto';
import { v4 } from 'uuid';
import { UserCreatedEvent } from 'src/user/event/user-created.event';
import { CreateCustomerCommand } from 'src/customer/command/create-customer.command';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { Gender } from 'src/customer/enum/gender.enum';
import { StartRegistrationCommand } from '../command/start-registration.command';
import { RegistrationStartedEvent } from '../event/registration-started.event';
import { CreateUserCommand } from 'src/user/command/create-user.command';
import { RegistrationState } from '../entities/registration-state.entity';
import { Repository } from 'typeorm';
import { AccountCreatedEvent } from 'src/account/event/account-created.event';
import { EndRegistrationCommand } from '../command/end-registration.command';
import { RegistrationEndedEvent } from '../event/registration-ended.event';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegistrationSaga {
  constructor(
    @InjectRepository(RegistrationState)
    private readonly repository: Repository<RegistrationState>,
  ) {}

  @Saga()
  registrationStarted = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      ofType(RegistrationStartedEvent),
      flatMap(event => this.createUser(event)),
      // ofType(UserCreatedEvent),
      // flatMap(event => this.createCustomer(event)),
      // ofType(CustomerCreatedEvent),
      // flatMap(event => this.createAccount(event)),
      // ofType(AccountCreatedEvent),
      // flatMap(event => this.endRegistration(event)),
    );
  };

  @Saga()
  userCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      // ofType(RegistrationStartedEvent),
      // flatMap(event => this.createUser(event)),
      ofType(UserCreatedEvent),
      flatMap(event => this.createCustomer(event)),
      // ofType(CustomerCreatedEvent),
      // flatMap(event => this.createAccount(event)),
      // ofType(AccountCreatedEvent),
      // flatMap(event => this.endRegistration(event)),
    );
  };

  @Saga()
  customerCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      // ofType(RegistrationStartedEvent),
      // flatMap(event => this.createUser(event)),
      // ofType(UserCreatedEvent),
      // flatMap(event => this.createCustomer(event)),
      ofType(CustomerCreatedEvent),
      flatMap(event => this.createAccount(event)),
      // ofType(AccountCreatedEvent),
      // flatMap(event => this.endRegistration(event)),
    );
  };

  @Saga()
  accountCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      // ofType(RegistrationStartedEvent),
      // flatMap(event => this.createUser(event)),
      // ofType(UserCreatedEvent),
      // flatMap(event => this.createCustomer(event)),
      // ofType(CustomerCreatedEvent),
      // flatMap(event => this.createAccount(event)),
      ofType(AccountCreatedEvent),
      flatMap(event => this.endRegistration(event)),
    );
  };

  createUser = (
    event: RegistrationStartedEvent,
  ): Observable<CreateUserCommand> => {
    return from(this.repository.findOne(event.correlationId)).pipe(
      flatMap(state => {
        console.log(state);
        return this.repository.save(state.applyRegistrationStartedEvent(event));
      }),
      map(state => state.createUser()),
      catchError(err => {
        console.log(err);
        return throwError(err);
      }),
    );
  };

  createCustomer = (
    event: UserCreatedEvent,
  ): Observable<CreateCustomerCommand> => {
    console.log('createCustomer');
    return from(this.repository.findOne(event.correlationId)).pipe(
      flatMap(state =>
        this.repository.save(state.applyUserCreatedEvent(event)),
      ),
      map(state => state.createCustomer()),
    );
  };

  createAccount = (
    event: CustomerCreatedEvent,
  ): Observable<CreateAccountCommand> => {
    return from(this.repository.findOne(event.correlationId)).pipe(
      flatMap(state =>
        this.repository.save(state.applyCustomerCreatedEvent(event)),
      ),
      map(state => state.createAccount()),
    );
  };

  endRegistration = (
    event: AccountCreatedEvent,
  ): Observable<EndRegistrationCommand> => {
    console.log('endRegistration');
    return from(this.repository.findOne(event.correlationId)).pipe(
      flatMap(state => this.repository.save(state.applyEndRegistration(event))),
      map(state => state.end()),
    );
  };
}
