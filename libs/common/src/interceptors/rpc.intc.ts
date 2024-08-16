import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { ErrorCodes } from '../code/error.code';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  constructor(
    private logger: Logger,
    private cls: ClsService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const requestData = { ...req };
    delete requestData.requestId;
    const startTime = Date.now();
    if (context.getType() === 'rpc') {
      return next.handle().pipe(
        catchError((err) => {
          this.logger.error(
            {
              // from: req.headers.host,
              to: res.args[2],
              data: requestData,
              timestamp: new Date(startTime).toISOString(),
              error: {
                ...err.response,
                status: err.status,
              },
            },
            `Err-${this.cls.get('requestId')}`
          );
          if (err.status) {
            throw new RpcException(err);
          } else {
            throw new RpcException(
              new InternalServerErrorException({
                code: ErrorCodes.BR001,
                cause: err.name,
              })
            );
          }
        })
      );
    }
  }
}
