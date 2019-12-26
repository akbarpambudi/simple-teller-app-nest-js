import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  HttpCode,
  Param,
  UsePipes,
} from '@nestjs/common';
import { AccountService } from '../services/interfaces';
import { ACCOUNT_SERVICE } from './../di-token.constant';
import { AccountRegistrationDto, AccountDto } from './../dto/account.dto';
import { ValidationPipe } from './../../shared/pipes/validation.pipe';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async registerAccount(@Body() dto: AccountRegistrationDto) {
    await this.accountService.registerAccount(dto);
    return { status: 'success', id: dto.id };
  }

  @Get('/:id')
  async getAccountById(@Param('id') id: string): Promise<AccountDto> {
    return await this.accountService.getAccountById(id);
  }
}
