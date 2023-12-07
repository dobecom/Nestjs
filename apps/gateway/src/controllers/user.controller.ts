import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userCp: ClientProxy) {}

  @Public()
  @Post('signIn')
  signIn(@Body() req) {
    return this.userCp.send('user-signIn', req);
  }

  @Public()
  @Post('signUp')
  signUp(@Body() req) {
    return this.userCp.send('user-signUp', req);
  }
}
