import { SignInRequest } from '@app/common/open-api/auth/sign-in.dto';
import {
  SignInDecorator,
  SignUpDecorator,
} from '@app/common/open-api/swagger.decorator';
import { UserMessage } from '@app/common/providers/messages/user.message';
import { MessageSender } from '@app/common/utils/message.sender';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom } from 'rxjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private userCp: ClientProxy,
    private readonly sender: MessageSender,
    private cls: ClsService
  ) {}

  @SignInDecorator()
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<any> {
    return await this.sender.send(this.userCp, UserMessage.USER_SIGN_IN, {
      users: req.users,
    });
  }

  @SignUpDecorator()
  @Post('sign-up')
  async signUp(@Body() req: SignInRequest) {
    return await lastValueFrom(this.userCp.send(UserMessage.USER_SIGN_UP, req));
  }
}
