import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  providers: [ValidationPipe],
})
export class SharedModule {}
