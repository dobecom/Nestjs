import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';
import { DateLibService } from '@app/common-lib/services/date-lib.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, RedisService, DateLibService],
})
export class UsersModule {}
