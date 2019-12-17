import { Controller, Get, Inject, Post, Body, HttpCode } from '@nestjs/common';
import { AccountService } from '../services/interfaces';
import { ACCOUNT_SERVICE } from './../di-token.constant';
import { AccountRegistrationDto } from './../dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async registerAccount(@Body() dto: AccountRegistrationDto) {
    await this.accountService.registerAccount(dto);
    return { status: 'success' };
  }
}
