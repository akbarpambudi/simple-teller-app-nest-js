import { Controller, Get, Body, Post, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { TransactionDto } from './dto/transaction.dto';

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @HttpCode(201)
  public async createTransaction(@Body() dto: TransactionDto) {
    const command = CreateTransactionCommand.fromTransactionDto(dto);
    await this.commandBus.execute(command);
  }
}
