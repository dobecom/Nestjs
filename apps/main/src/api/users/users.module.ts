import { Module, Provider } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';
import { ClsModule } from 'nestjs-cls';
import { EnvService } from '@app/common/env/env.service';
import { UserMapper } from './user.mapper';
import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { UsersController } from './queries/find-users/find-users.http.controller';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';
import { CqrsModule } from '@nestjs/cqrs';

const httpControllers = [UsersController];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [FindUsersQueryHandler];

const mappers: Provider[] = [UserMapper];

@Module({
  imports: [
    CqrsModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [...httpControllers],
  providers: [
    PrismaService,
    UserRepository,
    RedisService,
    EnvService,
    ...mappers,
    // ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UsersModule {}
