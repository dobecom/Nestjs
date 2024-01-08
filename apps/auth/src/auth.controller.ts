import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('user-signUp')
  async signUp(@Payload() data) {
    const { email, username, password } = data;
    const result = await this.authService.signUp(email, username, password);
    return result;
  }

  @MessagePattern('user-signIn')
  async signIn(@Payload() data) {
    const { email, password } = data;
    const result = await this.authService.signIn(email, password);
    return result;
  }
}
