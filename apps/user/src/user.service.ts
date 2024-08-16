import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ErrorCodes } from '@app/common/code/error.code';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './models/entities/user.entity';
import { Users } from './models/domains/users.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(email: string, username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return await this.userRepository.save({
      email,
      username,
      password: hash,
    });
  }

  async signIn(users: Users) {
    try {
      const user = await this.userRepository.findOneBy({ email: users.email });
      if (!user) {
        throw new NotFoundException({
          code: ErrorCodes.NF001,
        });
      }
      const isValid = await bcrypt.compare(users.password, user.password);
      if (!isValid) {
        throw new UnauthorizedException({
          code: ErrorCodes.UA003,
        });
      }
      const payload = { name: user.name, id: user.id };
      // return payload;
      const result = await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: '1d',
      });

      return {
        users: {
          accessToken: result,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  // private async successSignIn(pMembers: Members) {
  //   // SignIn Success
  //   // - Combine Payload
  //   const payload = { id: pMembers.id, uid: pMembers.uid };
  //   // - Create Token
  //   const { accessToken, refreshToken } = await this.generateToken(payload);
  //   const expiresOn = Date.now() + parseInt(this.authConf.sign.expires) * 1000;
  //   // - Set Session Store
  //   await this.limitSessionStore(pMembers.uid);
  //   const setStore = await this.setSessionStore(
  //     accessToken,
  //     refreshToken,
  //     pMembers
  //   );
  //   if (!setStore) {
  //     throw new InternalServerErrorException({
  //       code: ErrorCodes.IS003,
  //     });
  //   }
  //   return { accessToken, refreshToken, expiresOn };
  // }
}
