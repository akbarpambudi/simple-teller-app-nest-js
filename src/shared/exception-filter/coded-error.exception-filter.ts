import { Catch, ExceptionFilter } from '@nestjs/common';
import { CodedError, ErrorType } from '../error/coded-error';
import { Response, Request } from 'express';
import { FastifyReply } from 'fastify';

@Catch(CodedError)
export class CodedErrorExceptionFilter implements ExceptionFilter {
  catch(exception: CodedError, host: import('@nestjs/common').ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply<any>>();
    const status = exception.type;

    response.status(status).send(exception);
  }
}
