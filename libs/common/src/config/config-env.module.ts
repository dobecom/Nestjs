import { Module } from '@nestjs/common';
import { ConfigEnvService } from './config-env.service';

@Module({
  providers: [ConfigEnvService],
})
export class ConfigEnvModule {}
