import { PaginatedQueryRequest } from '@app/common/api/paginated-query.request';
import { Paginated } from '@app/common/ddd/repository.port';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RedisService } from '../../redis/redis.service';
import { UserEntity } from './domain/user.entity';
import { CreateUserRequest } from './dto/request/create-user.request';
import { FindUserRequest } from './dto/request/find-user.request';
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

  async findUsers(
    req: FindUserRequest,
  ): Promise<Paginated<User>> {
    return this.userRepo.findUsers(req);
  }

  create(req: CreateUserRequest) {
    // const user = UserEntity.create({
    //   req
    // })
  }
}
