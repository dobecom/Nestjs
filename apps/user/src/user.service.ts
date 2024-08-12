import { UserEntity } from '@app/db/entities/user.entity';
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

  async signIn(email: string, password: string) {
    try {
      console.log(this.userRepository.target);
      const user = await this.userRepository.findOneBy({ email });
      console.log('user');
      console.log(user);
      if (!user) {
        throw new NotFoundException({
          code: ErrorCodes.NF001,
        });
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new UnauthorizedException({
          code: ErrorCodes.UA003,
        });
      }
      const payload = { name: user.name, id: user.id };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '1d',
        }),
      };
    } catch (err) {
      console.log(err);
    }
  }
}
