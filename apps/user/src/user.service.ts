import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ErrorCodes } from '@app/common/code/error.code';
import * as bcrypt from 'bcrypt';
import { RedisService } from '@app/redis';
import { UserEntity } from '@app/common/models/entities/user.entity';
import { Users } from '@app/common/models/domains/users.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService
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
      const { accessToken } = await this.successSignIn(user);
      return { accessToken };

      // const payload = { name: user.name, id: user.id };
      // // return payload;
      // const result = await this.jwtService.signAsync(payload, {
      //   secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      //   expiresIn: '1d',
      // });

      // return {
      //   users: {
      //     accessToken: result,
      //   },
      // };
    } catch (err) {
      throw err;
    }
  }

  private async successSignIn(users: Users) {
    // SignIn Success
    // - Combine Payload
    const payload = { id: users.id, uid: users.id };
    // - Create Token
    const { accessToken } = await this.generateToken(payload);
    // const expiresOn = Date.now() + parseInt(this.authConf.sign.expires) * 1000;
    // - Set Session Store
    // await this.limitSessionStore(pMembers.uid);
    const setStore = await this.setSessionStore(
      accessToken,
      // refreshToken,
      users
    );
    if (!setStore) {
      throw new InternalServerErrorException({
        code: ErrorCodes.IS003,
      });
    }
    return {
      accessToken,
      // refreshToken, expiresOn
    };
  }

  private async generateToken(payload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: this.config.get('SIGN_SECRET'),
      // expiresIn: `${this.authConf.sign.expires}s`,
    });
    // const refreshToken = await this.jwtService.sign(payload, {
    //   secret: this.authConf.resign.secret,
    //   expiresIn: `${this.authConf.resign.expires}s`,
    // });
    return {
      accessToken,
      // refreshToken
    };
  }

  private async setSessionStore(
    accessToken,
    // refreshToken,
    users: Users
  ) {
    /**
     * 아래에서 저장하는 tokenInfo data는 Request Guard에서 grade로 인증 처리
     * 로그인 이후 grade 변경이 일어났을 때 기존 session으로는 인증이 되지 않는 문제가 있음 (재로그인 필요)
     * TODO: 추후 grade 변경 시 기존 session을 모두 삭제하고 재로그인을 유도?
     */

    const data = {
      id: users.id,
      email: users.email,
      name: users.name,
      // grade: members.grade,
      // identifier: members.identifier,
      // firstName: members.firstName,
      // lastName: members.lastName,
      // companyId: members.companyId,
    };

    const pipeline = await this.redis.pipeline();
    // For SignOutAuto
    // pipeline.set(
    //   `${Members.keyExpire}${accessToken}`,
    //   members.uid,
    //   'EX',
    //   this.authConf.signOutAuto
    // );
    // For AccessToken
    pipeline.set(
      `${Users.keyAt}${accessToken}`,
      JSON.stringify(data),
      'EX',
      this.config.get('SIGN_EXPIRES')
    );
    // For RefreshToken
    // pipeline.set(
    //   `${Members.keyRt}${refreshToken}`,
    //   accessToken,
    //   'EX',
    //   this.authConf.resign.expires
    // );
    // For Session Limit
    // pipeline.rpush(
    //   `${Members.keySess}${members.uid}`,
    //   `${accessToken}${Members.tokenSplit}${refreshToken}`
    // );
    const results = await pipeline.exec();

    this.checkPipelineResults(results);
    return true;
  }

  private checkPipelineResults(results: [Error | null, unknown][]): void {
    if (!results) {
      throw new InternalServerErrorException({
        code: ErrorCodes.IS003,
      });
    }

    for (const [error] of results) {
      if (error) {
        throw new InternalServerErrorException({
          code: ErrorCodes.IS003,
        });
      }
    }
  }
}
