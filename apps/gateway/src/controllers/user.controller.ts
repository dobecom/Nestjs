import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userCp: ClientProxy) {}

  @Post('signIn')
  signIn(@Body() req) {
    return this.userCp.send('user-signIn', req);
  }

  @Post('signUp')
  signUp(@Body() req) {
    return this.userCp.send('user-signUp', req);
  }
}
