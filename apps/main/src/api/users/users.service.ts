import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly redisService: RedisService
  ) {}

  async findAllUsers() {
    const res = await this.redisService.set('test-key', 'test-value', 30);
    return this.userRepo.findAll();
  }
}
