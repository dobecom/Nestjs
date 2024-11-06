import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserOutput } from './dto/user.output';
import { PaginationInput } from './types/users.type';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async getUser(id: number, name?: string): Promise<UserOutput | null> {
    const user = await this.repository.findOneByIdOrName(id, name);
    return user || null;
  }

  async getUsers(paginationInput: PaginationInput): Promise<UserOutput[]> {
    const { page, limit } = paginationInput;
    return await this.repository.findUsers(page, limit);
  }

  async addUser(data: NewUserInput): Promise<boolean> {
    try {
      await this.repository.create(data);
      return true;
    } catch (err) {
      this.handleDatabaseError(err);
    }
  }

  async updateUser(data: UpdateUserInput): Promise<boolean> {
    const existingUser = await this.getUserByIdOrFail(data.id);

    if (data.name) existingUser.name = data.name;
    if (data.email) existingUser.email = data.email;

    await this.repository.updateUser(existingUser);
    return true;
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.getUserByIdOrFail(id);
    await this.repository.deleteUser(id);
    return true;
  }

  private async getUserByIdOrFail(id: number): Promise<UserOutput> {
    const user = await this.repository.findOneByIdOrName(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  private handleDatabaseError(err: any) {
    if (err.name === 'QueryFailedError') {
      if (err.code === '23505') {
        throw new ConflictException('Duplicate entry found.');
      }
    }
    throw new InternalServerErrorException('Internal server error occurred.');
  }
}
