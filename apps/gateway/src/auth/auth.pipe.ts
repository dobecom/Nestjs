import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
// import { InjectRedis } from '@songkeys/nestjs-redis';
// import { Members } from '../domains/Members';
import { RedisService } from '@app/redis';
import { AuthSession } from './auth.session';

@Injectable()
export class AuthPipe implements PipeTransform {
  constructor(
    private readonly cache: RedisService // @InjectCluster() private readonly cache: Cluster,
  ) {}

  public async transform(token: string) {
    if (!token) {
      throw new UnauthorizedException('Not Found Token.');
    }
    const tokenInfo = await this.cache.get(`${AuthSession.keyAt}${token}`);
    if (!tokenInfo) {
      throw new UnauthorizedException('Not Found Token Info.');
    }

    return JSON.parse(tokenInfo) as AuthSession;
  }
}
