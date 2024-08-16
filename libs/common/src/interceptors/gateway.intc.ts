import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorCodes } from '../code/error.code';

@Injectable()
export class GatewayInterceptor implements NestInterceptor {
  constructor(
    private logger: Logger,
    private cls: ClsService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const startTime = Date.now();
    return next.handle().pipe(
      map((value) => {
        // Request Logging
        this.logger.log(
          {
            from: req.headers.host,
            to: req.url,
            data: req.body,
            timestamp: new Date(startTime).toISOString(),
          },
          `REQ-${this.cls.get('requestId')}`
        );
        return value === null ? '' : value;
      }),
      tap((value) => {
        // Response Logging
        this.logger.log(
          {
            data: value,
            duration: `${Date.now() - startTime}ms`,
          },
          `RES-${this.cls.get('requestId')}`
        );
      }),
      catchError((err) => {
        // Exception Logging
        this.logger.error(
          {
            from: req.headers.host,
            to: req.url,
            data: req.body,
            timestamp: new Date(startTime).toISOString(),
            error: {
              ...err.response,
              status: err.status,
            },
            duration: `${Date.now() - startTime}ms`,
          },
          `ERR-${this.cls.get('requestId')}`
        );
        if (err.response) {
          throw new HttpException(err.response, err.status);
        } else {
          if (err.message === 'Timeout has occurred') {
            throw new HttpException({ code: ErrorCodes.IS999 }, 500);
          } else {
            return throwError(() => err);
          }
        }
      })
    );
  }
}
