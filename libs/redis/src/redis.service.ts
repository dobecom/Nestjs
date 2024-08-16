import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor(private readonly config: ConfigService) {
    this.redis = new Redis({
      host: this.config.get('REDIS_HOST') || 'localhost',
      port: this.config.get('REDIS_PORT') || 6379,
      password: this.config.get('REDIS_PASSWORD'),
    });
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    return this.redis.set(
      key,
      value,
      'EX',
      expire ?? (this.config.get('REDIS_TTL') || 10)
    );
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async pipeline() {
    const pipeline = this.redis.pipeline();
    return pipeline;
  }
}
