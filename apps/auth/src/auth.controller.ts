import { AuthMessage } from '@app/common/providers/messages/auth.message';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMessage.AUTH_SIGN_IN)
  async signIn(@Payload() data) {
    const { email, password } = data;
    
    return await this.authService.signIn(email, password);
  }

  @MessagePattern(AuthMessage.AUTH_SIGN_UP)
  async signUp(@Payload() data) {
    const { email, username, password } = data;
    return await this.authService.signUp(email, username, password);
  }
}
