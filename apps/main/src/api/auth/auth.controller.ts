import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. getting user info from google access token and join to the database
  @Post('login')
  async authLogin(@Body() req) {
    const result = await this.authService.signInGoogle(req.data.access_token);
    return result;
  }


  // 2. 
  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  auth() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async handleRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    return { msg: 'OK' };
  }
}
