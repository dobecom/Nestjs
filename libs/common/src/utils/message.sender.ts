import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom, timeout } from 'rxjs';
// import { appConfig } from '../configs';

export class MessageSender {
  constructor(
    // @Inject(appConfig.KEY)
    // private appConf: ConfigType<typeof appConfig>,
    private cls: ClsService
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
            : timeout(
                //+this.appConf.AppsTimeout
                5000
              )
        )
    );
  }
}
