import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException({
            errorCode: error.code,
            message: error.message,
          });
        } else if (error instanceof PrismaClientUnknownRequestError) {
          throw new InternalServerErrorException({
            message: error.message,
          });
        } else if (error instanceof PrismaClientValidationError) {
          throw new InternalServerErrorException({
            message: error.message,
          });
        }
        throw error;
      })
    );
  }
}
