import { Module } from '@nestjs/common';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
})
export class RedisModule {}
