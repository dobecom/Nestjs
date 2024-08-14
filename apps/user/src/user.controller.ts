import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserMessage } from '@app/common/providers/messages/user.message';
import { Users } from './models/domains/users.domain';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessage.USER_SIGN_IN)
  async signIn(@Payload('users') users: Users) {
    const { email, password } = users;
    return await this.userService.signIn(email, password);
  }

  @MessagePattern(UserMessage.USER_SIGN_UP)
  async signUp(@Payload() data) {
    const { email, username, password } = data;
    return await this.userService.signUp(email, username, password);
  }
}
