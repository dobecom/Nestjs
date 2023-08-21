import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';
import { ClsModule } from 'nestjs-cls';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, RedisService, ConfigEnvService],
})
export class UsersModule {}
