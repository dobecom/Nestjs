import { Injectable } from '@nestjs/common';
import { EnvService } from '@app/common/env/env.service';
import { createClient, SetOptions } from 'redis';

@Injectable()
export class RedisService {
  private readonly redis = createClient({
    url: `redis://${this.envService.get('REDIS_HOST') || 'localhost'}:${
      this.envService.get('REDIS_PORT') || 6379
    }`,
  });

  constructor(private readonly envService: EnvService) {
    this.redis.connect();
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    return this.redis.set(key, value, {
      EX: expire ?? (this.envService.get('REDIS_TTL') || 10),
    } as SetOptions);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
