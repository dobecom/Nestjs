import { Module, Provider } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';
import { ClsModule } from 'nestjs-cls';
import { EnvService } from '@app/common/env/env.service';
import { UserMapper } from './user.mapper';
import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { FindUsersHttpController } from './queries/find-users/find-users.http.controller';
import { CreateUserCommandHandler } from './commands/create-user/create-user.command';

const httpControllers = [CreateUserHttpController, FindUsersHttpController];

const commandHandlers: Provider[] = [CreateUserCommandHandler];
const queryHandlers: Provider[] = [FindUsersQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [{
  provide: 'UserRepository',
  useClass: UserRepository
}];

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
    ...commandHandlers,
    ...queryHandlers,
    ...repositories
  ],
})
export class UsersModule {}
