import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class MessageSender {
  constructor(
    private cls: ClsService,
    private config: ConfigService
  ) {}
  async send(
    clientProxy: ClientProxy,
    pattern: any,
    data: any,
    customTimeout?: number
  ) {
    return await lastValueFrom(
      clientProxy
        .send(pattern, {
          ...data,
          requestId: this.cls.get('requestId'),
        })
        .pipe(
          customTimeout
            ? timeout(customTimeout)
            : timeout(+this.config.get('APPS_TIMEOUT') || 5000)
        )
    );
  }
}
