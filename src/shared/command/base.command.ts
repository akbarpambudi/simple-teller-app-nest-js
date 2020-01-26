import { ICommandHandler, AggregateRoot, EventPublisher } from '@nestjs/cqrs';
import { BaseEvent } from './base.event';
import uuid = require('uuid');

export abstract class BaseCommand {
  constructor(public readonly correlationId: string = uuid.v4()) {}
}

export abstract class BaseCommandHandler<
  T extends BaseCommand,
  A extends AggregateRoot
> implements ICommandHandler<T> {
  corellationId: string;

  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: T): Promise<any> {
    console.log(command);
    this.corellationId = command.correlationId;
    this.executeCommand(command);
  }

  abstract executeCommand(command: T): Promise<any>;

  commitEvents(aggregate: A) {
    const mergedAggregate = this.publisher.mergeObjectContext(aggregate);
    const modifiedEvents = mergedAggregate
      .getUncommittedEvents()
      .filter(event => event instanceof BaseEvent)
      .map(event => event as BaseEvent)
      .map(event => {
        event.correlationId = this.corellationId;
        return event;
      });
    aggregate.uncommit();
    modifiedEvents.forEach(event => {
      aggregate.apply(event);
    });
    aggregate.commit();
  }
}
