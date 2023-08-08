import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { ClsService } from 'nestjs-cls';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
    private readonly cls: ClsService
  ) {}

  generateJwt(payload) {
    return this.jwtService.signAsync(payload);
  }

  async signInGoogle(token: string) {
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
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.userRepo.findUserByEmail(user.email);
      if (!userExists) {
        const createUser = await this.userRepo.registerUser(user);
        return await this.generateJwt({
          sub: createUser.id,
          email: user.email,
        });
      }
      return this.generateJwt({
        sub: userExists.id,
        email: userExists.email,
      });
    } catch (err) {
      console.log('err');
      console.log(err);
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
        return this.generateJwt({
          sub: user.providerId,
          email: user.email,
        });
      }
      return this.generateJwt({
        sub: userExists.id,
        email: userExists.email,
      });
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  }

  async findUser(id: number) {
    return await this.userRepo.findOne(id);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
