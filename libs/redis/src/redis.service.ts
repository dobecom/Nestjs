import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SetOptions } from 'redis';

@Injectable()
export class RedisService {
  private readonly redis = createClient({
    url: `redis://${this.config.get('REDIS_HOST') || 'localhost'}:${
      this.config.get('REDIS_PORT') || 6379
    }`,
  });

  constructor(private readonly config: ConfigService) {
    this.redis.connect();
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    return this.redis.set(key, value, {
      EX: expire ?? (this.config.get('REDIS_TTL') || 10),
    } as SetOptions);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
