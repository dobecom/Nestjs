import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Set Continuous Local Storage data
    const userIp = request.connection.remoteAddress;
    this.cls.set('ip', userIp);

    // Log
    this.logger.log(`Request Info : [${request.method}] ${request.url} From ${userIp}`);

    return next.handle();
  }
}
