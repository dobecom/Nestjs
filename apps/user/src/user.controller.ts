import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user-signUp')
  async signUp(@Payload() data) {
    const { email, username, password } = data;
    const result = await this.userService.signUp(email, username, password);
    return result;
  }

  @MessagePattern('user-signIn')
  async signIn(@Payload() data) {
    const { email, password } = data;
    const result = await this.userService.signIn(email, password);
    return result;
  }
}
