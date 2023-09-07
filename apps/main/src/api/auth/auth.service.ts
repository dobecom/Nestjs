import { EnvService } from '@app/common/env/env.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { ClsService } from 'nestjs-cls';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
    private envService: EnvService,
    private readonly cls: ClsService
  ) {}

  async signInGoogle(
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
      );

      // console.log(res.data)
      const user = {
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
        picture: res.data.picture,
        // Use Continuous Local Storage data
        userIp: this.cls.get('ip'),
      };
      // console.log(user);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }

      const userExists = await this.userRepo.findUserByEmail(user.email);
      if (!userExists) {
        const createUser = await this.userRepo.registerUser(user);
        return await this.generateToken(createUser.id, user.email);
      }

      return await this.generateToken(userExists.id, userExists.email);
    } catch (err) {
      throw err;
    }
  }

  async signIn(user) {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.userRepo.findUserByEmail(user.email);

      if (!userExists) {
        this.userRepo.registerUser(user);

        return this.jwtService.signAsync({
          sub: user.providerId,
          email: user.email,
        });
      }
      return this.jwtService.signAsync({
        sub: userExists.id,
        email: userExists.email,
      });
    } catch (err) {
      throw err;
    }
  }

  async findUser(id: string) {
    return await this.userRepo.findOne(id);
  }

  private async generateToken(id: string, email: string) {
    const payload = {
      sub: id,
      email: email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.envService.get('ACCESS_SECRET') || 'default',
      expiresIn: this.envService.get('ACCESS_EXPIRES') || 'default',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.envService.get('REFRESH_SECRET') || 'default',
      expiresIn: this.envService.get('REFRESH_EXPIRES') || 'default',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
