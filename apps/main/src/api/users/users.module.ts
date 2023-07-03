import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, RedisService]
})
export class UsersModule {}
