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
          `Req-${this.cls.get('requestId')}`
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
          `Res-${this.cls.get('requestId')}`
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
          },
          `Err-${this.cls.get('requestId')}`
        );
        if (err.response) {
          throw new HttpException(err.response, err.status);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
