import { SignInRequest } from '@app/common/open-api/auth/sign-in.dto';
import {
  SignInDecorator,
  SignUpDecorator,
} from '@app/common/open-api/swagger.decorator';
import { UserMessage } from '@app/common/providers/messages/user.message';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private userCp: ClientProxy,
    private readonly config: ConfigService
  ) {}

  @SignInDecorator()
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<any> {
    return await lastValueFrom(
      this.userCp.send(UserMessage.USER_SIGN_IN, req).pipe(
        timeout(
          // this.config.get('APPS_TIMEOUT')
          5000
        )
      )
    );
  }

  @SignUpDecorator()
  @Post('sign-up')
  async signUp(@Body() req: SignInRequest) {
    return await lastValueFrom(this.userCp.send(UserMessage.USER_SIGN_UP, req));
  }
}
