import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async getUserByIdOrName(id: number, name?: string): Promise<User | null> {
    const user = await this.repository.findUserByIdOrName(id, name);
    if (!user) {
      return null;
    }

    return user;
  }

  async getUsers(usersArgs: UsersArgs): Promise<User[]> {
    const { skip, take } = usersArgs;
    const users = await this.repository.findUsers(skip, take);
    return users;
  }

  async addUser(data: NewUserInput): Promise<User> {
    try {
      const user = await this.repository.create(data);
      return user;
    } catch (err) {
      if (err.name === 'QueryFailedError') {
        if (err.code === 23505) {
          throw new ConflictException(err);
        }
      }
      throw new InternalServerErrorException(err);
    }
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    const { id, name, email } = data;

    const existingUser = await this.repository.findUserByIdOrName(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (name) existingUser.name = name;
    if (email) existingUser.email = email;

    const updatedUser = await this.repository.updateUser(existingUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.repository.findUserByIdOrName(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.repository.deleteUser(id);
    return true;
  }
}
