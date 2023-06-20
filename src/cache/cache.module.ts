import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    } as unknown as RedisModuleOptions),
  ],
  providers: [CacheService],
})
export class CacheModule {}
