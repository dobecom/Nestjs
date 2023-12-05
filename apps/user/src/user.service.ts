import { UserEntity } from '@app/db/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async signUp(data) {
    return `Sign Up ${JSON.stringify(data)}`;
  }

  async signIn(data) {
    const result = await this.userRepository.find();
    console.log(result);
    return `Sign In ${JSON.stringify(data)}`;
  }
}
