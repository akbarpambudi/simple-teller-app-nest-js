import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [ValidationPipe],
  exports: [CqrsModule],
})
export class SharedModule {}
