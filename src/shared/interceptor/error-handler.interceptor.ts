import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  Injectable,
  BadRequestException,
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
      catchError(err => {
        console.log(err);
        if (err.type == ErrorType.INTERNAL_SERVER_ERROR) {
          return throwError(
            new InternalServerErrorException(err.message, err.code),
          );
        } else if (err.type == ErrorType.BAD_REQUEST) {
          return throwError(new BadRequestException(err.message, err.code));
        }
      }),
    );
  }
}
