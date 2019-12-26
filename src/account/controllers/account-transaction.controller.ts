import { Controller, Get, Body, Put, Inject } from '@nestjs/common';
import { AccountWithdrawalDto, AccountDepositDto } from '../dto/account.dto';
import { AccountTransactionService } from '../services/interfaces';
import { ACCOUNT_TRANSACTION_SERVICE } from '../di-token.constant';
@Controller('/account/transaction')
export class AccountTransactionController {
  constructor(
    @Inject(ACCOUNT_TRANSACTION_SERVICE)
    private accountTransactionService: AccountTransactionService,
  ) {}

  @Put('/withdrawal')
  async withdrawal(@Body() dto: AccountWithdrawalDto): Promise<void> {
    await this.accountTransactionService.withdrawal(dto);
  }

  @Put('/deposit')
  async deposit(@Body() dto: AccountDepositDto): Promise<void> {
    await this.accountTransactionService.deposit(dto);
  }
}
