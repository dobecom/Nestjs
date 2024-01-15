import { AuthMessage } from '@app/common/providers/messages/auth.message';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authCp: ClientProxy) {}

  @ApiOperation({
    summary: 'sign in',
  })
  @ApiResponse({
    status: 200,
    description: 'sign in success',
    // type: SuccessDtoResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'sign in failed',
  })
  @Post('sign-in')
  async signIn(@Body() req): Promise<any> {
    return await lastValueFrom(
      await this.authCp.send(AuthMessage.AUTH_SIGN_IN, req)
    );
  }

  @ApiOperation({
    summary: 'sign up',
  })
  @ApiResponse({
    status: 200,
    description: 'sign up success',
    // type: SuccessDtoResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'sign up failed',
  })
  @Post('sign-up')
  signUp(@Body() req) {
    return this.authCp.send(AuthMessage.AUTH_SIGN_UP, req);
  }
}
