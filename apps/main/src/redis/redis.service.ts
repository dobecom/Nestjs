import { Injectable } from '@nestjs/common';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';
import { createClient, SetOptions } from 'redis';

@Injectable()
export class RedisService {
  private readonly redis = createClient({
    url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
  });
  
  constructor(private readonly configService: ConfigEnvService) {
    this.redis.connect();
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    return this.redis.set(key, value, { EX: expire ?? 10 } as SetOptions);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
