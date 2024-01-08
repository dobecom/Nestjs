import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class GlIntc implements NestInterceptor {
  constructor(private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const now = Date.now();
    return next.handle().pipe(
      map((value) => {
        // Request Logging
        this.logger.log(
          null,
          [`Headers\n${JSON.stringify(req.headers, null, 2)}`, `Body\n${JSON.stringify(req.body, null, 2)}`],
          `REQ-${now.toString()}`,
        );
        return value === null ? '' : value;
      }),
      tap((value) => {
        // Response Logging
        this.logger.log(
          null,
          [`StatusCode : ${res.statusCode}`, `Body\n${JSON.stringify(value, null, 2)}`, `Time : ${Date.now() - now}ms`],
          `RES-${now.toString()}`,
        );
      }),
      catchError((err) => {
        // Exception Logging
        this.logger.log(
          null,
          [
            `StatusCode : ${err.statusCode}`,
            `Body(Req)\n${JSON.stringify(req.body, null, 2)}`,
            `Body(Res)\n${JSON.stringify(err.response, null, 2)}`,
            `ErrorTrace\n${err.stack}`,
          ],
          `ERR-${now.toString()}`,
        );
        if (err.response) {
          throw new HttpException(err.response, err.status);
        } else {
          return throwError(() => err);
        }
      }),
    );
  }
}
