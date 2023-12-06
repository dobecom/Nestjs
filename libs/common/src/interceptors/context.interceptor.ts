import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RequestContextService } from 'apps/main/src/common/context/app-request.context';
import { nanoid } from 'nanoid';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Set request id
    const requestId = request?.body?.requestId ?? nanoid(6);
    RequestContextService.setRequestId(requestId);
    
    // Set Continuous Local Storage data
    const userIp = request.connection.remoteAddress;
    this.cls.set('ip', userIp);

    return next.handle();
  }
}
