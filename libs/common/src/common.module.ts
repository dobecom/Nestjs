import { Module } from '@nestjs/common';
import { ConfigEnvModule } from './config/config-env.module';

@Module({
  imports: [ConfigEnvModule],
})
export class CommonModule {}
