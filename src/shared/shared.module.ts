import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';

@Module({
  providers: [
    ValidationPipe,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    },
  ],
})
export class SharedModule {}
