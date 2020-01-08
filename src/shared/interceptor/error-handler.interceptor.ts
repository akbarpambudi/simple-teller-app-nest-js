import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CodedError, ErrorType } from '../error/coded-error';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (!(err instanceof CodedError)) {
          return throwError(CodedError.fromError(err));
        }
        return throwError(err);
      }),
    );
  }
}
