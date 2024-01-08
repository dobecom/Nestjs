import { UserEntity } from '@app/db/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const result = await this.userRepository.save({
      email,
      username,
      password : hash,
    });
    return result;
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: '1d',
      }),
    };
  }
}
