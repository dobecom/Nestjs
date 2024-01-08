import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'rpc') {
      return next.handle().pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
    }
  }
}
