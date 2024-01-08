import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authCp: ClientProxy) {}

  @ApiOperation({
    summary: 'signIn',
  })
  @ApiResponse({
    status: 200,
    description: 'signIn Success',
    // type: SuccessDtoResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'signIn failed',
  })
  @Post('signIn')
  async signIn(@Body() req) {
    try {
      return await lastValueFrom(
        await this.authCp.send('user-signIn', req)
      );
    } catch (err) {
      throw err;
    }
  }

  @Post('signUp')
  signUp(@Body() req) {
    return this.authCp.send('user-signUp', req);
  }
}