import { DateLibService } from '@app/common-lib/services/date-lib.service';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly redisService: RedisService,
    private readonly dateService: DateLibService
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAllUsers() {
    const res = await this.redisService.set('test-key', 'test-value', 30);
    // const wod = this.dateService.findDayOfWeek('5');
    // console.log(wod);
    return this.userRepo.findAll();
  }

  findUserById(id: number) {
    return this.userRepo.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
