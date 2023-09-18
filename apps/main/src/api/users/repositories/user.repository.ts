import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { SqlRepositoryBase } from '@app/common/db/sql-repository.base';
import { Paginated } from '@app/common/ddd/repository.port';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import { UserEntity } from '../domain/user.entity';
import { FindUsersQuery } from '../queries/find-users/find-users.query-handler';
import { UserMapper } from '../user.mapper';
import { UserRepositoryPort } from './user.repository.port';

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, User>
  implements UserRepositoryPort
{
  constructor(
    prisma: PrismaService,
    mapper: UserMapper,
    eventEmitter: EventEmitter2
  ) {
    super(mapper, eventEmitter, new Logger(UserRepository.name), prisma);
  }

  async findUsers(query: FindUsersQuery): Promise<Paginated<User>> {
    const result = await this.prisma.user.findMany({
      include: {
        records: true,
      },
      where: {
        type: query.type,
        gender: query.gender,
      },
      skip: query.page,
      take: query.limit,
    });

    return new Paginated<User>({
      data: result,
      count: result.length,
      limit: query.limit,
      page: query.page,
    });
  }

  createUser(user: UserEntity) {
    try {
      return this.prisma.user.create({
        data: this.mapper.toPersistence(user),
      });
    } catch (err) {
      throw err;
    }
  }
}
