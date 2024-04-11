import { AuthMessage } from '@app/common/providers/messages/auth.message';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { SignInRequest } from '../open-api/dto/sign-in.dto';
import {
  SignInDecorator,
  SignUpDecorator,
} from '../open-api/swagger.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authCp: ClientProxy) {}

  @SignInDecorator()
  @Post('sign-in')
  async signIn(@Body() req: SignInRequest): Promise<any> {
    return await lastValueFrom(this.authCp.send(AuthMessage.AUTH_SIGN_IN, req));
  }

  @SignUpDecorator()
  @Post('sign-up')
  async signUp(@Body() req: SignInRequest) {
    return await lastValueFrom(this.authCp.send(AuthMessage.AUTH_SIGN_UP, req));
  }
}
