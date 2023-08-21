import { Global, Module } from '@nestjs/common';
import { ConfigEnvService } from './config-env.service';

@Global()
@Module({
  exports: [ConfigEnvService],
  providers: [ConfigEnvService], 
})
export class ConfigEnvModule {}
