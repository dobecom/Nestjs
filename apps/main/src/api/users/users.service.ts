import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { UserEntity } from './domain/user.entity';
import { CreateUserRequest } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly redisService: RedisService
  ) {}

  async findAllUsers() {
    // const res = await this.redisService.set('test-key', 'test-value', 30);
    // const value = await this.redisService.get('test-key');
    // console.log(value)
    return this.userRepo.findAll();
  }

  create(req : CreateUserRequest) {
    // const user = UserEntity.create({
    //   req
    // })
  }
}
