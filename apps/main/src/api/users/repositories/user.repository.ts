import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { SqlRepositoryBase } from '@app/common/db/sql-repository.base';
import { Paginated } from '@app/common/ddd/repository.port';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import { ZodObject, UnknownKeysParam, ZodTypeAny } from 'zod';
import { UserEntity } from '../domain/user.entity';
import { UserMapper } from '../user.mapper';
import { UserRepositoryPort } from './user.repository.port';

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, User>
  implements UserRepositoryPort
{
  protected tableName: string;
  protected schema: ZodObject<
    any,
    UnknownKeysParam,
    ZodTypeAny,
    { [x: string]: any },
    { [x: string]: any }
  >;
  constructor(
    prisma: PrismaService,
    mapper: UserMapper,
    eventEmitter: EventEmitter2
  ) {
    super(
      mapper, 
      eventEmitter, 
      new Logger(UserRepository.name), 
      prisma
      );
  }
  findOneByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  // findOne(id: number) {
  //   return this.prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async findAll(): Promise<User[]> {
  //   const result = await this.prisma.user.findMany({
  //     include: {
  //       records: true,
  //     },
  //   });
  //   return result;
  // }

  async findUsers(req): Promise<Paginated<User>> {
    const result = await this.prisma.user.findMany({
      include: {
        records: true,
      },
      where:{
        email: req.email,
        name: req.name
      }
    });
    console.log(result)
    return null;
  }
}
