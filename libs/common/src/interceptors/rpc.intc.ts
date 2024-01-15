import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ErrorCodes } from '../code/error.code';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'rpc') {
      return next.handle().pipe(
        catchError((err) => {
          if (err.driverError) {
            switch (err.code) {
              case '23505':
                // Unique Constraint
                throw new RpcException(
                  new ConflictException({
                    code: ErrorCodes.CF001,
                  })
                );
              default:
                console.log('unhandled DB error')
                console.log(err.code)
                throw new RpcException(
                  new InternalServerErrorException({
                    code: ErrorCodes.IS001,
                  })
                );
            }
          }
          throw new RpcException(err);
        })
      );
    }
  }
}
