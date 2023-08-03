import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. AccessToken으로 정보 조회
  @Post('login')
  async authLogin(@Body() req) {
    const result = await this.authService.signInGoogle(req.data.access_token);
    return result;
  }

  // 2. redirect -> code -> idToken
  @Post('login/server')
  async authLoginServer(@Body() req) {
    const result = await this.authService.signInGoogle(req.data.access_token);
    return result;
  }

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

  @Get('status')
  user(@Req() request: Request) {
    // console.log(request.user);
    // if (request.user) {
    //   return { msg: 'Authenticated' };
    // } else {
    //   return { msg: 'Not Authenticated' };
    // }
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
