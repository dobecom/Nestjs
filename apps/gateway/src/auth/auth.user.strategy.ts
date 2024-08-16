import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RedisService } from '@app/redis';
import { ErrorCodes } from '@app/common/code/error.code';
import { AuthSession } from './auth.session';

@Injectable()
export class AuthUserStrategy extends PassportStrategy(Strategy, 'jwt-sign') {
  constructor(
    private readonly redis: RedisService,
    // @InjectCluster() private readonly cache: Cluster,
    private logger: Logger,
    private config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SIGN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<any> {
    this.logger.log(`2. validate Pass\n>> uid : ${payload.uid}`, 'SignGuard');
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException({
        code: ErrorCodes.UA004,
      });
    }

    const [type, token] = authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException({
        code: ErrorCodes.UA005,
      });
    }

    const tokenInfo = await this.redis.get(`${AuthSession.keyAt}${token}`);
    if (!tokenInfo) {
      // Error
      const expireInfo = await this.redis.get(
        `${AuthSession.keyExpire}${token}`
      );
      if (!expireInfo) {
        // - Require SignIn Again
        throw new ForbiddenException({
          code: ErrorCodes.FB004,
        });
      } else {
        // - Require Resign
        throw new UnauthorizedException({
          code: ErrorCodes.UA006,
        });
      }
    } else {
      // For Test
      // if (payload.exp !== 9999999999) {
      //   // Reset Expire Time
      //   await this.redis.expire(`${AuthSession.keyExpire}${token}`, this.authConf.signOutAuto);
      // }
    }

    return JSON.parse(tokenInfo);
  }
}
