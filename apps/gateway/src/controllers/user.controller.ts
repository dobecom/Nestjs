import { SignInRequest } from '@app/common/open-api/auth/sign-in.dto';
import {
  SignInDecorator,
  SignUpDecorator,
} from '@app/common/open-api/swagger.decorator';
import { UserMessage } from '@app/common/providers/messages/user.message';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom, timeout } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private userCp: ClientProxy,
    private readonly config: ConfigService,
    private cls: ClsService
  ) {}

  @SignInDecorator()
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<any> {
    return await lastValueFrom(
      this.userCp
        .send(UserMessage.USER_SIGN_IN, {
          users: req.users,
          requestId: this.cls.get('requestId'),
        })
        .pipe(timeout(+this.config.get('APPS_TIMEOUT')))
    );
  }

  @SignUpDecorator()
  @Post('sign-up')
  async signUp(@Body() req: SignInRequest) {
    return await lastValueFrom(this.userCp.send(UserMessage.USER_SIGN_UP, req));
  }
}
