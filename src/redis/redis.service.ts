import { Injectable } from '@nestjs/common';
import { createClient, SetOptions } from 'redis';

@Injectable()
export class RedisService {
  private readonly redis = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  constructor() {
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
