import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { CacheService } from 'src/cache/cache.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, CacheService]
})
export class UsersModule {}
