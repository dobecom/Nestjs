import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    } as RedisModuleOptions),
  ],
  providers: [CacheService],
})
export class CacheModule {}
