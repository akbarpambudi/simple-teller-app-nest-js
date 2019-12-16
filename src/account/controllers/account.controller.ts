import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor() {}

  @Get('/')
  getAccount() {
    return { message: 'hello' };
  }
}
