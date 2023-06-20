import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<'OK'> {
    return this.redis.set(key, value, 'EX', expire ?? 10);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
