import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserMessage } from '@app/common/providers/messages/user.message';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMessage.USER_SIGN_IN)
  async signIn(@Payload() data) {
    const { email, password } = data;
    console.log('data');
    console.log(data);
    return await this.userService.signIn(email, password);
  }

  @MessagePattern(UserMessage.USER_SIGN_UP)
  async signUp(@Payload() data) {
    const { email, username, password } = data;
    return await this.userService.signUp(email, username, password);
  }
}
