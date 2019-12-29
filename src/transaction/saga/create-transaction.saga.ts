import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, of, from } from 'rxjs';
import { TransactionCreatedEvent } from './../event/transaction-created.event';
import { map, flatMap } from 'rxjs/operators';
import { TransactionSplitDto } from '../dto/transaction-split.dto';
import { UpdateAccountBalanceCommand } from './../../account/command/update-account-balance.command';

@Injectable()
export class CreateTransactionSaga {
  @Saga()
  createTransaction = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      // on transaction created event handler
      ofType(TransactionCreatedEvent),
      flatMap(event => from(event.splits)),
      map(this.updateAccountBalance),
    );
  };

  private updateAccountBalance = (
    splitTransaction: TransactionSplitDto,
  ): ICommand => {
    return new UpdateAccountBalanceCommand(
      splitTransaction.accountNumber,
      splitTransaction.amount,
      splitTransaction.type,
    );
  };
}
